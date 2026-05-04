/** @format */

import type { Metadata } from "next";
import { Asap_Condensed, Geist_Mono } from "next/font/google";
import "./globals.css";
import InfoNav from "@/components/CommonComponents/InfoNav";
import NavBar from "@/components/CommonComponents/NavBar";
import Footer from "@/components/CommonComponents/Footer";
import FooterBanner from "@/components/LandingPageComponents/FooterBanner";
import { ToastContainer } from "react-toastify";
import I18nProvider from "@/components/CommonComponents/I18nProvider";

const asapCondensed = Asap_Condensed({
  variable: "--font-asap-condensed",
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Gafbi Health Care",
    template: "%s | Gafbi Health Care",
  },
  description:
    "Gafbi Health Care: Manage your Gafbi Box, products, and health services with ease.",
  metadataBase: new URL("https://gafbi-health-care.vercel.app"), // Change to your actual domain if different
  openGraph: {
    title: "Gafbi Health Care",
    description:
      "Manage your Gafbi Box, products, and health services with ease.",
    url: "https://gafbi-health-care.vercel.app/",
    siteName: "Gafbi Health Care",
    images: [
      {
        url: "https://gafbi-health-care.vercel.app/logo.png",
        width: 512,
        height: 512,
        alt: "Gafbi Health Care Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gafbi Health Care",
    description:
      "Manage your Gafbi Box, products, and health services with ease.",
    images: ["https://gafbi-health-care.vercel.app/logo.png"],
    site: "@gafbihealthcare", // Change to your Twitter handle if available
  },
  alternates: {
    canonical: "https://gafbi-health-care.vercel.app/",
  },
  icons: {
    icon: "https://gafbi-health-care.vercel.app/logo.png",
    shortcut: "https://gafbi-health-care.vercel.app/logo.png",
    apple: "https://gafbi-health-care.vercel.app/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${asapCondensed.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[--color-background] overflow-x-hidden">
        <I18nProvider>
          <ToastContainer />
          <InfoNav />
          <NavBar />

          {children}
          <FooterBanner />
          <Footer />
        </I18nProvider>
      </body>
    </html>
  );
}
