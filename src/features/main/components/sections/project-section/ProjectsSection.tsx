import {InfoIcon} from "lucide-react";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/shared/components/ui/tabs";
import {Card, CardContent, CardHeader, CardTitle} from "@/shared/components/ui/card";
import {Alert, AlertDescription, AlertTitle} from "@/shared/components/ui/alert";
import {Separator} from "@/shared/components/ui/separator";
import {ProjectService} from "@/features/main/services/projectService";
import {ProjectsTabHeader} from "@/features/main/components/sections/project-section/ProjectsTabHeader";
import {ProjectTabContent} from "@/features/main/components/sections/project-section/ProjectTabContent";

export const ProjectsSection = async () => {

    const projects = await ProjectService.getProjects();

    const firstProject = projects[0];

    return (
        <section className="max-w-4xl mx-auto">
            <div className="py-2 px-5 mb-10">
                <h2 className="font-bold text-xl my-5 lg:mt-5 lg:text-3xl">💻 My Projects</h2>
                <Tabs defaultValue={firstProject.name}>
                    <TabsList className="flex flex-wrap h-max">
                        {projects.map(project => (
                            <ProjectsTabHeader icon={project.icon} name={project.name} key={project.name}/>
                        ))}
                        <TabsTrigger value="more">➕ More...</TabsTrigger>
                    </TabsList>
                    {
                        projects.map(project => (
                            <ProjectTabContent project={project} key={project.name}/>
                        ))
                    }
                    <TabsContent value="more">
                        <Card className="w-full">
                            <CardHeader>
                                <CardTitle>
                                    <h3 className="flex gap-2">➕ More...</h3>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Alert variant="default">
                                    <InfoIcon/>
                                    <AlertTitle className="lg:text-base">stay tuned...</AlertTitle>
                                    <AlertDescription className="lg:text-base">
                                        I am currently focusing on completing the existing projects. New projects will
                                        be added soon to better reflect the range of my skills and areas of
                                        work.<br/><br/>
                                        A new section covering my open-source contributions — such as pull requests, bug
                                        fixes, feature implementations, and documentation improvements in public
                                        repositories — along with other relevant activities will also be added
                                        shortly.<br/><br/>
                                        Updates will be published progressively.<br/><br/>
                                        Feedback and suggestions for improvement are welcome.
                                    </AlertDescription>
                                </Alert>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
            <Separator/>
        </section>
    );
}