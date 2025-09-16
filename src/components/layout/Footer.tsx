import Link from "next/link";
import SafeImage from "../ui/SafeImage";
import { SiInstagram, SiFacebook, SiTiktok } from "react-icons/si";

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white">
            <div className="container mx-auto px-4 py-12 md:py20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="md:col-span-2 lg:col-span-1">
                        <div className="flex items-center mb-4">
                            <SafeImage 
                                src="https://dapurbuzzer.co.id/assets/img/logo-white.png"
                                alt="DBI logo"
                                width={96}
                                height={96}
                            />
                            <span className="ml-3 text-lg font-bold">Dapur Buzzer Indonesia</span>
                        </div>
                        <p className="text-gray-400 text-sm max-w-xs">
                            Influencer & KOL Management Platform Indonesia
                        </p>
                        <div className="flex space-x-4 mt-6">
                            <Link href="https://instagram.com/dapurbuzzer" className="text-gray-400 hover:text-white"><SiInstagram/></Link>
                            <Link href="https://www.tiktok.com/@dapurbuzzer" className="text-gray-400 hover:text-white"><SiTiktok/></Link>
                            <Link href="https://www.facebook.com/dapurbuzzer" className="text-gray-400 hover:text-white"><SiFacebook/></Link>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Jelajah</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/about" className="text-gray-400 hover:text-white">About</Link></li>
                            <li><Link href="/influencer" className="text-gray-400 hover:text-white">Influencer</Link></li>
                            <li><Link href="/campaign" className="text-gray-400 hover:text-white">Campaign</Link></li>
                            <li><Link href="/package" className="text-gray-400 hover:text-white">Package</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Bantuan</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/faq" className="text-gray-400 hover:text-white">FAQ</Link></li>
                            <li><Link href="/term-and-condition" className="text-gray-400 hover:text-white">Terms & Conditions</Link></li>
                            <li><Link href="/contact" className="text-gray-400 hover:text-white">Hubungi Kami</Link></li>
                            <li><Link href="/admin/banners" className="text-gray-400 hover:text-blue-400">Admin Panel</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Download Aplikasi</h3>
                        <div className="flex flex-col space-y-3">
                            <Link href="https://apps.apple.com/us/app/dapur-buzzer/id1579080839">
                                <SafeImage 
                                    src="https://app.dapurbuzzer.co.id/images/icon/logo-appstore.png" 
                                    alt="Download on the App Store"
                                    width={120}
                                    height={40}
                                />
                            </Link>
                            <Link href="https://play.google.com/store/apps/details?id=com.dapurbuzzer.app">
                                <SafeImage 
                                    src="https://app.dapurbuzzer.co.id/images/icon/logo-playstore.png" 
                                    alt="Get it on Google Store"
                                    width={120}
                                    height={40}
                                />
                            </Link>
                        </div>
                    </div>

                </div>

                <div className="mt-12 border-t border-gray-700 text-center text-sm pt-6 text-gray-500">
                    <p>
                        &copy; {new Date().getFullYear()} Dapur Buzzer Part of PT.FHCreative Group Indonesia. All Rights Reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;