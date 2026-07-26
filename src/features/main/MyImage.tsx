"use client"
import Image from 'next/image';
import {useState} from "react";
import {Badge} from "@/shared/components/ui/badge";

export function MyImage() {

    const [show, setShow] = useState(false);

    return (
        <div>
            <div className="relative bg-secondary rounded-full w-60 h-60 mx-auto overflow-hidden select-none md:w-90 md:h-90 cursor-pointer"
                 onClick={() => setShow(!show)}>
                <Image src={`/me.svg`}
                       alt="amirhosein karimkhani's art-logo"
                       fill
                       preload
                       className={`${show ? "hidden" : ""}`}
                />
                <Image src={`/me.png`}
                       alt="amirhosein karimkhani's art-logo"
                       fill
                       preload
                       className={`${show ? "" : "hidden"}`}
                />
            </div>
            <Badge className="block mx-auto mt-5">tap on photo 👆🏻</Badge>
        </div>
    );
}