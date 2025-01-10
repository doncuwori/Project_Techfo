import React from "react";

const HeaderSection = ({ pageType }) => {
    const pageTitle = () => {
        switch (pageType) {
            case "beasiswa":
                return "Beasiswa";
            case "abdimas":
                return "Pengabdian Masyarakat";
            case "penelitian":
                return "Penelitian";
            default:
                return "Lomba";
        }
    };

    return (
        <div className="w-full px-4 md:px-10 py-6 mt-20 relative z-10">
            <div className="text-center mb-6">
                <span className="text-black text-4xl font-medium leading-10">
                    Eksplor Informasi{" "}
                </span>
                <span className="text-[#fe632e] text-4xl font-medium leading-10">
                    {pageTitle()}{" "}
                </span>
            </div>
        </div>
    );
};

export default HeaderSection;
