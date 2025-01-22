import React, { useEffect } from "react";
import { Link, usePage } from "@inertiajs/react";
import NavbarAdmin from "@/Components/NavbarAdmin";
import TabelPusatInformasi from "@/Components/PusatInformasi/TabelPusatInformasi";
import toast, { Toaster } from "react-hot-toast";

const PusatLomba = ({ user, data }) => {
    const { flash } = usePage().props;

    useEffect(() => {
        toast.dismiss();
        if (flash.success) {
            toast.success(flash.success);
        } else if (flash.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    return (
        <div>
            <Toaster position="top-right" reverseOrder={false} />
            <NavbarAdmin user={user} />
            <main className="pl-72 w-full z-0">
                <div className="container px-4 py-8 w-full">
                    <h1 class="text-3xl font-bold text-black mt-16 mb-4">
                        Pusat Informasi Lomba
                    </h1>
                    <div className="bg-white p-6 rounded shadow-lg">
                        <div className="flex justify-between items-center mb-4">
                            <div></div>
                            <div className="flex space-x-2">
                                <Link
                                    href={route("tambahInfoLomba")}
                                    className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 transition"
                                >
                                    + Tambah Informasi Lomba
                                </Link>
                            </div>
                        </div>

                        <TabelPusatInformasi title={"lomba"} data={data} />

                    </div>
                </div>
            </main>
        </div>
    );
};

export default PusatLomba;
