import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

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
		apple: "/icon.svg"
	},
	appleWebApp: {
		capable: true,
		statusBarStyle: "black-translucent",
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
      		<body className={inter.className}>{children}</body>
    	</html>
  	);
}
