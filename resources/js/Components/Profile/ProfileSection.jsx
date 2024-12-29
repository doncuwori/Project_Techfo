import { usePage } from "@inertiajs/react";
import React from "react";

const ProfileSection = () => {
    const { user } = usePage().props.auth;
    const { mahasiswa } = usePage().props.auth;

    return (
        <div className="flex flex-col items-center md:items-start gap-6 py-8 px-4 md:px-8 w-full">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-8 w-full">
                <img
                    className="w-32 h-32 md:w-44 md:h-44 rounded-full"
                    src="/img/profiledefault.png"
                    alt="Profile"
                />
                <div className="flex flex-row flex-grow gap-4 bg-white border border-[#d1d3d8] rounded-lg w-full">
                    {/* Labels Column */}
                    <div className="min-w-[180px] bg-orange-100 rounded-tl-lg rounded-bl-lg px-4 py-3">
                        {["NIM", "Nama", "Program Studi", "Angkatan"].map(
                            (label, index) => (
                                <div key={index} className="py-2">
                                    <div className="text-[#2d3036] text-sm font-semibold">
                                        {label}
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                    {/* Values Column */}
                    <div className="flex-grow px-4 py-3">
                        {[
                            user.username,
                            user.name,
                            mahasiswa.prodi.nama_prodi,
                            mahasiswa.angkatan,
                        ].map((value, index) => (
                            <div key={index} className="py-2">
                                <div className="text-[#2d3036] text-sm font-normal">
                                    {value || "-"}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileSection;
