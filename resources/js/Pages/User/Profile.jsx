import React from "react";
import { Toaster } from "react-hot-toast";
import Navbar from "@/Components/Navbar";
import RiwayatLomba from "@/Components/Profile/RiwayatLomba";
import CatatanKeaktifan from "@/Components/Profile/CatatanKeaktifan";
import ProfileSection from "@/Components/Profile/ProfileSection";
import RiwayatPrestasiLomba from "@/Components/Profile/RiwayatPrestasiLomba";
import RiwayatBeasiswa from "@/Components/Profile/RiwayatBeasiswa";
import RiwayatPenerimaBeasiswa from "@/Components/Profile/RiwayatPenerimaBeasiswa";
import RiwayatAbdimas from "@/Components/Profile/RiwayatAbdimas";
import RiwayatPenelitian from "@/Components/Profile/RiwayatPenelitian";
import Footer from "@/Components/Footer";
import ScrollUpButton from "@/Components/ScrollUpButton";

const Profile = ({
    competitionRegistrantsCount,
    competitionAchievementsCount,
    scholarshipRegistrantsCount,
    scholarshipRecipientsCount,
    abdimasRegistrantsCount,
    abdimasRecipientsCount,
    researchRegistrantsCount,
    researchRecipientsCount,
    partisipasiLomba,
    prestasiLomba,
    pendaftarBeasiswa,
    penerimaBeasiswa,
    pendaftarAbdimas,
    pendaftarPenelitian,
    diterimaAbdimas,
    diterimaPenelitian,
    abdimas,
    penelitian,
}) => {
    console.log(competitionRegistrantsCount);
    return (
        <div>
            <Navbar />
            <ProfileSection />
            <CatatanKeaktifan
                competitionCount={`${competitionAchievementsCount}/${partisipasiLomba.length}`}
                scholarshipCount={`${scholarshipRecipientsCount}/${pendaftarBeasiswa.length}`}
                abdimasCount={`${diterimaAbdimas.length}/${pendaftarAbdimas.length}`}
                researchCount={`${diterimaPenelitian.length}/${pendaftarPenelitian.length}`}
            />
            <RiwayatLomba data={partisipasiLomba} />
            <RiwayatPrestasiLomba data={prestasiLomba} />
            <RiwayatBeasiswa data={pendaftarBeasiswa} />
            <RiwayatPenerimaBeasiswa data={penerimaBeasiswa} />
            <RiwayatAbdimas data={abdimas} />
            <RiwayatPenelitian data={penelitian} />
            <Footer />
            <ScrollUpButton />
            <Toaster position="top-right" />
        </div>
    );
};

export default Profile;
