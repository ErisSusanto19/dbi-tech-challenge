'use client';

import useEmblaCarousel from "embla-carousel-react";
import TestimonialCard from "./TestimonialCard";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    "name": "Lucy Juliana Wagey",
    "role": "Influencer",
    "imageUrl": "https://app.dapurbuzzer.co.id/storage/avatar/PSSYrdgm1inQxO0lLBzE6jgZ9JMcur4GdNqWA25p.jpeg",
    "rating": 5,
    "testimonial": "Dapur buzzer memiliki pelayanan yang sangat baik dan informasi yang sangat detail dalam menyampaikan brief jika kurang dimengerti. semenjak bergabung dengan dapur buzzer saya kebanjiran endorse dan paidpromote."
  },
  {
    "name": "Cut Salwa Nabila",
    "role": "Influencer",
    "imageUrl": "https://app.dapurbuzzer.co.id/storage/avatar/UAGi3OowtHGpUcjtRB8wOA3WbwjvEnx2sdq9JMus.jpeg",
    "rating": 5,
    "testimonial": "Manajement ini seru bgt! banyak info job dan masih banyak lagi, baru kali ini nemu manajement yg gak ada potongan fee  talentnya, selalu fast respon dan adminnya super ramah+sopan, pencairan feenya juga cpt banget."
  },
  {
    "name": "Ayu Fadilah",
    "role": "Influencer",
    "imageUrl": "https://app.dapurbuzzer.co.id/storage/avatar/Dao72ec8Gzu45vEITIuwG7qV1HCTtWnAQ6TiEuBE.jpeg",
    "rating": 5,
    "testimonial": "Sumpah ayu seneng banget selama bekerja sama dengan dapurbuzzer, pelayanan dan arahan dari pihak dapur buzzer juga memuaskan, senang bisa bergabung bersama Dapur buzzer."
  },
  {
    "name": "Ica Siti Chodijah",
    "role": "Influencer",
    "imageUrl": "https://app.dapurbuzzer.co.id/storage/avatar/vaUabYQGAtiYvdyGlTqHjw6qzaoVu990purzSnt7.jpeg",
    "rating": 5,
    "testimonial": "Untuk kesan kepada dapur buzzer dalam apapun sudah baik dan adminnya juga ramah banget dan untuk pesan kepada dapur buzzer semoga makin banyak lagi campaign nyaa sukses selalu."
  }
]

const TestimonialSection = () => {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: 'start',
        containScroll: 'trimSnaps'
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
        onSelect()
        emblaApi.on('select', onSelect)
        emblaApi.on('reInit', onSelect)
        return () => { emblaApi.off('select', onSelect) }
    }, [emblaApi, onSelect])

    return (
        <section className="bg-gray-100 py-12 md:py-20">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center text-center md:text-left mb-10">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Apa kata mereka?</h2>
                        <p className="mt-4 text-lg max-w-2xl mx-auto">
                            Dengarkan langsung pengalaman mereka yang telah bekerja sama dengan kami.
                        </p>
                    </div>

                    <div className="hidden md:flex items-center space-x-2">
                        <button 
                            onClick={scrollPrev}
                            disabled={!canScrollPrev}
                            className={`p-2 rounded-full bg-white ${canScrollPrev? 'hover:bg-gray-200 shadow-md cursor-pointer' : ''} disabled:opacity-50`}
                        >
                            <ChevronLeft size={20}/>
                        </button>
                        <button 
                            onClick={scrollNext}
                            disabled={!canScrollNext}
                            className={`p-2 rounded-full bg-white ${canScrollNext? 'hover:bg-gray-200 shadow-md cursor-pointer' : ''} disabled:opacity-50`}
                        >
                            <ChevronRight size={20}/>
                        </button>
                    </div>
                </div>

                <div className="overflow-hidden -mx-4" ref={emblaRef}>
                    <div className="flex">
                        {testimonials.map((review, index) => (
                            <TestimonialCard  key={index} review={review}/>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default TestimonialSection; 