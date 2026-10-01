import Link from "next/link";
import { Ids } from "@/shared/constants/ids";
import { Button } from "@/shared/components/ui/button";
import {ContactMethod} from "@/features/main/schema/contactSchema";
import {ContactService} from "@/features/main/services/contactService";


function getMethodDetails(method: ContactMethod) {
    switch (method.type) {
        case "booking":
            return {
                label: "Book a call via Google Meet 👋",
                href: method.value,
                variant: "default" as const,
                isExternal: true,
            };
        case "email":
            return {
                label: `Email me: ${method.value.replace(/^mailto:/, "")}`,
                href: method.value.startsWith("mailto:") ? method.value : `mailto:${method.value}`,
                variant: "outline" as const,
                isExternal: false,
            };
        case "telegram":
            return {
                label: "Message me on Telegram",
                href: method.value,
                variant: "outline" as const,
                isExternal: true,
            };
        case "whatsapp":
            return {
                label: "Message me on Whatsapp",
                href: method.value,
                variant: "outline" as const,
                isExternal: true,
            };
        default:
            return {
                label: method.value,
                href: method.value,
                variant: "outline" as const,
                isExternal: true,
            };
    }
}

export async function ContactSection() {
    const contactData = await ContactService.getContactInfo();
    const methods = contactData?.methods || [];

    return (
        <section className="max-w-4xl mx-auto" id={Ids.contact}>
            <div className="py-2 px-5 mb-10">
                <h2 className="font-bold text-xl my-5 lg:mt-5 lg:text-3xl">📩 Contact Information</h2>
                <div>
                    {methods.map((method, index) => {
                        const details = getMethodDetails(method);

                        return (
                            <Button
                                key={`${method.type}-${index}`}
                                asChild
                                variant={details.variant}
                                className="block w-full mx-auto text-center h-max mt-2 md:text-lg"
                            >
                                <Link
                                    href={details.href}
                                    target={details.isExternal ? "_blank" : undefined}
                                    rel={details.isExternal ? "noopener noreferrer" : undefined}
                                >
                                    {details.label}
                                </Link>
                            </Button>
                        );
                    })}
                </div>
            </div>
            <p className="text-center text-xs mb-5">© all rights reserved for me!</p>
        </section>
    );
}