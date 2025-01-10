import React from "react";
import Navbar from "@/Components/Navbar";
import MainContent from "@/Components/DetailLomba/MainContent";

const DetailLomba = ({ data }) => {
    return (
        <div className="bg-gray-50">
            <Navbar />
            <div className="absolute inset-0 z-0 flex justify-center mt-16">
                <img
                    src="/img/bgdetail1.png"
                    alt="Deskripsi gambar"
                    className="w-full max-h-[300px] object-cover rounded-md"
                />
            </div>
            <div className="absolute inset-x-0 bottom-0 z-0 flex justify-center">
                <img
                    src="/img/bgdetail2.png"
                    alt="Deskripsi gambar"
                    className="w-full max-h-[600px] object-cover rounded-md"
                />
            </div>
            <div className="relative z-0 mt-6 px-4">
                <MainContent data={data} />
            </div>
        </div>
    );
};

export default DetailLomba;
