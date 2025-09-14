import "./globals.css";
import { Analytics } from '@vercel/analytics/react';

export const metadata = {
  title: "My Nguyen — Profile",
  description: "Scholarship & CV portfolio"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
