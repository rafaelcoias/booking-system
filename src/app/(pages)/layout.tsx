import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { AuthProvider } from "~/contexts/AuthContext";
import Navbar from "~/components/common/Navbar";

export const metadata: Metadata = {
  title: "Clínica Dentária | Website",
  description: "Clínica Dentária Lisboa, cuidados dentários de excelência.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
