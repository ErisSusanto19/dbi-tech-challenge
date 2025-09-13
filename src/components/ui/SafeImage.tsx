'use client';

import { User } from "lucide-react";
import Image, { ImageProps } from "next/image";
import { useState } from "react";

interface SafeImageProps extends ImageProps {
    fallbackIconSize: number;
}

const SafeImage = ({ src, alt, fallbackIconSize= 48, ...props }: SafeImageProps) => {
    const [imgError, setImgError] = useState(false)

    if(imgError || !src){
        return (
            <div className="w-full h-full bg-gray-200 flex justify-center items-center">
                <User size={fallbackIconSize} className="text-gray-400"/>
            </div>
        )
    }

    return (
        <Image
            src={src}
            alt={alt}
            onError={() => setImgError(true)}
            {...props}
        />
    )
}

export default SafeImage;