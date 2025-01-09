import React from "react";
import { Toaster } from "react-hot-toast";
import Navbar from "@/Components/Navbar";
import { BiodataUser } from "@/components/BiodataUser";
import Footer from "@/Components/Footer";
import ScrollUpButton from "@/Components/ScrollUpButton";
import { TabLolosBeasiswaFill } from "@/Components/Pendataan/PendataanBeasiswa/TabLolosBeasiswaFill";

const PendataanBeasiswa = ({ data }) => {
    
    return (
        <div className="min-h-screen flex flex-col items-center">
            <Navbar />
            <main className="container mx-auto flex-grow py-10 px-6">
                <div className="bg-white shadow-md rounded-lg p-8 max-w-[1200px] mx-auto">
                    <h1 className="text-center text-2xl font-bold mb-6">
                        Pendataan Mahasiswa Penerima Beasiswa
                    </h1>
                    <BiodataUser />
                    <TabLolosBeasiswaFill dataFill={data}/>
                </div>
            </main>
            <Footer />
            <Toaster position="top-right" />
            <ScrollUpButton />
        </div>
    );
};

export default PendataanBeasiswa;
