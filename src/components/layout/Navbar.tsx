'use client';

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const menuItems = [
        { name: "Home", path: "/"},
        { name: "About", path: "/about"},
        { name: "Influencer", path: "/influencer"},
        { name: "Campaign", path: "/campaign"},
        { name: "Package", path: "/package"},
        { name: "Join Influencer", path: "/join"},
        { name: "Terms & Conditions", path: "/term-and-condition"},
        { name: "FAQ", path: "/faq"},
    ]

    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <div className="flex justify-center items-center space-x-4">
                    <Link href="/" className="flex-shrink-0">
                        <Image
                            src="/logo-color.png"
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
                    {menuItems.map(item => (
                        <Link
                            key={item.name}
                            href={item.path}
                            className={`
                                text-gray-600 hover:text-[#7124a8] transition-colors whitespace-nowrap px-1
                            `}
                        >
                            {item.name}
                        </Link>
                    ))}
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
                        {menuItems.map(item => (
                            <Link
                                key={item.name}
                                href={item.path}
                                className="text-gray-600 hover:text-[#7124a8] p-2 rounded-md hover:bg-gray-100 transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>
                </div>
            )}

        </header>
    )

}

export default Navbar;