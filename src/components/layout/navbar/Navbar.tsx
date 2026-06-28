import React from "react";


type NavbarProps = {
    action: React.ReactNode;
};

export const Navbar = ({action} : NavbarProps) => {
    return (
        <nav className="h-12">
            <section className="max-w-4xl mx-auto h-full py-2 px-5 flex justify-between">
                {action}
            </section>
        </nav>
    );
};