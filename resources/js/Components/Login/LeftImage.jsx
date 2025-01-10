import React from "react";

const LeftImage = () => {
    return (
        <div className="relative w-full h-full md:w-1/2">
            {/* Background Image */}
            <img
                className="w-full h-full object-cover"
                src="/img/fik.png"
                alt="Background"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-[#2d3036]/30" />

            {/* Content */}
            <div className="absolute top-0 left-0 p-8 md:p-12 flex items-center gap-4 z-10">
                <img
                    className="w-12 h-12 md:w-16 md:h-16"
                    src="/img/upn.png"
                    alt="UPN Logo"
                />
                <div className="text-white text-lg md:text-2xl font-bold">
                    FAKULTAS ILMU KOMPUTER
                    <br />
                    UPN VETERAN JAKARTA
                </div>
            </div>
        </div>
    );
};

export default LeftImage;
