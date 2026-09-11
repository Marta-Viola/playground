"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Calendar, Settings, Wrench } from "lucide-react";

export default function BottomNav() {
    const pathname = usePathname();

    const navItems = [
        { name: "Habits", href: "/", icon: Home },
        { name: "Tools", href: "/tools", icon: Wrench },
        { name: "Calendar", href: "/calendar", icon: Calendar },
        { name: "Settings", href: "/settings", icon: Settings },
    ];

    return (
        <nav className="fixed bottom-0 w-full bg-zinc-900/90 backdrop-blur-md border-t border-zinc-800 pb-safe">
            <div className="flex justify-around items-center h-16">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;
                    return (
                        <Link key={item.name} href={item.href} className="flex flex-col items-center justify-center w-full h-full">
                            <Icon
                                size={24}
                                className={`mb-1 transition-colors ${isActive ? "text-white" : "text-zinc-500"}`}
                            />
                            <span className={`text-[10px] font-medium transition-colors ${isActive ? "text-white" : "text-zinc-500"}`}>
                                {item.name}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}