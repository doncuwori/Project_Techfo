import { usePage } from "@inertiajs/react";
import React from "react";

export const BiodataUser = () => {
    const user = usePage().props.auth.user;
    const mahasiswa = usePage().props.auth.mahasiswa;
    return (
        <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">Biodata Mahasiswa</h2>
            <div className="grow shrink basis-0 h-[165px] bg-white rounded-lg border border-[#d1d3d8] justify-start items-center flex">
                <div className="w-full md:w-[179px] self-stretch px-4 bg-orange-50 rounded-t-lg md:rounded-tl-lg md:rounded-bl-lg flex flex-col justify-start items-start">
                    <div className="self-stretch grow shrink basis-0 py-3 justify-start items-center gap-2 flex">
                        <div className="text-[#2d3036] text-sm font-semibold leading-tight">
                            NIM
                        </div>
                    </div>
                    <div className="self-stretch grow shrink basis-0 py-3 justify-start items-center gap-2 flex">
                        <div className="text-[#2d3036] text-sm font-semibold leading-tight">
                            Nama
                        </div>
                    </div>
                    <div className="self-stretch grow shrink basis-0 py-3 justify-start items-center gap-2 flex">
                        <div className="text-[#2d3036] text-sm font-semibold leading-tight">
                            Program Studi
                        </div>
                    </div>
                    <div className="self-stretch grow shrink basis-0 py-3 justify-start items-center gap-2 flex">
                        <div className="text-[#2d3036] text-sm font-semibold leading-tight">
                            Angkatan
                        </div>
                    </div>
                </div>

                <div className="w-[500px] self-stretch px-4 rounded-md flex-col justify-start items-start inline-flex">
                    <div className="self-stretch grow shrink basis-0 py-3 justify-start items-center gap-2 inline-flex">
                        <div className="text-[#2d3036] text-sm font-normal leading-tight">
                            {user.username}
                        </div>
                    </div>
                    <div className="self-stretch grow shrink basis-0 py-3 justify-start items-center gap-2 inline-flex">
                        <div className="text-[#2d3036] text-sm font-normal leading-tight">
                            {user.name}
                        </div>
                    </div>
                    <div className="self-stretch grow shrink basis-0 py-3 justify-start items-center gap-2 inline-flex">
                        <div className="text-[#2d3036] text-sm font-normal leading-tight">
                            {mahasiswa.prodi.nama_prodi}
                        </div>
                    </div>
                    <div className="self-stretch grow shrink basis-0 py-3 justify-start items-center gap-2 inline-flex">
                        <div className="text-[#2d3036] text-sm font-normal leading-tight">
                            {mahasiswa.angkatan}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
