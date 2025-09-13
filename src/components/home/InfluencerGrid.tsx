import Link from "next/link";
import InfluencerCard from "./InfluencerCard";

const influencers = [
    {
        "id": 7,
        "imageUrl": "https://app.dapurbuzzer.co.id/storage/avatar/9jHVLwu0H5xA3NJlXpMK0J7jBP3LwcAqkCa2F4RF.jpeg",
        "name": "Hakimah Yuliana Putri",
        "instagramHandle": "yuliannaputriii_",
        "instagramUrl": "https://instagram.com/yuliannaputriii_",
        "followers": "22.9K Followers",
        "bookingUrl": "https://api.whatsapp.com/send?phone=6281356785992&text=Halo%20Dapur%20Buzzer%20Indonesia%2C%20%0A%0ASaya%20tertarik%20kepada%20talent%20%2A%40yuliannaputriii_%2A%20untuk%20melakukan%20promosi%20atau%20kampanye.%20%0A%0AMohon%20infokan%20fee%20atau%20rate%20cardnya.%20Terima%20Kasih."
    },
    {
        "id": 8,
        "imageUrl": "https://app.dapurbuzzer.co.id/storage/avatar/CnwKevfpp0Dy8zDQZ8law69932bhaQbBil3bohIE.jpeg",
        "name": "Chylvia Febellia Elvionita",
        "instagramHandle": "chylviaelvionita",
        "instagramUrl": "https://instagram.com/chylviaelvionita",
        "followers": "28.3K Followers",
        "bookingUrl": "https://api.whatsapp.com/send?phone=6281356785992&text=Halo%20Dapur%20Buzzer%20Indonesia%2C%20%0A%0ASaya%20tertarik%20kepada%20talent%20%2A%40chylviaelvionita%2A%20untuk%20melakukan%20promosi%20atau%20kampanye.%20%0A%0AMohon%20infokan%20fee%20atau%20rate%20cardnya.%20Terima%20Kasih."
    },
    {
        "id": 9,
        "imageUrl": "https://app.dapurbuzzer.co.id/storage/avatar/BgURblzNjhzxFZpSDdK0VyVpWY1DQ4HIUHCB0nNz.jpeg",
        "name": "Mutia Zahwani",
        "instagramHandle": "mutiazhwn",
        "instagramUrl": "https://instagram.com/mutiazhwn",
        "followers": "76.3K Followers",
        "bookingUrl": "https://api.whatsapp.com/send?phone=6281356785992&text=Halo%20Dapur%20Buzzer%20Indonesia%2C%20%0A%0ASaya%20tertarik%20kepada%20talent%20%2A%40mutiazhwn%2A%20untuk%20melakukan%20promosi%20atau%20kampanye.%20%0A%0AMohon%20infokan%20fee%20atau%20rate%20cardnya.%20Terima%20Kasih."
    },
    {
        "id": 10,
        "imageUrl": "https://app.dapurbuzzer.co.id/storage/avatar/vhfDGy2y4PisgQHRruBtculFPUqaLYsqkKNpgTI8.jpeg",
        "name": "Dilla Putri Giovanca",
        "instagramHandle": "Dillagiovanca",
        "instagramUrl": "https://instagram.com/Dillagiovanca",
        "followers": "36.2K Followers",
        "bookingUrl": "https://api.whatsapp.com/send?phone=6281356785992&text=Halo%20Dapur%20Buzzer%20Indonesia%2C%20%0A%0ASaya%20tertarik%20kepada%20talent%20%2A%40Dillagiovanca%2A%20untuk%20melakukan%20promosi%20atau%20kampanye.%20%0A%0AMohon%20infokan%20fee%20atau%20rate%20cardnya.%20Terima%20Kasih."
    },
    {
        "id": 11,
        "imageUrl": "https://app.dapurbuzzer.co.id/storage/avatar/YGmwdfKRaYcslW9W5QJKgsjVC79SMPedEoXQdGhf.jpeg",
        "name": "Khansa Mariska Firdausi",
        "instagramHandle": "khansa_mariska",
        "instagramUrl": "https://instagram.com/khansa_mariska",
        "followers": "76.8K Followers",
        "bookingUrl": "https://api.whatsapp.com/send?phone=6281356785992&text=Halo%20Dapur%20Buzzer%20Indonesia%2C%20%0A%0ASaya%20tertarik%20kepada%20talent%20%2A%40khansa_mariska%2A%20untuk%20melakukan%20promosi%20atau%20kampanye.%20%0A%0AMohon%20infokan%20fee%20atau%20rate%20cardnya.%20Terima%20Kasih."
    },
    {
        "id": 12,
        "imageUrl": "https://app.dapurbuzzer.co.id/storage/avatar/CY0QcQsJJu86VCIig2S2eVqykEamBPkOQFWZAzwq.jpeg",
        "name": "Ersa Chese",
        "instagramHandle": "ersachese_",
        "instagramUrl": "https://instagram.com/ersachese_",
        "followers": "62.8K Followers",
        "bookingUrl": "https://api.whatsapp.com/send?phone=6281356785992&text=Halo%20Dapur%20Buzzer%20Indonesia%2C%20%0A%0ASaya%20tertarik%20kepada%20talent%20%2A%40ersachese_%2A%20untuk%20melakukan%20promosi%20atau%20kampanye.%20%0A%0AMohon%20infokan%20fee%20atau%20rate%20cardnya.%20Terima%20Kasih."
    },
    {
        "id": 13,
        "imageUrl": "https://app.dapurbuzzer.co.id/storage/avatar/nY3k2jvtmg3U5waPrcNAR1Vc6VXQH7X2LIJEONCc.jpeg",
        "name": "Citra Yolanda",
        "instagramHandle": "citrayolannn",
        "instagramUrl": "https://instagram.com/citrayolannn",
        "followers": "41.4K Followers",
        "bookingUrl": "https://api.whatsapp.com/send?phone=6281356785992&text=Halo%20Dapur%20Buzzer%20Indonesia%2C%20%0A%0ASaya%20tertarik%20kepada%20talent%20%2A%40citrayolannn%2A%20untuk%20melakukan%20promosi%20atau%20kampanye.%20%0A%0AMohon%20infokan%20fee%20atau%20rate%20cardnya.%20Terima%20Kasih."
    },
    {
        "id": 14,
        "imageUrl": "https://app.dapurbuzzer.co.id/storage/avatar/9yStXMvSmqJnXvVudzhv6SyEYPNcWsVbvqXrmJvY.jpeg",
        "name": "Dania Aulia",
        "instagramHandle": "daniawly",
        "instagramUrl": "https://instagram.com/daniawly",
        "followers": "221.1K Followers",
        "bookingUrl": "https://api.whatsapp.com/send?phone=6281356785992&text=Halo%20Dapur%20Buzzer%20Indonesia%2C%20%0A%0ASaya%20tertarik%20kepada%20talent%20%2A%40daniawly%2A%20untuk%20melakukan%20promosi%20atau%20kampanye.%20%0A%0AMohon%20infokan%20fee%20atau%20rate%20cardnya.%20Terima%20Kasih."
    }
]

const InfluencerGrid = () => {
    return (
        <section className="bg-white py-12 md:py-20">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800"> Influencer Lainnya </h2>
                    <Link href="/influencers" className="text-sm font-semibold text-[#7124a8] hover:underline">
                        Lihat Lainnya
                    </Link>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {influencers.map(inf => (
                        <InfluencerCard key={inf.id} influencer={inf}/>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default InfluencerGrid;