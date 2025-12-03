import { Roboto_Condensed } from "next/font/google";
import "./globals.css";

const roboto = Roboto_Condensed({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "Sorteio Hipersenna",
  description: "Em desenvolvimento",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className={`${roboto.variable} antialiased`}>{children}</body>
    </html>
  );
}
