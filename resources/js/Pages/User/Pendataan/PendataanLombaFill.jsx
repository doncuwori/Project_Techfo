import React, { useEffect } from "react";
import { usePage } from "@inertiajs/react";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "@/Components/Navbar";
import { BiodataUser } from "@/Components/BiodataUser";
import Footer from "@/Components/Footer";
import ScrollUpButton from "@/Components/ScrollUpButton";
import { TabPrestasiLombaFill } from "@/Components/Pendataan/PendataanLomba/TabPrestasiLombaFill";

const PendataanLombaFill = ({ data }) => {
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
                        Pendataan Prestasi Lomba
                    </h1>
                    <BiodataUser />
                    <TabPrestasiLombaFill dataFill={data} />
                </div>
            </main>
            <Footer />
            <Toaster position="top-right" reverseOrder={false} />
            <ScrollUpButton />
        </div>
    );
};

export default PendataanLombaFill;
