"""Export notebook figures and plot reported development results for the portfolio."""
import argparse
import base64
import json
from pathlib import Path

import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np

parser = argparse.ArgumentParser()
parser.add_argument("project", type=Path)
args = parser.parse_args()
destination = Path(__file__).resolve().parents[1] / "assets/visuals/retail-retention"
destination.mkdir(parents=True, exist_ok=True)
notebook = json.loads((args.project / "notebooks/04_exploratory_data_analysis.ipynb").read_text())
for cell, name in [(10, "monthly-customers"), (7, "churn-over-time"), (4, "customer-population")]:
    data = notebook["cells"][cell]["outputs"][0]["data"]["image/png"]
    (destination / f"{name}.png").write_bytes(base64.b64decode("".join(data)))

plt.rcParams.update({"font.family": "DejaVu Sans", "font.size": 12, "axes.spines.top": False,
                     "axes.spines.right": False, "text.color": "#202824", "axes.labelcolor": "#202824"})

# Percentages reported in notebook 07, sections 15 and 28; full validation populations.
models = ["Logistic regression", "Random Forest (depth 5)", "SGD (logistic loss)"]
first, second = [90.33, 89.56, 90.14], [97.10, 97.00, 97.12]
fig, ax = plt.subplots(figsize=(10, 6.5), layout="constrained")
y = np.arange(len(models))
ax.barh(y - .19, first, height=.32, color="#216153", label="Oct-Nov 2010")
ax.barh(y + .19, second, height=.32, color="#bd663f", label="Jan-Feb 2011")
for values, offset in [(first, -.19), (second, .19)]:
    for i, value in enumerate(values):
        ax.text(value - 1.2, i + offset, f"{value:.2f}%", ha="right", va="center", color="white", weight="bold")
ax.set(yticks=y, yticklabels=models, xlim=(0, 100), xlabel="PR AUC (%)")
ax.invert_yaxis()
ax.set_title("A simple model holds its own", loc="left", fontsize=20, pad=48, weight="bold")
ax.legend(loc="lower left", bbox_to_anchor=(0, 1.01), frameon=False, ncol=2)
ax.spines[["left", "bottom"]].set_visible(False)
ax.tick_params(length=0, pad=10)
ax.set_axisbelow(True)
ax.grid(axis="x", color="#e5e9e5")
fig.supxlabel("Development validation on two temporal folds. Final test not evaluated.", fontsize=10)
fig.savefig(destination / "model-comparison.png", dpi=180, facecolor="white")
plt.close(fig)

fig, ax = plt.subplots(figsize=(10, 5.5))
ax.set(xlim=(-5, 80), ylim=(-1, 2.2))
ax.axis("off")
ax.text(0, 1.9, "When does an active customer become at risk?", fontsize=18, weight="bold")
ax.text(0, 1.53, "Illustration: a customer with 40 days since their last valid purchase", fontsize=11, color="#616b65")
ax.plot([0, 40], [.6, .6], color="#216153", lw=7, solid_capstyle="round")
ax.plot([40, 70], [.6, .6], color="#bd663f", lw=7, solid_capstyle="round")
for day, title, detail in [(0, "Last purchase", "Day 0"), (40, "Monthly snapshot", "Day 40"), (60, "Churn boundary", "Day 60"), (70, "Horizon ends", "Day 70")]:
    ax.plot(day, .6, "o", color="#202824", markersize=8)
    above = day in (0, 60)
    ax.annotate(f"{title}\n{detail}", (day, .6), xytext=(day, 1.12 if above else -.04),
                ha="center", va="center", fontsize=10,
                arrowprops={"arrowstyle": "-", "color": "#89938d"})
ax.text(17, .88, "Observed history", fontsize=11, ha="center", color="#216153")
ax.text(55, .25, "Next 30 days", fontsize=11, ha="center", color="#a54b32")
ax.text(0, -.65, "Target: reaches 60 consecutive days without a valid positive purchase\nduring the next 30 days. A new valid purchase resets inactivity.", fontsize=11, linespacing=1.7)
fig.tight_layout()
fig.savefig(destination / "churn-definition.png", dpi=180, facecolor="white")
plt.close(fig)
