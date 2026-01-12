import { Inter, Cormorant_Garamond } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
});

export const metadata = {
  title: "In Loving Memory of Omowunmi Oludipe Oyawemimo | 1968-2025",
  description:
    "A tribute to the extraordinary life of Omowunmi Oludipe Oyawemimo. Author, philanthropist, and beloved family member. Share memories, view photos, and celebrate her legacy.",
  openGraph: {
    title: "In Loving Memory of Omowunmi Oludipe Oyawemimo",
    description:
      "A tribute celebrating the extraordinary life of Omowunmi Oludipe Oyawemimo (1968-2025)",
    type: "website",
  },
  generator: "v0.app",
};

export const viewport = {
  themeColor: "#2C3E50",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${cormorant.variable} font-sans antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
