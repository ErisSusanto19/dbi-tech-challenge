'use client';

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Banner } from '@prisma/client';
import SafeImage from "../ui/SafeImage";
import Link from "next/link";

const HeroCarousel = ({banners}: {banners: Banner[]}) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({loop: true}, [Autoplay()])
    const [selectedIndex, setSelectedIndex] = useState(0)

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])
    const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi])

    useEffect(() => {
        if(!emblaApi) return;
        const onSelect = () => {
            setSelectedIndex(emblaApi.selectedScrollSnap())
        }

        emblaApi.on("select", onSelect)

        return () => { emblaApi.off("select", onSelect) }
    }, [emblaApi])

    if (!banners || banners.length === 0) {
        return (
            <div className="relative w-full aspect-[3/2] max-h-[500px] bg-gray-200 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">No active banners available.</p>
            </div>
        );
    }

    const renderSlide = (banner: Banner, index: number) => {
        return (
            <div className="relative w-full aspect-[3/2] max-h-[500px] bg-gradient-to-r from-[#7124a8]/90 via-black to-[#7124a8]/90 group">
                <SafeImage
                    src={banner.imageUrl}
                    alt={banner.title || 'Promotional Banner'}
                    fill
                    style={{objectFit: "contain"}}
                    priority={index === 0}
                    sizes="100vw"
                />

                <div className={`
                        absolute inset-0 flex flex-col items-start justify-end p-6 
                        bg-gradient-to-t from-black/50 to-transparent
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none
                    `}
                >
                    {banner.title && (
                        <h2 className="text-white text-2xl font-bold drop-shadow-lg mb-2">
                            {banner.title}
                        </h2>
                    )}

                    {banner.ctaLink && (
                        <Link 
                            href={banner.ctaLink} 
                            className="bg-[#7124a8] hover:bg-[#5f1d8f] text-white font-semibold py-2 px-4 rounded-md text-sm
                                    transition-transform transform hover:scale-105"
                        >
                            Selengkapnya
                        </Link>
                    )}
                </div>
            </div>
        )
    }

    return (
        <div className="relative">
            <div className="overflow-hidden rounded-lg shadow-lg mb-8" ref={emblaRef}>
                <div className="flex">
                    {banners.map((banner, index) => (
                        <div className="flex-grow-0 flex-shrink-0 w-full" key={index}>
                            {renderSlide(banner, index)}
                        </div>
                    ))}
                </div>
            </div>

            <button
                onClick={scrollPrev}
                className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/70 hover:bg-white rounded-lg shadow-md z-10 cursor-pointer"
            >
                <ChevronLeft/>
            </button>

            <button
                onClick={scrollNext}
                className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/70 hover:bg-white rounded-lg shadow-md z-10 cursor-pointer"
            >
                <ChevronRight/>
            </button>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center justify-center space-x-2 bg-black/20 p-2 rounded-full">
                {banners.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => scrollTo(index)}
                        className={`w-2.5 h-2.5 rounded-full transition-colors ${index === selectedIndex? 'bg-white' : 'bg-white/50 hover:bg-white/75'}`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    )

}

export default HeroCarousel