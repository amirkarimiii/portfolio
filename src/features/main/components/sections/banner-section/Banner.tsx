import Link from "next/link";
import {BadgeCheck, ExternalLink} from "lucide-react";
import {MyImage} from "./MyImage";
import {Button} from "@/shared/components/ui/button";
import {Paths} from "@/shared/constants/paths";
import {Alert, AlertDescription, AlertTitle} from "@/shared/components/ui/alert";
import {Ids} from "@/shared/constants/ids";
import {Separator} from "@/shared/components/ui/separator";
import {BannerService} from "@/features/main/services/bannerService";

export const Banner = async () => {
    const person = await BannerService.getPerson();

    const displayName = person?.professionalName || person?.fullName;
    const fullName = person?.fullName;
    const shortIntroduction = person?.shortIntroduction;
    const professionalNarrative = person?.professionalNarrative;
    const workAvailability = person?.workAvailability;
    const externalProfile = person?.externalProfiles;

    return (
        <section className="max-w-4xl mx-auto">
            <div className="py-2 px-5 flex flex-col gap-10 lg:flex-row-reverse mb-5 lg:mt-20">
                <div className="w-full lg:my-auto">
                    <MyImage/>
                </div>
                <div>
                    <h1 className="font-bold text-3xl lg:text-4xl select-none">
                        Hi, I’m {displayName} 👋
                    </h1>
                    {fullName && (
                        <p className="text-xs lg:text-sm mt-1 opacity-50">
                            my full name is {fullName}
                        </p>
                    )}
                    <p className="text-sm mt-2 lg:mt-3 lg:text-base">
                        {shortIntroduction}
                    </p>
                    <Button asChild variant="outline" className="block w-full mx-auto text-xs h-max border-4 my-5">
                        <Link
                            href={Paths.blog}
                            target="_blank"
                            className="flex"
                            rel="noopener noreferrer"
                            prefetch
                        >
                            Checkout my Blog
                        </Link>
                    </Button>
                    <div className="flex flex-col">
                        <p className="text-xs lg:text-sm">
                            {professionalNarrative}
                        </p>
                        {
                            workAvailability?.status && (
                                <Alert variant="verified" className="mt-4">
                                    <BadgeCheck/>
                                    <AlertTitle className="lg:text-base">I’m open
                                        to {workAvailability?.employmentType} {workAvailability?.workMode} opportunities</AlertTitle>
                                    <AlertDescription className="lg:text-base">
                                        {workAvailability?.explanation}
                                    </AlertDescription>
                                </Alert>
                            )
                        }
                    </div>
                    <div className="flex gap-1">
                        {
                            externalProfile?.map(value => (
                                <Button asChild className="flex-1 text-xs mt-2" key={value.platform}>
                                    <Link
                                        href={value.url}
                                        target="_blank"
                                        className="flex"
                                        rel="noopener noreferrer"
                                    >
                                        My {value.platform}
                                        <span className="w-3">
                                            <ExternalLink/>
                                        </span>
                                    </Link>
                                </Button>
                            ))
                        }
                    </div>
                    <Button asChild variant="outline" className="block w-full mx-auto text-xs h-max border-4 mt-2">
                        <a
                            className="flex items-center justify-center gap-1"
                            href={`#${Ids.contact}`}
                        >
                            Get in Touch
                        </a>
                    </Button>
                </div>
            </div>
            <Separator/>
        </section>
    );
};