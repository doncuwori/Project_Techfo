import { usePage } from "@inertiajs/react";
import React from "react";

const ProfileSection = () => {
    const { user } = usePage().props.auth;
    const { mahasiswa } = usePage().props.auth;

    return (
        <div className="flex flex-col items-start gap-6 py-8 px-8 w-full">
            <div className="flex items-center gap-8 w-full">
                <img
                    className="w-44 h-44 rounded-full"
                    src="/img/profile.png"
                    alt="Profile"
                />
                <div className="flex flex-grow gap-6 bg-white border border-[#d1d3d8] rounded-lg">
                    {/* Labels Column */}
                    <div className="min-w-[180px] bg-orange-100 rounded-tl-lg rounded-bl-lg px-4 py-3">
                        {["NIM?Username", "Nama", "Program Studi", "Angkatan"].map(
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
                        {[user.username, user.name, mahasiswa.prodi.nama_prodi, mahasiswa.angkatan].map(
                            (value, index) => (
                                <div key={index} className="py-2">
                                    <div className="text-[#2d3036] text-sm font-normal">
                                        {value || "-"}
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileSection;
