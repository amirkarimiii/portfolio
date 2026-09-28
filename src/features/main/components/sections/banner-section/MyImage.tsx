"use client"
import Image from 'next/image';
import {useState} from "react";
import {Badge} from "@/shared/components/ui/badge";
import {Asset} from "@/features/main/schema/personSchema";

interface MyImageProps {
    professionalImage?: string,
    assets?: Asset[]
}

export function MyImage({professionalImage, assets}: MyImageProps) {

    const [show, setShow] = useState(false);
    const artline = assets?.find(value => value.type == 'photo');

    return (
        <div>
            <div className="relative bg-secondary rounded-full w-60 h-60 mx-auto overflow-hidden select-none md:w-90 md:h-90 cursor-pointer"
                 onClick={() => setShow(!show)}>
                <Image src={`${artline ? artline.url : '/default-fallback-image.png'}`}
                       alt="art-logo"
                       fill
                       preload
                       className={`${show ? "hidden" : ""}`}
                />
                <Image src={`${professionalImage ? professionalImage : '/default-fallback-image.png'}`}
                       alt="professional image"
                       fill
                       preload
                       className={`${show ? "" : "hidden"}`}
                />
            </div>
            <Badge className="block mx-auto mt-5">tap on photo 👆🏻</Badge>
        </div>
    );
}