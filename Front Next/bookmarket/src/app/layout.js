import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Importation de la police Bacasime Antique depuis Google Fonts
import Head from "next/head";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "BookMarket",
  description: "Acheter vos livres en ligne",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Bacasime+Antique&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/boxicons@2.1.1/css/boxicons.min.css"
        />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      > 
        {children}
      </body>
    </html>
  );
}
