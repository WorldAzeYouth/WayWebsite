import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { getLocale, getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import LoadingWrapper from "@/components/common/LoadingWrapper";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700", "800", "300", "500", "600"],
});

export const metadata: Metadata = {
  title: "Way-World Azerbaijanis Youth Organization",
  description: "World Azerbaijanis Youth Organization",
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-64x64.png", sizes: "64x64", type: "image/png" },
      { url: "/favicon-128x128.png", sizes: "128x128", type: "image/png" },
      { url: "/favicon-256x256.png", sizes: "256x256", type: "image/png" },
      { url: "/favicon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const messages = await getMessages();
  const locale = await getLocale();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={poppins.className} suppressHydrationWarning>
        <LoadingWrapper>
          <main className="relative overflow-hidden">
            <NextIntlClientProvider messages={messages}>
              {children}
            </NextIntlClientProvider>
          </main>
        </LoadingWrapper>
      </body>
    </html>
  );
}