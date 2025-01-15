import React, { useEffect } from "react";
import { Link, usePage } from "@inertiajs/react";
import NavbarAdmin from "@/Components/NavbarAdmin";
import TabelPusatInformasi from "@/Components/PusatInformasi/TabelPusatInformasi";
import toast, { Toaster } from "react-hot-toast";

const PusatBeasiswa = ({ user, data }) => {

    const { flash } = usePage().props;

    useEffect(() => {
        toast.dismiss();
        if (flash.success) {
            toast.success(flash.success);
        }else if (flash.error) {
            toast.error(flash.error);
        }
    }, [flash])

    return (
        <div>
            <Toaster position="top-right" reverseOrder={false} />
            <NavbarAdmin user={user} />
            <main className="pl-72 w-full z-0">
                <div className="container px-4 py-8 w-full">
                <h1 class="text-3xl font-bold text-black mt-16 mb-4">
                        Pusat Informasi Beasiswa
                    </h1>
                    <div className="bg-white p-6 rounded shadow-lg">
                        {/* Header dan Search */}
                        <div className="flex justify-between items-center mb-4">
                            <div></div>
                            <div className="flex space-x-2">
                                <Link
                                    href={route("tambahInfoBeasiswa")}
                                    className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 transition"
                                >
                                    + Tambah Informasi Beasiswa
                                </Link>
                            </div>
                        </div>

                        {/* Tabel */}
                        <TabelPusatInformasi title={'beasiswa'} data={data} />

                        {/* Pagination */}
                        <div className="flex justify-between items-center mt-4 text-gray-600">
                            <div>
                                Rows per page
                                <select className="border border-gray-300 rounded ml-2 focus:ring-2 focus:ring-orange-500">
                                    <option>10</option>
                                    <option>20</option>
                                    <option>30</option>
                                </select>
                            </div>
                            <div>Total 1 - 10 of 130</div>
                            <div className="flex items-center space-x-2">
                                <button className="text-gray-500 hover:text-gray-700 transition">
                                    Prev
                                </button>
                                <button className="bg-orange-500 text-white py-1 px-3 rounded hover:bg-orange-600 transition">
                                    1
                                </button>
                                <button className="text-gray-500 hover:text-gray-700 transition">
                                    2
                                </button>
                                <button className="text-gray-500 hover:text-gray-700 transition">
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default PusatBeasiswa;