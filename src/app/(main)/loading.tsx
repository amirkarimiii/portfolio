import { BannerSkeleton } from "@/features/main/components/sections/banner-section/BannerSkeleton";
import { StackSkeleton } from "@/features/stack-mapping/components/StackSkeleton";

export default function MainLoading() {
    return (
        <>
            <BannerSkeleton />
            <StackSkeleton />
        </>
    );
}