"use client"
import Image from 'next/image';
import {useState} from "react";

export function MyImage() {

    const [show, setShow] = useState(false);

    return (
        <div>
            <div className="relative bg-secondary rounded-full w-70 h-70 mx-auto overflow-hidden select-none md:w-90 md:h-90"
                 onClick={() => setShow(!show)}>
                <Image src={`/me.${show? "png" : "svg"}`}
                       alt="amirhosein karimkhani's art-logo"
                       fill
                />
            </div>
        </div>
    );
}