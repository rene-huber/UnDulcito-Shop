import { Inter } from "next/font/google";
import "@/app/css/globals.css";
import  AuthProvider  from "@/providers/AuthProvider";
import Navbar from "@/components/NavBar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });


export const metadata = {
  title: "Delicious soft cookies 🍪, pavlovas 🍓and 3 leches cakes🎂 ",
  description: "10 years of experience baking goods",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
<AuthProvider>
<Navbar />
        {children}
<Footer />
</AuthProvider>
        </body>
    </html>
  );
}
