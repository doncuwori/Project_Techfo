import React from "react";
import Navbar from "@/Components/Navbar";
import RiwayatKegiatan from "@/Components/Profile/RiwayatKegiatan";
import RiwayatLomba from "@/Components/Profile/RiwayatLomba";
import CatatanKeaktifan from "@/Components/Profile/CatatanKeaktifan";
import ProfileSection from "@/Components/Profile/ProfileSection";
import Footer from "@/Components/Footer";
import ScrollUpButton from "@/Components/ScrollUpButton";
import { Toaster } from "react-hot-toast";
import RiwayatPrestasiLomba from "@/Components/Profile/RiwayatPrestasiLomba";
import RiwayatBeasiswa from "@/Components/Profile/RiwayatBeasiswa";
import RiwayatPenerimaBeasiswa from "@/Components/Profile/RiwayatPenerimaBeasiswa";

const Profile = ({
    partisipasiLomba,
    prestasiLomba,
    pendaftarBeasiswa,
    penerimaBeasiswa,
}) => {
    return (
        <div>
            <Navbar />
            <ProfileSection />
            <CatatanKeaktifan
                partisipasiLomba={partisipasiLomba}
                prestasiLomba={prestasiLomba}
                pendaftarBeasiswa={pendaftarBeasiswa}
                penerimaBeasiswa={penerimaBeasiswa}
            />
            <RiwayatLomba data={partisipasiLomba} />
            <RiwayatPrestasiLomba data={prestasiLomba} />
            <RiwayatBeasiswa data={pendaftarBeasiswa} />
            <RiwayatPenerimaBeasiswa data={penerimaBeasiswa} />
            <RiwayatKegiatan />
            <Footer />
            <ScrollUpButton />
            <Toaster position="top-right" />
        </div>
    );
};

export default Profile;
