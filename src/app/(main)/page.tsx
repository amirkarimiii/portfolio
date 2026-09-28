import {Banner} from "../../features/main/components/sections/banner-section/Banner";
import {InfoSection} from "../../features/main/components/sections/info-section/InfoSection";
import {ProjectsSection} from "../../features/main/components/sections/project-section/ProjectsSection";
import {ContactSection} from "../../features/main/components/sections/contect-section/ContactSection";
import {StackSection} from "@/features/stack-mapping/components/StackSection";


export default function Home() {
    return (
        <>
            <Banner/>
            <StackSection/>
            <InfoSection/>
            <ProjectsSection/>
            <ContactSection/>
        </>
    );
}
