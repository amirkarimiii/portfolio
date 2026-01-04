import {Banner} from "@/components/ui/sections/banner/Banner";
import {InfoSection} from "@/components/ui/sections/information/infoSection";
import {ProjectsSection} from "@/components/ui/sections/projects/ProjectsSection";

export default function Home() {
    return (
        <>
            <Banner/>
            <InfoSection/>
            <ProjectsSection/>
        </>
    );
}
