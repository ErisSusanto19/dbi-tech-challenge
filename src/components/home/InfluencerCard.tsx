import { Influencer } from "@/types"
import { User } from "lucide-react"
import { SiInstagram } from "react-icons/si"
import Link from "next/link"
import SafeImage from "../ui/SafeImage"

const InfluencerCard = ({ influencer }: { influencer: Influencer}) => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden group">
            <div className="relative w-full aspect-[4/5] bg-gray-200">
                <Link href={`https://app.dapurbuzzer.co.id/influencer/${influencer.instagramHandle}`} className="block w-full h-full">
                    <SafeImage
                        src={influencer.imageUrl}
                        alt={influencer.name}
                        fill
                        style={{objectFit: "cover"}}
                        className="group-hover:scale-105 transition-transform duration-300"
                        fallbackIconSize={64}
                    />
                </Link>
            </div>

            <div className="p-4">
                <h3 className="font-bold text-lg text-gray-800 truncate">{influencer.name}</h3>
                <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
                    <SiInstagram size={14}/>
                    <Link href={influencer.instagramUrl} target="_blank" className="hover:underline">
                        @{influencer.instagramHandle}
                    </Link>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
                    <User size={14}/>
                    <span>{influencer.followers}</span>
                </div>
                <Link
                    href={influencer.bookingUrl}
                    target="_blank"
                    className="mt-4 block w-full text-center bg-[#7124a8] text-white font-semibold py-2 rounded-md hover:bg-[#5f1d8f] transition-colors"
                >
                    Book Now
                </Link>
            </div>
        </div>
    )
}

export default InfluencerCard;