import React from 'react';

const HeaderSection = () => {
    return (
        <div className="relative">
            {/* Background Image Section */}
            <div className="absolute inset-0 z-0">
                <img
                    src="img/bgdashboard1.png"
                    alt="Deskripsi gambar"
                    className="w-full h-[360px]  rounded-md"
                />
            </div>

            {/* Text Section */}
            <div className="relative w-full px-6 md:px-12 pt-28 pb-6 text-center">
                <h1 className="text-black text-4xl font-medium leading-tight mb-6">
                    Eksplor Informasi{' '}
                    <span className="text-[#fe632e]">Lomba, Beasiswa, Pengabdian Masyarakat, </span>
                    <span className="text-black">dan </span>
                    <br />
                    <span className="text-[#fe632e]">Penelitian</span>
                    <span className="text-black"> Sekarang!</span>
                </h1>
            </div>
        </div>
    );
};

export default HeaderSection;
