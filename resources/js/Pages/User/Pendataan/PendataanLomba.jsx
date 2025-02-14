import React, { useState, useEffect } from "react";
import { usePage } from "@inertiajs/react";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "@/Components/Navbar";
import { BiodataUser } from "@/Components/BiodataUser";
import { TabPrestasiLomba } from "@/Components/Pendataan/PendataanLomba/TabPrestasiLomba";
import { TabPartisipasiLomba } from "@/Components/Pendataan/PendataanLomba/TabPartisipasiLomba";
import Footer from "@/Components/Footer";
import ScrollUpButton from "@/Components/ScrollUpButton";

const PendataanLomba = ({ mahasiswa, dosen, country }) => {
    const [tabValue, settabValue] = useState("Partisipasi");

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
        <div className="min-h-screen flex flex-col items-center">
            <Navbar />
            <main className="container mx-auto flex-grow py-10 px-6">
                <div className="bg-white shadow-md rounded-lg p-8 max-w-[1200px] mx-auto">
                    <h1 className="text-center text-2xl font-bold mb-6">
                        Pendataan {tabValue} Lomba
                    </h1>
                    <div className="flex justify-center pb-6">
                        <button
                            onClick={() => {
                                settabValue("Partisipasi");
                            }}
                            className={`${
                                tabValue === "Partisipasi"
                                    ? "bg-green-500 text-white"
                                    : "bg-gray-200 text-gray-700"
                            } py-2 px-4 w-[140px] rounded-l-lg duration-300`}
                        >
                            Partisipasi
                        </button>
                        <button
                            onClick={() => {
                                settabValue("Prestasi");
                            }}
                            className={`${
                                tabValue === "Prestasi"
                                    ? "bg-green-500 text-white"
                                    : "bg-gray-200 text-gray-700"
                            } py-2 px-4 w-[140px] rounded-r-lg duration-300`}
                        >
                            Prestasi
                        </button>
                    </div>
                    <BiodataUser />
                    {tabValue === "Partisipasi" ? (
                        <TabPartisipasiLomba
                            mahasiswa={mahasiswa}
                            dosen={dosen}
                            country={country}
                        />
                    ) : (
                        <TabPrestasiLomba
                            mahasiswa={mahasiswa}
                            dosen={dosen}
                            country={country}
                        />
                    )}
                </div>
            </main>
            <Footer />
            <Toaster position="top-right" reverseOrder={false} />
            <ScrollUpButton />
        </div>
    );
};

export default PendataanLomba;
