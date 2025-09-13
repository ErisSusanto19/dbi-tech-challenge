import { Testimonial } from "@/types";
import { Quote, Star } from "lucide-react";
import SafeImage from "../ui/SafeImage";

const TestimonialCard = ({ review }: { review: Testimonial }) => {
    return (
        <div className="flex-grow-0 flex-shrink-0 w-full md:w-1/2 lg:w-1/3 p-4">
            <div className="h-full bg-white rounded-lg shadow-md flex flex-col p-8">
                <div className="flex items-center mb-4">
                    <div className="relative h-16 w-16 rounded-full mr-4 flex-shrink-0 overflow-hidden">
                        <SafeImage
                            src={review.imageUrl}
                            alt={review.name}
                            fill
                            style={{objectFit: 'cover'}}
                            sizes="64px"
                            fallbackIconSize={32}
                        />
                    </div>

                    <div>
                        <p className="font-bold text-gray-800">{review.name}</p>
                        <p className="text-sm text-gray-500">{review.role}</p>
                        <div className="flex mt-1">
                            {Array.from({length: review.rating}).map((_, i) =>(
                                <Star key={i} className="w-4 h-4 text-yellow-400 fill-current"/>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="relative flex-grow">
                    <Quote className="abosolute top-0 right-0 w-12 h-12 text-gray-100 -z-10"/>
                    <p className="relative text-gray-600 italic z-10">
                        {review.testimonial}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default TestimonialCard;