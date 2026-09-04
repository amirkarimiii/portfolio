import {Banner} from "@/features/main/Banner";
import {InfoSection} from "@/features/main/infoSection";
import {ProjectsSection} from "@/features/main/ProjectsSection";
import {ContactSection} from "@/features/main/ContactSection";
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
