import Image from 'next/image';
import {Separator} from "@/components/ui/shadcn/separator";

export function BlogBanner() {
    return (
        <section className="max-w-4xl mx-auto max-h-max">
            <div className="select-none relative w-65 sm:w-80 md:w-100 aspect-120/100 mt-5 mx-auto">
                <Image src={`/me-blog-banner.png`}
                       alt="amirhosein karimkhani's art-logo"
                       fill
                       preload
                />
            </div>
            <p className="select-none text-shadow-2xs rotate-x-55 max-w-max text-2xl sm:text-3xl md:text-4xl font-bold mx-auto">Welcome to my blog</p>
            <Separator/>
        </section>
    );
}