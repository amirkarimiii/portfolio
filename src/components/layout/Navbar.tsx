import {ThemeButton} from "@/components/ui/buttons/ThemeButton";

export const Navbar = () => {
    return (
        <nav className="h-12">
            <section className="max-w-[1240px] mx-auto h-full py-2 px-5">
                <ThemeButton/>
            </section>
        </nav>
    );
};