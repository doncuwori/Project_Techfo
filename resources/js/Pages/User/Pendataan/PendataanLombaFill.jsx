import React, { useState } from "react";
import Navbar from "@/Components/Navbar";
import { BiodataUser } from "@/components/BiodataUser";
import { TabPrestasiLomba } from "@/Components/Pendataan/PendataanLomba/TabPrestasiLomba";
import { TabPartisipasiLomba } from "@/Components/Pendataan/PendataanLomba/TabPartisipasiLomba";
import Footer from "@/Components/Footer";
import ScrollUpButton from "@/Components/ScrollUpButton";
import { Toaster } from "react-hot-toast";
import { TabPrestasiLombaFill } from "@/Components/Pendataan/PendataanLomba/TabPrestasiLombaFill";

const PendataanLombaFill = ({ data }) => {

    return (
        <div className="min-h-screen flex flex-col items-center">
            <Navbar />
            <main className="container mx-auto flex-grow py-10 px-6">
                <div className="bg-white shadow-md rounded-lg p-8 max-w-[1200px] mx-auto">
                    <h1 className="text-center text-2xl font-bold mb-6">
                        Pendataan Prestasi Lomba
                    </h1>
                    <BiodataUser />
                    <TabPrestasiLombaFill dataFill={data}/>
                </div>
            </main>
            <Footer />
            <Toaster position="top-right" />
            <ScrollUpButton />
        </div>
    );
};

export default PendataanLombaFill;
