import type { Metadata } from "next";

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
  title: "Amaya · Senior Living by Vera Vita | Medchal, Hyderabad",
  description:
    "Independent living, beautifully supported. A residential community for seniors beside a 700-acre reserve forest in Medchal, Hyderabad. 1 to 3.5 BHK homes from ₹82 Lac.",
  openGraph: {
    title: "Amaya · Senior Living by Vera Vita",
    description:
      "Independent living, beautifully supported. Beside a 700-acre reserve forest, Medchal, Hyderabad.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
