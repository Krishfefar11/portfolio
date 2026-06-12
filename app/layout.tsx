import type { Metadata, Viewport } from "next";
import "./globals.css";
import SmoothScroll from "@/components/ui/SmoothScroll";
import LoadingScreen from "@/components/ui/LoadingScreen";
import ScrollProgress from "@/components/ui/ScrollProgress";
import Navbar from "@/components/ui/Navbar";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://krishfefar.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Krish Fefar | Full Stack Developer",
    template: "%s | Krish Fefar",
  },
  description:
    "Krish Fefar — Full Stack Developer specializing in the MERN stack. Building scalable web applications including AI-powered platforms and real-time dashboards. TCS CodeVita Global Rank 2931.",
  keywords: [
    "Krish Fefar",
    "Full Stack Developer",
    "MERN Stack",
    "React Developer",
    "Node.js Developer",
    "MongoDB",
    "Software Engineer",
    "CHARUSAT",
    "Portfolio",
    "Web Developer India",
  ],
  authors: [{ name: "Krish Fefar", url: BASE_URL }],
  creator: "Krish Fefar",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    title: "Krish Fefar | Full Stack Developer",
    description:
      "Full Stack Developer specializing in MERN stack. TCS CodeVita Global Rank 2931. IBM ML Certified. Building scalable web apps that make a real-world impact.",
    siteName: "Krish Fefar Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Krish Fefar – Full Stack Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Krish Fefar | Full Stack Developer",
    description:
      "Full Stack Developer specializing in MERN stack. TCS CodeVita Global Rank 2931.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="bg-background text-white antialiased">
        <LoadingScreen />
        <SmoothScroll>
          <ScrollProgress />
          <Navbar />
          <main>{children}</main>
        </SmoothScroll>
      </body>
    </html>
  );
}
