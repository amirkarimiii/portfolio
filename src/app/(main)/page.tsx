import {Banner} from "@/features/main/Banner";
import {InfoSection} from "@/features/main/infoSection";
import {ProjectsSection} from "@/features/main/ProjectsSection";
import {ContactSection} from "@/features/main/ContactSection";


export default function Home() {
    return (
        <>
            <Banner/>
            <InfoSection/>
            <ProjectsSection/>
            <ContactSection/>
        </>
    );
}
