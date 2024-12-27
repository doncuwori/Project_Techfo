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

const Profile = ({partisipasiLomba, prestasiLomba}) => {
    return (
        <div>
            <Navbar />
            <ProfileSection />
            <CatatanKeaktifan partisipasiLomba={partisipasiLomba} prestasiLomba={prestasiLomba}/>
            <RiwayatLomba data={partisipasiLomba}/>
            <RiwayatPrestasiLomba data={prestasiLomba}/>
            <RiwayatKegiatan />
            <Footer />
            <ScrollUpButton />
            <Toaster position="top-right" />
        </div>
    );
};

export default Profile;
