import "./globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import ButtonList from "@/components/select";
import { InputForm } from "@/components/input-form";
import Link from "next/link";

const roboto = Roboto({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Clipsen",
  description: "Recently popular clips",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${roboto.className} p-4 md:p-8`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex flex-col gap-4 md:gap-0 md:items-center">
            <Link href="/">
              <h1 className="text-xl md:text-5xl font-bold">Clipsen</h1>
            </Link>
            <main className="w-full max-w-screen-md flex flex-col gap-8 md:p-16">
              <ButtonList />
              <InputForm />
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
