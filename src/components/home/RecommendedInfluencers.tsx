'use client';

import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import InfluencerCard from "./InfluencerCard";

const recommendedInfluencers = [
    {
        "id": 1,
        "imageUrl": "https://app.dapurbuzzer.co.id/storage/avatar/DxEGtzBnum0x7IbmBdyG8fQV0cNONYhLak4sfgeE.jpeg",
        "name": "Fikri Hidayat",
        "instagramHandle": "xfikrihidayat",
        "instagramUrl": "https://instagram.com/xfikrihidayat",
        "followers": "4.6M Followers",
        "bookingUrl": "https://api.whatsapp.com/send?phone=6281356785992&text=Halo%20Dapur%20Buzzer%20Indonesia%2C%20%0A%0ASaya%20tertarik%20kepada%20talent%20%2A%40xfikrihidayat%2A%20untuk%20melakukan%20promosi%20atau%20kampanye.%20%0A%0AMohon%20infokan%20fee%20atau%20rate%20cardnya.%20Terima%20Kasih."
    },
    {
        "id": 2,
        "imageUrl": "https://app.dapurbuzzer.co.id/storage/avatar/lCE3kx57yR8fgJgY98rcjXoSV0t00fhoyVgzbAJa.jpeg",
        "name": "Meilan Indrajati",
        "instagramHandle": "meilanindraa",
        "instagramUrl": "https://instagram.com/meilanindraa",
        "followers": "53K Followers",
        "bookingUrl": "https://api.whatsapp.com/send?phone=6281356785992&text=Halo%20Dapur%20Buzzer%20Indonesia%2C%20%0A%0ASaya%20tertarik%20kepada%20talent%20%2A%40meilanindraa%2A%20untuk%20melakukan%20promosi%20atau%20kampanye.%20%0A%0AMohon%20infokan%20fee%20atau%20rate%20cardnya.%20Terima%20Kasih."
    },
    {
        "id": 3,
        "imageUrl": "https://app.dapurbuzzer.co.id/storage/avatar/lSJsmEzvdpLAWHKw49VCNSQpz6InrUFNXTk3K7Fp.jpeg",
        "name": "Adinda Dwi Cahya",
        "instagramHandle": "adindadwinda",
        "instagramUrl": "https://instagram.com/adindadwinda",
        "followers": "78.7K Followers",
        "bookingUrl": "https://api.whatsapp.com/send?phone=6281356785992&text=Halo%20Dapur%20Buzzer%20Indonesia%2C%20%0A%0ASaya%20tertarik%20kepada%20talent%20%2A%40adindadwinda%2A%20untuk%20melakukan%20promosi%20atau%20kampanye.%20%0A%0AMohon%20infokan%20fee%20atau%20rate%20cardnya.%20Terima%20Kasih."
    },
    {
        "id": 4,
        "imageUrl": "https://app.dapurbuzzer.co.id/storage/avatar/xg9OSFBjjiM3GsyQtfP1qd0BSmfMc3fPLlk0TG0G.jpeg",
        "name": "Raisha Amalia",
        "instagramHandle": "raishaaml",
        "instagramUrl": "https://instagram.com/raishaaml",
        "followers": "111K Followers",
        "bookingUrl": "https://api.whatsapp.com/send?phone=6281356785992&text=Halo%20Dapur%20Buzzer%20Indonesia%2C%20%0A%0ASaya%20tertarik%20kepada%20talent%20%2A%40raishaaml%2A%20untuk%20melakukan%20promosi%20atau%20kampanye.%20%0A%0AMohon%20infokan%20fee%20atau%20rate%20cardnya.%20Terima%20Kasih."
    },
    {
        "id": 5,
        "imageUrl": "https://app.dapurbuzzer.co.id/storage/avatar/nPdqf3kX6juvZk8XlGfXW1MGYuWGgqZQI9cXcNAO.jpeg",
        "name": "Sheila Amelia Putri",
        "instagramHandle": "sheilamlptr",
        "instagramUrl": "https://instagram.com/sheilamlptr",
        "followers": "66.4K Followers",
        "bookingUrl": "https://api.whatsapp.com/send?phone=6281356785992&text=Halo%20Dapur%20Buzzer%20Indonesia%2C%20%0A%0ASaya%20tertarik%20kepada%20talent%20%2A%40sheilamlptr%2A%20untuk%20melakukan%20promosi%20atau%20kampanye.%20%0A%0AMohon%20infokan%20fee%20atau%20rate%20cardnya.%20Terima%20Kasih."
    },
    {
        "id": 6,
        "imageUrl": "https://app.dapurbuzzer.co.id/storage/avatar/KBU6wpkegqTcx1ZyaEKOFoFv4YFp0m4rOMgisQVI.jpeg",
        "name": "Daiva Naflah Nurizka",
        "instagramHandle": "deivaann",
        "instagramUrl": "https://instagram.com/deivaann",
        "followers": "36.4K Followers",
        "bookingUrl": "https://api.whatsapp.com/send?phone=6281356785992&text=Halo%20Dapur%20Buzzer%20Indonesia%2C%20%0A%0ASaya%20tertarik%20kepada%20talent%20%2A%40deivaann%2A%20untuk%20melakukan%20promosi%20atau%20kampanye.%20%0A%0AMohon%20infokan%20fee%20atau%20rate%20cardnya.%20Terima%20Kasih."
    }
]

const RecommendedInfluencers = () => {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: "start",
        containScroll: "trimSnaps"
    })

    const [canScrollPrev, setCanScrollPrev] = useState(false) 
    const [canScrollNext, setCanScrollNext] = useState(true)

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

    const onSelect = useCallback(() => {
        if(!emblaApi) return;
        setCanScrollPrev(emblaApi.canScrollPrev())
        setCanScrollNext(emblaApi.canScrollNext())
    }, [emblaApi])

    useEffect(() => {
        if(!emblaApi) return;
        emblaApi.on('select', onSelect)
        emblaApi.on('reInit', onSelect)

        return () => { emblaApi.off('select', onSelect) }
    }, [emblaApi, onSelect])

    return (
        <section className="bg-white py-12 md:py-20">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Recommended Influencer</h2>
                    <div className="hidden md:flex items-center space-x-2">
                        <button
                            onClick={scrollPrev}
                            disabled={!canScrollPrev}
                            className={`p-2 rounded-full bg-gray-100 ${canScrollPrev? 'hover:bg-gray-200 shadow-md cursor-pointer' : ''} disabled:opacity-50`}
                        >
                            <ChevronLeft size={20}/>
                        </button>
                        <button
                            onClick={scrollNext}
                            disabled={!canScrollNext}
                            className={`p-2 rounded-full bg-gray-100 ${canScrollNext? 'hover:bg-gray-200 shadow-md cursor-pointer' : ''} disabled:opacity-50`}
                        >
                            <ChevronRight size={20}/>
                        </button>
                    </div>
                </div>

                <div className="relative">
                    <div className="overflow-hidden -mx-4 md:mx-0" ref={emblaRef}>
                        <div className="flex -ml-2">
                            {recommendedInfluencers.map(inf => (
                                <div key={inf.id} className="flex-grow-0 flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2">
                                    <InfluencerCard influencer={inf}/>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex justify-end mt-4">
                    <Link href="https://app.dapurbuzzer.co.id/recomended" className="text-sm font-semibold text-[#7124a8] hover:underline">
                        Lihat Lainnya
                    </Link>
                </div>
            </div>
        </section>
    )

}

export default RecommendedInfluencers