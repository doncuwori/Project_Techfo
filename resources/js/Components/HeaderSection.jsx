import React from "react";

// HeaderSection component that displays the header for different pages
const HeaderSection = ({ pageType }) => {
    // Function to determine the page title based on the pageType prop
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
                    {pageTitle()}{" "} {/* Display the determined page title */}
                </span>
            </div>
        </div>
    );
};

export default HeaderSection;
