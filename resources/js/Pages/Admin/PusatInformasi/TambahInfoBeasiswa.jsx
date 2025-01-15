import React, { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import NavbarAdmin from "@/Components/NavbarAdmin";
import { FormLombaBeasiswa } from "@/Components/PusatInformasi/TambahInformasi/FormLombaBeasiswa";
import { usePage } from "@inertiajs/react";

const TambahInfoBeasiswa = ({ user }) => {
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
        <div className="min-h-screen flex flex-col items-center bg-gray-100">
            <Toaster position="top-right" reverseOrder={false} />
            <NavbarAdmin user={user} />
            <div className="flex w-full ml-[256px] mt-8">
                <main className=" flex grow   items-center justify-center py-14 px-4 ">
                    <div className="bg-white shadow-md rounded-lg p-8 max-w-[1200px] w-[70%] mx-auto">
                        <h1 className="text-center text-2xl font-bold mb-6">
                            Tambah Informasi Beasiswa
                        </h1>
                        <FormLombaBeasiswa type="beasiswa" />
                    </div>
                </main>
            </div>
        </div>
    );
};
export default TambahInfoBeasiswa;
