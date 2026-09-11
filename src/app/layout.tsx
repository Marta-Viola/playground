import type { Metadata, Viewport } from "next";
import { Inter, Caveat } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/BottomNav";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const caveat = Caveat({ subsets: ["latin"], variable: "--font-caveat" });

export const viewport: Viewport = {
	themeColor: "#000000",
	width: "device-width",
	initialScale: 1,
	maximumScale: 1,
	userScalable: false,
};

export const metadata: Metadata = {
	title: "Playground",
  	description: "Il mio spazio personale",
	manifest: "/manifest.json",
	icons: {
		icon: "/icon.svg",
		apple: "/apple-icon.png"
	},
	appleWebApp: {
		capable: true,
		statusBarStyle: "black",
		title: "Playground",
	},
};

export default function RootLayout({ 
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="it">
      		<body className={`${inter.variable} ${caveat.variable} font-sans bg-black text-white`}>
				<main className="pb-20 min-h-screen">
					{children}
				</main>
				<BottomNav />
			</body>
    	</html>
  	);
}
