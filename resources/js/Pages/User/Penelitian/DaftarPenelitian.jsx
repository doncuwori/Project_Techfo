import React from "react";
import { BiodataUser } from "@/Components/BiodataUser";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import FormDaftarPenelitian from "@/Components/Penelitian/FormDaftarPenelitian";

const DaftarPenelitian = ({ information }) => {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center">
            <Navbar />
            <main className="container mx-auto px-4 py-8">
                <div className="bg-white p-8 rounded-lg shadow-md max-w-[1200px] mx-auto">
                    <h1 className="text-2xl font-semibold mb-6 text-center">
                        Pendaftaran Penelitian
                    </h1>
                    <BiodataUser />
                    <FormDaftarPenelitian information={information} />
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default DaftarPenelitian;
