import {Button} from "@/components/ui/shadcn/button";
import Link from "next/link";

export function ContactSection() {
    return (
        <section className="max-w-4xl mx-auto">
            <div className="py-2 px-5 mb-10">
                <h2 className="font-bold text-xl my-5 lg:mt-5 lg:text-3xl">📩 Contact Me</h2>
                <div>
                    <Button asChild className="block w-full mx-auto text-center h-max mt-2 md:text-lg">
                        <Link href="https://calendar.app.google/7TVynmWgCn4J3JqK7">Book a call via Google Meet 👋</Link>
                    </Button>
                    <Button asChild variant="outline" className="block w-full mx-auto text-center h-max mt-2 md:text-lg">
                        <Link href="mailto:amir.kk@gmail.com">Email me: amir.kk1999@gmail.com</Link>
                    </Button>
                    <Button asChild variant="outline" className="block w-full mx-auto text-center h-max mt-2 md:text-lg">
                        <Link href="https://www.t.me/amirkarimi99">Message me on Telegram</Link>
                    </Button>
                    <Button asChild variant="outline" className="block w-full mx-auto text-center h-max mt-2 md:text-lg">
                        <Link href="https://wa.me/989910868255">Message me on Whatsapp</Link>
                    </Button>
                </div>
            </div>
            <p className="text-center text-xs mb-5">© all rights reserved for me!</p>
        </section>
    );
}