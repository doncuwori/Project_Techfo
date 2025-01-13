import React from "react";
import { House } from "lucide-react";
import { Link } from "@inertiajs/react";
import NavbarAdmin from "@/Components/NavbarAdmin";
import LaporanKeaktifan from "@/Components/LandingPage/LaporanKeaktifan";

const DashboardAdmin = ({
    competitionRegistrantsCount,
    competitionAchievementsCount,
    scholarshipRegistrantsCount,
    scholarshipRecipientsCount,
    abdimasRegistrantsCount,
    abdimasRecipientsCount,
    researchRegistrantsCount,
    researchRecipientsCount,
    user,
    rekapJuara,
    rekapLomba,
    rekapBeasiswa,
    rekapAbdimas,
    rekapResearch,
    rekapAbdimasLolos,
    rekapResearchLolos,
    arrayFundingAbdimas,
    arrayFundingPenelitian,
}) => {
    return (
        <div>
            <NavbarAdmin user={user} />
            <main className="pl-72 w-full z-0">
                <div className="container px-4 py-8 w-full">
                    <div className="min-h-20 px-4 mt-14 flex flex-col justify-start items-start gap-3">
                        <div className="flex justify-center items-center">
                            <h1 className="text-[#2d3036] text-2xl font-semibold font-inter leading-loose">
                                Dashboard
                            </h1>
                        </div>
                        <div className="w-full rounded-md flex justify-start items-center gap-2">
                            <House className="w-5 h-5" />
                            <div className="flex justify-center items-center">
                                <Link
                                    href={route("dashboardAdmin")}
                                    className={`${
                                        route().current("dashboardAdmin")
                                            ? "text-[#fe632e] hover:font-bold rounded-lg px-1 font-bold"
                                            : "text-[#2d3036] hover:text-orange-500 font-bold px-3 py-1"
                                    } text-sm md:text-base font-medium font-inter transition duration-150`}
                                >
                                    Dashboard
                                </Link>
                            </div>
                        </div>
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
                        arrayFundingAbdimas={arrayFundingAbdimas}
                        arrayFundingPenelitian={arrayFundingPenelitian}
                    />
                </div>
            </main>
        </div>
    );
};

export default DashboardAdmin;
