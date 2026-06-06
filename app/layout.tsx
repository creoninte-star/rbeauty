import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "R Beauty Family Salon | Premium Beauty Salon in North Paravur, Kerala",
  description:
    "R Beauty Family Salon — Where Beauty Meets Elegance. Premium facials, hair styling, nail art & bridal makeup in North Paravur, Ernakulam. Rated 4.9/5 by 228+ clients. Open 7 days, 8:30 AM – 8:30 PM.",
  keywords: [
    "beauty salon",
    "North Paravur",
    "Kerala",
    "bridal makeup",
    "hair styling",
    "facial",
    "nail art",
    "Ernakulam",
    "R Beauty",
  ],
  openGraph: {
    title: "R Beauty Family Salon | North Paravur, Kerala",
    description:
      "Premium facials, hair styling, nail art & bridal makeup. Rated 4.9/5 by 228+ clients.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
