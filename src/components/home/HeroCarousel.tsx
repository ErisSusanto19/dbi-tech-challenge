'use client';

import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const banners = [
    {src: "/images/banner1.png", alt: "Banner 1"},
    {src: "/images/banner2.png", alt: "Banner 2"},
    {src: "/images/banner3.png", alt: "Banner 3"},
    {src: "/images/banner4.png", alt: "Banner 4"},
    {src: "/images/banner5.png", alt: "Banner 5"},
]
const HeroCarousel = () => {
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

    return (
        <div className="relative">
            <div className="overflow-hidden rounded-lg shadow-lg mb-8" ref={emblaRef}>
                <div className="flex">
                    {banners.map((item, index) => (
                        <div className="flex-grow-0 flex-shrink-0 w-full" key={index}>
                            <div className="relative w-full aspect-[3/2] max-h-[500px] bg-gradient-to-r from-[#7124a8]/90 via-black to-[#7124a8]/90">
                                <Image
                                    src={item.src}
                                    alt={item.alt}
                                    fill
                                    style={{objectFit: "contain"}}
                                    priority={index === 0}
                                    sizes="100vw"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <button
                onClick={scrollPrev}
                className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/70 hover:bg-white rounded-lg shadow-md z-10"
            >
                <ChevronLeft/>
            </button>

            <button
                onClick={scrollNext}
                className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/70 hover:bg-white rounded-lg shadow-md z-10"
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