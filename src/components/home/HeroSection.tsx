import Link from 'next/link';
import { Plane, Smile, Dumbbell, Headphones, SquarePlay, LayoutGrid, Utensils, Sparkles } from 'lucide-react';
import HeroCarousel from './HeroCarousel';

const categories = [
    { name: "Travel & Lifestyle", icon: Plane, path: "/travel-and-lifestyle"},
    { name: "Mom & Kids", icon: Smile, path: "/mom-and-kids"},
    { name: "Health & Sport", icon: Dumbbell, path: "/health-and-sport"},
    { name: "DJ & Singer", icon: Headphones, path: "/dj-and-singer"},
    { name: "Youtuber", icon: SquarePlay, path: "/youtuber"},
    { name: "Food & Culinary", icon: Utensils, path: "/food-and-culinary" },
    { name: "Fashion & Beauty", icon: Sparkles, path: "/fashion-and-beauty" },
    { name: "Lainnya", icon: LayoutGrid, path: "/youtuber"},
]

const HeroSection = () => {

    return (
        <section className="bg-gray-50 pt-6 pb-12 md:pt-10 md:pb-20">
            <div className="container mx-auto px-4">
                <HeroCarousel/>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 text-center">
                    {categories.map((category, index) => {
                        const Icon = category.icon
                        return (
                            <Link
                                key={index}
                                href={category.path}
                                className="group block p-6 bg-white rounded-lg shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                            >
                                <div className="flex justify-center mb-3">
                                    <Icon className="w-10 h-10 text-gray-500 group-hover:text-[#7124a8] transition-colors"/>
                                </div>
                                <h3 className="font-semibold text-gray-800 group-hover:text-[#7124a8] transition-colors">
                                    {category.name}
                                </h3>
                            </Link>
                        )
                    })}

                </div>
            </div>
        </section>
    )
}

export default HeroSection;