import Link from "next/link";
import {ExternalLink} from "lucide-react";
import Image from 'next/image';
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/shared/components/ui/tabs";
import {Alert, AlertDescription, AlertTitle} from "@/shared/components/ui/alert";
import {Separator} from "@/shared/components/ui/separator";
import {BannerService} from "@/features/main/services/bannerService";
import {LanguageListItem} from "@/features/main/components/sections/info-section/LanguageListItem";

export const InfoSection = async () => {

    const person = await BannerService.getPerson();

    const bachelor = person?.educations?.find(value => value.degree.level == 'bachelor');
    const master = person?.educations?.find(value => value.degree.level == 'master');

    const nativeLang = person?.languages?.find(value => value.native !== null);

    const langs = person?.languages?.filter(value => value.native == null);

    return (
        <section className="max-w-4xl mx-auto">
            <div className="py-2 px-5 mb-10">
                <Tabs defaultValue="language">
                    <TabsList className="flex flex-wrap h-max">
                        <TabsTrigger value="language">🗣 Language</TabsTrigger>
                        <TabsTrigger value="education">🎓 Educational Background</TabsTrigger>
                    </TabsList>
                    <TabsContent value="language">
                        <h2 className="font-bold text-xl mt-3 lg:mt-5 lg:text-3xl">🗣 Language</h2>
                        <p className="mt-10">
                            <span className="font-bold text-base lg:text-xl">I&apos;m a {nativeLang?.native?.nationality}</span><br/>
                            <span className="text-sm lg:text-base">and my native language is {nativeLang?.native?.language}.
                                <br/><br/>and also I&apos;m skilled in</span>
                        </p>
                        <div className="flex flex-col gap-3 mt-3 md:flex-row">
                            {langs?.map(lang => (
                                <Alert variant="default" key={lang.name} className="block">
                                    <AlertTitle className="ml-5 text-base lg:text-xl">{lang.name}</AlertTitle>
                                    <AlertDescription className="lg:text-base">
                                        <ul className="ml-5 mt-3">
                                            <li className="mt-1">
                                                <LanguageListItem kind="reading" level={lang.reading.level} note={lang.reading.note} evidence={lang.reading.evidence}/>
                                            </li>
                                            <li className="mt-1">
                                                <LanguageListItem kind="speaking" level={lang.speaking.level} note={lang.speaking.note} evidence={lang.speaking.evidence}/>
                                            </li>
                                            <li className="mt-1">
                                                <LanguageListItem kind="listening" level={lang.listening.level} note={lang.listening.note} evidence={lang.listening.evidence}/>
                                            </li>
                                            <li className="mt-1">
                                                <LanguageListItem kind="writing" level={lang.writing.level} note={lang.writing.note} evidence={lang.writing.evidence}/>
                                            </li>
                                        </ul>
                                    </AlertDescription>
                                </Alert>
                            ))}
                        </div>
                    </TabsContent>
                    <TabsContent value="education">
                        <h2 className="font-bold text-xl mt-3 lg:mt-5 lg:text-3xl">🎓 Educational Background</h2>
                        <Alert variant="default" className="mt-4 max-w-140">
                            <AlertTitle className="text-base ml-7 lg:text-xl">M.Sc.
                                in {master?.degree.field}</AlertTitle>
                            <AlertDescription className="lg:text-base">
                                <div className="flex gap-3">
                                    <div className="relative w-4">
                                        <Image src={`${master?.institution.logo}`}
                                               alt="master institution logo"
                                               fill
                                               className="dark:invert"
                                        />
                                    </div>
                                    <Link href={`${master?.institution.website}`}
                                          target="_blank"
                                          className="flex gap-1"
                                          rel="noopener noreferrer"
                                    >
                                        <p>{master?.institution.name}</p>
                                        <div className="w-3">
                                            <ExternalLink/>
                                        </div>
                                    </Link>
                                </div>
                                <p className="ml-7">{master?.date.start} – {master?.date.end}</p>
                            </AlertDescription>
                        </Alert>
                        <Alert variant="default" className="mt-4 max-w-140">
                            <AlertTitle className="text-base ml-7 lg:text-xl">B.Sc.
                                in {bachelor?.degree.field}</AlertTitle>
                            <AlertDescription className="lg:text-base">
                                <div className="flex gap-3">
                                    <div className="relative w-4">
                                        <Image src={`${bachelor?.institution.logo}`}
                                               alt="bachelor institution logo"
                                               fill
                                               className="dark:invert"
                                        />
                                    </div>
                                    <Link href={`${bachelor?.institution.website}`}
                                          target="_blank"
                                          className="flex gap-1"
                                          rel="noopener noreferrer"
                                    >
                                        <p>{bachelor?.institution.name}</p>
                                        <div className="w-3">
                                            <ExternalLink/>
                                        </div>
                                    </Link>
                                </div>
                                <p className="ml-7">{bachelor?.date.start} – {bachelor?.date.end}</p>
                            </AlertDescription>
                        </Alert>
                    </TabsContent>
                </Tabs>
            </div>
            <Separator/>
        </section>
    );
}