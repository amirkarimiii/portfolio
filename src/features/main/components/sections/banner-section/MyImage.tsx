"use client"
import Image from 'next/image';
import {useState} from "react";
import {Asset} from "@/features/main/schema/personSchema";

interface MyImageProps {
    assets?: Asset[]
}

export function MyImage({assets}: MyImageProps) {

    const artline = assets?.find(value => value.type == 'photo');

    return (
        <div>
            <div className="relative bg-secondary rounded-full w-50 aspect-square mx-auto overflow-hidden cursor-default select-none md:w-80">
                <Image src={`${artline ? artline.url : '/default-fallback-image.png'}`}
                       alt="art-logo"
                       fill
                       preload
                       className="select-none"
                />
            </div>
        </div>
    );
}