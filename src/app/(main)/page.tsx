import { Suspense } from "react";
import { Banner } from "@/features/main/components/sections/banner-section/Banner";
import { BannerSkeleton } from "@/features/main/components/sections/banner-section/BannerSkeleton";
import { InfoSection } from "@/features/main/components/sections/info-section/InfoSection";
import { InfoSkeleton } from "@/features/main/components/sections/info-section/InfoSkeleton";
import { ProjectsSection } from "@/features/main/components/sections/project-section/ProjectsSection";
import { ProjectsSkeleton } from "@/features/main/components/sections/project-section/ProjectsSkeleton";
import { ContactSection } from "@/features/main/components/sections/contect-section/ContactSection";
import { ContactSkeleton } from "@/features/main/components/sections/contect-section/ContactSkeleton";
import { StackSection } from "@/features/stack-mapping/components/StackSection";
import { StackSkeleton } from "@/features/stack-mapping/components/StackSkeleton";

export default function Home() {
    return (
        <>
            <Suspense fallback={<BannerSkeleton />}>
                <Banner />
            </Suspense>

            <Suspense fallback={<StackSkeleton />}>
                <StackSection />
            </Suspense>

            <Suspense fallback={<InfoSkeleton />}>
                <InfoSection />
            </Suspense>

            <Suspense fallback={<ProjectsSkeleton />}>
                <ProjectsSection />
            </Suspense>

            <Suspense fallback={<ContactSkeleton />}>
                <ContactSection />
            </Suspense>
        </>
    );
}