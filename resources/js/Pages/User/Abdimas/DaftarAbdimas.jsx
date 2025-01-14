import React, { useEffect } from "react";
import { usePage } from "@inertiajs/react";
import { BiodataUser } from "@/Components/BiodataUser";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import FormDaftarAbdimas from "@/Components/Abdimas/FormDaftarAbdimas";
import toast, { Toaster } from "react-hot-toast";

const DaftarAbdimas = ({ information }) => {
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
        <div className="min-h-screen bg-gray-100 flex flex-col items-center">
            <Toaster position="top-right" reverseOrder={false} />
            <Navbar />
            <main className="container mx-auto px-4 py-8">
                <div className="bg-white p-8 rounded-lg shadow-md max-w-[1200px] mx-auto">
                    <h1 className="text-2xl font-semibold mb-6 text-center">
                        Pendaftaran Pengabdian Masyarakat
                    </h1>
                    <BiodataUser />
                    <FormDaftarAbdimas information={information} />
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default DaftarAbdimas;
