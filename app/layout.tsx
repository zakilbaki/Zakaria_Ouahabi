import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zakaria Ouahabi | Data Scientist & AI Engineer",
  description:
    "Portfolio of Zakaria Ouahabi, Data Scientist and AI Engineer building machine learning, NLP and industrial data applications.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
