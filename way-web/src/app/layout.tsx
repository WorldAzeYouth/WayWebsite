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
    icon: "/images/logos/WAY_LOGO_transparent.ico",
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