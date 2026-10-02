import {Project} from "@/features/main/schema/projectSchema";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/shared/components/ui/card";
import Image from "next/image";
import {Badge} from "@/shared/components/ui/badge";
import ProjectPhoto from "@/features/main/components/sections/project-section/ProjectPhoto";
import {Button} from "@/shared/components/ui/button";
import Link from "next/link";
import {TabsContent} from "@/shared/components/ui/tabs";

type ProjectsTabHeaderProps = {

    project: Project

};

export function ProjectTabContent({project}: ProjectsTabHeaderProps) {
    return (
        <TabsContent value={project.name}>
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>
                        <h3 className="flex gap-2">
                                        <span className="relative w-5 h-5 inline-block my-auto">
                                            <Image src={project.icon}
                                                   alt={`${project.name} icon`}
                                                   fill
                                            />
                                        </span>
                                         <span className="text-lg">
                                            {project.name}
                                        </span>
                            <Badge className="my-auto h-max text-2xs">{project.version}</Badge>
                        </h3>
                    </CardTitle>
                    <CardDescription>
                        {project.description}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-3 md:flex-row">
                        <div className="w-full sm:min-w-xs max-w-sm mx-auto">
                            <ProjectPhoto images={project.media}/>
                        </div>
                        <div className="md:w-md">
                            <div className="mb-5">
                                <div className="flex flex-row gap-1 py-1 px-2 rounded-lg bg-muted text-muted-foreground shrink-0">
                                    <span className="font-medium text-sm capitalize mb-0.5">status: {project.status.type}</span>
                                </div>
                                <p className="ml-1 mt-1 text-xs text-gray-600">
                                    {project.status.description}
                                </p>
                            </div>
                            <div className="mb-5">
                                <div className="flex flex-row gap-1 py-1 px-2 rounded-lg bg-muted text-muted-foreground shrink-0">
                                    <span className="font-medium text-sm capitalize mb-0.5">authorship</span>
                                </div>
                                <p className="ml-1 mt-1 text-xs text-gray-600">
                                    {project.authorship}
                                </p>
                            </div>
                        </div>
                    </div>
                    <Button asChild className="block w-full max-w-md mt-5 mx-auto text-center">
                        <Link href={project.repository} target="_blank"
                              rel="noopener noreferrer">
                            More on Github
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        </TabsContent>
    );
}