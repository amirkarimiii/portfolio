import {Banner} from "@/components/ui/sections/banner/Banner";
import {InfoSection} from "@/components/ui/sections/information/infoSection";
import {ProjectsSection} from "@/components/ui/sections/projects/ProjectsSection";
import {ContactSection} from "@/components/ui/sections/contact/ContactSection";

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
