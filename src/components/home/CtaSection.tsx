import { Handshake, MessageCircle } from "lucide-react";
import Link from "next/link";

const CtaSection = () => {
    return (
        <section className="bg-gray-100">
            <div className="container mx-auto px-4 py-16 md:py-14">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                        Butuh Bantuan?
                    </h2>

                    <p className="mt-4 text-lg text-gray-600">
                        Temukan influencer yang tepat untuk brand Anda. Yuk, mulai diskusi!
                    </p>

                    <div className="mt-8 flex flex-col md:flex-row justify-center items-center gap-4">
                        <Link
                            href="https://api.whatsapp.com/send/?phone=6281356785992&text&type=phone_number&app_absent=0"
                            target="_blank"
                            className="flex items-center justify-center w-full bg-[#7124a8] hover:bg-[#5f1d8f] text-white font-bold py-3 px-8 rounded-md transition-transform transform hover:scale-105"
                        >
                            <MessageCircle size={20} className="mr-2"/>
                            <span>Tanya tentang Dapur Buzzer</span>
                        </Link>
                        <Link
                            href="https://dapurbuzzer.co.id/join/"
                            target="_blank"
                            className="flex items-center justify-center w-full bg-white hover:bg-[#ceb9fc] text-[#7124a8] font-bold py-3 px-8 rounded-md border border-[#7124a8] transition-transform transform hover:scale-105"
                        >
                            <Handshake size={20} className="mr-2"/>
                            <span>Gabung bersama Kami</span>
                        </Link>
                    </div>
                </div>

            </div>

        </section>
    )
}

export default CtaSection;