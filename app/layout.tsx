import type { Metadata } from "next";
import Script from "next/script";

import "@fontsource/cormorant-garamond/300.css";
import "@fontsource/cormorant-garamond/300-italic.css";
import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/cormorant-garamond/400-italic.css";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/cormorant-garamond/500-italic.css";
import "@fontsource/jost/300.css";
import "@fontsource/jost/400.css";
import "@fontsource/jost/500.css";
import "@fontsource/jost/600.css";

import "./globals.css";
import "./sections.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.amayaseniorliving.com"),
  title: "Amaya · Senior Living by Vera Vita | Medchal, Hyderabad",
  description:
    "Independent living, beautifully supported. A residential community for seniors beside a 700-acre reserve forest in Medchal, Hyderabad. 1 to 3.5 BHK homes from ₹82 Lac.",
  openGraph: {
    title: "Amaya by Vera Vita | Active Senior Living in Hyderabad",
    description:
      "Amaya is a luxury active senior living community in Hyderabad, set beside a 700-acre reserve forest, where independent living is enriched by wellness, healthcare, hospitality and community.",
    type: "website",
    images: [
      {
        url: "/og-images/amaya-senior-og.jpg",
        width: 1200,
        height: 628,
        alt: "Amaya by Vera Vita | Active Senior Living in Hyderabad",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Amaya by Vera Vita | Active Senior Living in Hyderabad",
    description:
      "Amaya is a luxury active senior living community in Hyderabad, set beside a 700-acre reserve forest, where independent living is enriched by wellness, healthcare, hospitality and community.",
    images: ["/og-images/amaya-senior-og.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-LEJQS6NMKX"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-LEJQS6NMKX');
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  );
}
