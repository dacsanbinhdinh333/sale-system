import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Footer, Header } from "@/components";
import SessionProvider from "@/utils/SessionProvider";
import { getServerSession } from "next-auth";
import 'svgmap/dist/svgMap.min.css';
import Providers from "@/Providers";



const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Đặt sản Bình Định",
  description: "",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await getServerSession();
  return (
    <html lang="vi" data-theme="light">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <Header />
          <Providers>
            {children}
          </Providers>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
