import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Habuild – Free 14-Day Yoga Challenge",
  description: "India ka sabse bada free yoga challenge. 14 din, daily sessions, 1.4 crore+ participants. Abhi join karo!",
  openGraph: {
    title: "Habuild – Free 14-Day Yoga Challenge",
    description: "India ka sabse bada free yoga challenge. 14 din, daily sessions, 1.4 crore+ participants. Abhi join karo!",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  return (
    <html lang="en" className={geistSans.variable}>
      <head>
        {pixelId && (
          <Script id="meta-pixel" strategy="afterInteractive">
            {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${pixelId}');fbq('track','PageView');`}
          </Script>
        )}
      </head>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
