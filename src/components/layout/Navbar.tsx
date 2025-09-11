'use client';

import Image from "next/image";
import Link from "next/link";
import { FileText, HelpCircle, Home, Info, Megaphone, Menu, Package, UserPlus, Users, X } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname()

    const menuItems = [
        { name: "Home", icon: Home, path: "/" },
        { name: "About", icon: Info, path: "/about" },
        { name: "Influencer", icon: Users, path: "/influencer" },
        { name: "Campaign", icon: Megaphone, path: "/campaign" },
        { name: "Package", icon: Package, path: "/package" },
        { name: "Join Influencer", icon: UserPlus, path: "/join" },
        { name: "Terms & Conditions", icon: FileText, path: "/term-and-condition" },
        { name: "FAQ", icon: HelpCircle, path: "/faq" },
    ];

    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <div className="flex justify-center items-center space-x-4">
                    <Link href="/" className="flex-shrink-0">
                        <Image
                            src="/images/logo-color.png"
                            alt="DBI Tech Logo"
                            width={80}
                            height={30}
                            className="h-auto"
                        />
                    </Link>
                    <div className="relative hidden sm:block">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="border border-[#ceb9fc] rounded-md py-1 px-2 w-32 lg:w-40 xl:w-48 focus:border-[#7124a8] focus:ring-1 focus:ring-[#7124a8] focus:outline-none transition-all duration-300"
                        />
                    </div>
                </div>

                <nav className="hidden lg:flex items-center space-x-4">
                    {menuItems.map((item, index) => {
                        const isActive = pathname === item.path;
                        return (
                            <Link
                                key={index}
                                href={item.path}
                                className={`
                                    transition-colors whitespace-nowrap px-1 py-2
                                    hover:text-[#7124a8]
                                    ${isActive 
                                        ? 'text-[#7124a8] font-semibold border-b-2 border-[#7124a8]'
                                        : 'text-gray-600'
                                    }
                                `}
                            >
                                {item.name}
                            </Link>
                        )
                    })}
                </nav>

                <div className="lg:hidden">
                    <button 
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="text-gray-800 focus:outline-none"
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen? <X className="w-6 h-6"/> : <Menu className="w-6 h-6"/>}
                    </button>
                </div>

            </div>

            {isMenuOpen && (
                <div className="lg:hidden bg-white border-t border-gray-200">
                    <nav className="flex flex-col p-4 space-y-2">
                        {menuItems.map((item, index) => {
                            const isActive = pathname === item.path
                            const Icon = item.icon
                            return (
                                <Link
                                    key={index}
                                    href={item.path}
                                    className={`
                                        flex items-center gap-3 p-3 rounded-md text-base
                                        transition-colors
                                        ${isActive
                                            ? 'bg-[#f3eef9] text-[#7124a8] font-semibold'
                                            : 'text-gray-600'
                                        }
                                    `}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <Icon className="w-5 h-5 flex-shrink-0"/>
                                    {item.name}
                                </Link>
                            )
                        })}
                    </nav>
                </div>
            )}

        </header>
    )

}

export default Navbar;