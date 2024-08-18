import { Inter } from "next/font/google";
import Navbar from "../components/topnavbar/nav";
import "./globals.css";
import ToastProvider from '../components/ToastProvider';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Friendshelpworld</title>
        <meta name="description" content="Friendshelpworld" />
        <link
          href="https://cdn.jsdelivr.net/npm/remixicon@4.3.0/fonts/remixicon.css"
          rel="stylesheet"
        />
      </head>
      <body className={inter.className}>
        <Navbar />
        <ToastProvider />
        {children}
      </body>
    </html>
  );
}
