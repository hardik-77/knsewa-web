import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AnimationProvider } from "@/providers/AnimationProvider";
import { getSiteSettings, getMainNavigation, getFooterNavigation } from "@/data/adapters/content.adapter";

const siteSettings = getSiteSettings();

export const metadata: Metadata = {
  title: {
    default: `${siteSettings.name} | Premium Construction Contractor in Nepal`,
    template: `%s | ${siteSettings.name}`,
  },
  description: "Leading construction contractor in Biratnagar, Nepal with 30 years of experience in commercial and government construction projects.",
  keywords: ["construction company nepal", "biratnagar contractor", "commercial construction", "government construction"],
  icons: {
    icon: '/images/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const mainNav = getMainNavigation();
  const footerNav = getFooterNavigation();

  return (
    <html lang="en">
      <body>
        <AnimationProvider>
          <Header settings={siteSettings} navigation={mainNav} />
          <main>{children}</main>
          <Footer settings={siteSettings} navigation={footerNav} />
        </AnimationProvider>
      </body>
    </html>
  );
}
