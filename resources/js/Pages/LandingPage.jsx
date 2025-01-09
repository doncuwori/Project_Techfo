import React from "react";
import Header from "@/Components/LandingPage/Header";
import HeaderSection from "@/Components/Dashboard/HeaderSection";
import LaporanKeaktifan from "@/Components/LandingPage/LaporanKeaktifan";
import Footer from "@/Components/Footer";
import ScrollUpButton from "@/Components/ScrollUpButton";

const LandingPage = ({
    competitionRegistrantsCount,
    competitionAchievementsCount,
    scholarshipRegistrantsCount,
    scholarshipRecipientsCount,
    abdimasRegistrantsCount,
    abdimasRecipientsCount,
    researchRegistrantsCount,
    researchRecipientsCount,
    rekapJuara,
    rekapLomba,
    rekapBeasiswa,
    rekapAbdimas,
    rekapResearch,
    rekapAbdimasLolos,
    rekapResearchLolos,
}) => {
    return (
        <div>
            <Header />
            <HeaderSection />
            <div className="absolute inset-x-0 mt-32 z-0 flex justify-center">
                <img
                    src="img/bglandingpage.png"
                    alt="Background Image"
                    className="w-full max-h-[1500px] rounded-md"
                />
            </div>
            <LaporanKeaktifan
                competitionCount={`${competitionAchievementsCount}/${competitionRegistrantsCount} `}
                scholarshipCount={`${scholarshipRecipientsCount}/${scholarshipRegistrantsCount}`}
                rekapJuara={rekapJuara}
                rekapLomba={rekapLomba}
                rekapBeasiswa={rekapBeasiswa}
                rekapAbdimas={rekapAbdimas}
                rekapResearch={rekapResearch}
                rekapAbdimasLolos={rekapAbdimasLolos}
                rekapResearchLolos={rekapResearchLolos}
                abdimasCount={`${abdimasRecipientsCount}/${abdimasRegistrantsCount}`}
                researchCount={`${researchRecipientsCount}/${researchRegistrantsCount}`}
            />
            <Footer />
            <ScrollUpButton />
        </div>
    );
};

export default LandingPage;
