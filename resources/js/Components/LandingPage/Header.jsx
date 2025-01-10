import React from "react";
import { Link } from "@inertiajs/react";
import { UserRound } from "lucide-react";
import ApplicationLogo from "@/Components/ApplicationLogo";

const Navbar = () => {
    return (
        <header className="flex items-center justify-between w-full h-16 px-4 bg-white shadow-md md:px-10">
            {/* Logo and Brand */}
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 md:gap-4">
                    <div className="flex items-center justify-center w-8 h-8 overflow-hidden rounded-full md:w-10 md:h-10">
                        <ApplicationLogo className="object-cover w-full h-full" />
                    </div>

                    <Link href="#" className="flex items-center">
                        <span className="text-lg font-semibold text-gray-900 md:text-2xl">
                            Tech
                        </span>
                        <span className="text-lg font-semibold text-[#fe632e] md:text-2xl">
                            fo
                        </span>
                    </Link>
                </div>
            </div>

            {/* Login Link */}
            <Link
                href={route("login")}
                className="flex items-center gap-2 text-[#2d3036] group hover:text-[#fe632e] transition-all duration-200 transform group-hover:scale-105"
            >
                <UserRound className="text-2xl group-hover:scale-105" />
                <span className="text-xl font-normal leading-loose group-hover:scale-105">
                    Login
                </span>
            </Link>
        </header>
    );
};

export default Navbar;
