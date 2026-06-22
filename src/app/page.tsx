import {Banner} from "../components/ui/sections/main/banner/Banner";
import {InfoSection} from "../components/ui/sections/main/information/infoSection";
import {ProjectsSection} from "../components/ui/sections/main/projects/ProjectsSection";
import {ContactSection} from "../components/ui/sections/main/contact/ContactSection";

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
