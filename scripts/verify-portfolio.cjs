const assert = require("node:assert/strict");
const fs = require("node:fs/promises");
const path = require("node:path");
const { chromium } = require("playwright");

const url = process.env.PORTFOLIO_URL || "http://127.0.0.1:5174";
const output = process.env.PORTFOLIO_SCREENSHOTS || "/tmp/portfolio-verification";

async function checkImages(page) {
  await page.evaluate(async () => {
    await Promise.race([
      Promise.all([...document.images].filter((img) => img.getAttribute("src")).map((img) => {
        img.loading = "eager";
        return img.decode().catch(() => {});
      })),
      new Promise((_, reject) => setTimeout(() => reject(new Error("Image loading timed out")), 10000))
    ]);
  });
  const broken = await page.evaluate(() => [...document.images]
    .filter((img) => img.getAttribute("src") && (!img.complete || !img.naturalWidth))
    .map((img) => img.getAttribute("src")));
  assert.deepEqual(broken, [], "Every referenced image must load");
}

async function main() {
  await fs.mkdir(output, { recursive: true });
  const browser = await chromium.launch({ channel: "chrome" });
  try {
    for (const [name, width, height] of [["desktop", 1440, 960], ["tablet", 820, 1180], ["mobile", 390, 844], ["small", 320, 740]]) {
      const page = await browser.newPage({ viewport: { width, height } });
      const errors = [];
      page.on("pageerror", (error) => errors.push(error.message));
      await page.goto(url);
      await checkImages(page);
      await page.waitForTimeout(600);
      assert.equal(await page.locator(".project-card").count(), 5);
      if (width <= 860) {
        await page.locator(".nav-toggle").click();
        assert.equal(await page.locator(".nav-toggle").getAttribute("aria-expanded"), "true");
        await page.locator('.site-nav a[href="#projects"]').click();
        assert.equal(await page.locator(".nav-toggle").getAttribute("aria-expanded"), "false");
        await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
      }
      await page.screenshot({ path: path.join(output, `${name}-home.png`), fullPage: true });
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${name}: homepage overflow`);

      const ids = await page.locator("[data-case-study]").evaluateAll((buttons) => buttons.map((b) => b.dataset.caseStudy));
      for (const id of ids) {
        const trigger = page.locator(`[data-case-study="${id}"]`);
        await trigger.click();
        await page.waitForFunction(() => document.querySelector(".case-study-view").classList.contains("is-settled"));
        assert.equal(await page.locator("main").evaluate((el) => el.inert), true);
        await checkImages(page);
        const chapterCount = await page.locator("[data-chapter]").count();
        for (let index = 0; index < chapterCount; index++) {
          await page.locator(`[data-chapter="${index}"]`).click();
          await page.waitForTimeout(650);
          const chapter = page.locator(`[data-story-step="${index}"]`);
          if (width > 860) {
            assert.equal(await page.locator(`[data-story-visual="${index}"]`).getAttribute("aria-hidden"), "false", `${id}: chapter ${index} active`);
          } else {
            assert.equal(await chapter.locator("[data-story-visual]").count(), 1, `${id}: mobile image belongs to its chapter`);
          }
          assert(await page.locator(".case-study-scroll").evaluate((el) => el.scrollWidth <= el.clientWidth), `${name}/${id}: story overflow`);
          if (index === 0 || index === chapterCount - 1) {
            await page.screenshot({ path: path.join(output, `${name}-${id}-${index}.png`) });
          }
        }
        const enlarge = page.locator(".story-enlarge").first();
        if (await enlarge.count()) {
          const index = await enlarge.evaluate((el) => el.closest("[data-story-visual]").dataset.storyVisual);
          await page.locator(`[data-chapter="${index}"]`).click();
          await page.waitForTimeout(650);
          await enlarge.click();
          assert.equal(await page.locator(".visual-modal").getAttribute("aria-hidden"), "false");
          await page.keyboard.press("Escape");
          assert.equal(await page.locator(".visual-modal").getAttribute("aria-hidden"), "true");
          assert.equal(await page.locator("body").evaluate((el) => el.classList.contains("modal-open")), true);
          assert.equal(await page.locator(".case-study-view").evaluate((el) => el.inert), false);
        }
        assert.match(await page.locator(".case-study-code-link").getAttribute("href"), /^https:\/\/github.com\/zakilbaki\//);
        await page.keyboard.press("Escape");
        await page.waitForFunction(() => document.querySelector(".case-study-view").getAttribute("aria-hidden") === "true");
        assert.equal(await trigger.evaluate((el) => document.activeElement === el), true);
        assert.equal(await page.locator("main").evaluate((el) => el.inert), false);
      }
      await page.locator('[data-filter="Forecasting"]').click();
      assert.equal(await page.locator(".project-card").count(), 1);
      assert.equal(await page.locator('[data-filter="Forecasting"]').evaluate((el) => el === document.activeElement), true);
      await page.locator('[data-filter="All"]').click();
      assert.equal(await page.locator(".project-card").count(), 5);
      await page.locator(".professional-entry").nth(1).locator("summary").click();
      await page.locator(".professional-entry").nth(1).scrollIntoViewIfNeeded();
      await page.screenshot({ path: path.join(output, `${name}-experience.png`) });
      assert.deepEqual(errors, [], `${name}: browser errors`);
      console.log(`${name}: five project stories, images, filters, dialogs and experience passed`);
      await page.close();
    }
    const page = await browser.newPage({ reducedMotion: "reduce" });
    await page.goto(url);
    await page.locator('[data-case-study="paperpal"]').click();
    await page.waitForFunction(() => document.querySelector(".case-study-view").classList.contains("is-settled"));
    await page.keyboard.press("Shift+Tab");
    assert.equal(await page.locator(".case-study-code-link").evaluate((el) => el === document.activeElement), true, "Focus stays in project dialog");
    await page.keyboard.press("Tab");
    assert.equal(await page.locator(".case-study-close").evaluate((el) => el === document.activeElement), true);
    await page.keyboard.press("Escape");
    console.log("Reduced-motion and keyboard focus checks passed");
  } finally {
    await browser.close();
  }
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
