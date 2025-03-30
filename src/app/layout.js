import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

export const metadata = {
  title: "Time-Based Recipe Finder",
  description: "Find delicious recipes based on how much time you have to cook",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geist.variable} font-sans antialiased bg-white dark:bg-gray-900`}
      >
        <div className="min-h-screen">{children}</div>
      </body>
    </html>
  );
}
