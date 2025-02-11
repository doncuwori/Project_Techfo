import React, { useState, useEffect } from "react";
import { Link, useForm, usePage } from "@inertiajs/react";
import {
    LogOut,
    LayoutDashboard,
    Briefcase,
    ChevronDown,
    NotepadText,
    ChartBar,
    UsersRound,
} from "lucide-react";
import ApplicationLogo from "@/Components/ApplicationLogo";

const NavbarAdmin = () => {
    // State management untuk dropdown menu
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const [isLaporanDropdownOpen, setIsLaporanDropdownOpen] = useState(false);
    const [isPusatInformasiDropdownOpen, setIsPusatInformasiDropdownOpen] =
        useState(false);
    const [isChevronLaporanRotated, setIsChevronLaporanRotated] =
        useState(false);
    const [isChevronPusatInformasiRotated, setIsChevronPusatInformasiRotated] =
        useState(false);

    // Hooks dan data dari halaman
    const { post } = useForm();
    const { url } = usePage();
    const { user } = usePage().props;
    const { wadek, kaprodi, ormawa } = usePage().props.auth;
    const { mahasiswa } = usePage().props.auth;

    // Fungsi toggle untuk dropdown profil
    const toggleProfileDropdown = () => {
        setIsProfileDropdownOpen(!isProfileDropdownOpen);
    };

    const handleProfileMouseLeave = () => {
        setIsProfileDropdownOpen(false);
    };

    // Fungsi toggle untuk dropdown laporan
    const toggleLaporanDropdown = () => {
        setIsLaporanDropdownOpen(!isLaporanDropdownOpen);
        setIsChevronLaporanRotated(!isChevronLaporanRotated);
    };

    // Fungsi toggle untuk dropdown pusat informasi
    const togglePusatInformasiDropdown = () => {
        setIsPusatInformasiDropdownOpen(!isPusatInformasiDropdownOpen);
        setIsChevronPusatInformasiRotated(!isChevronPusatInformasiRotated);
    };

    // useEffect untuk mendeteksi URL aktif dan mengatur state dropdown
    useEffect(() => {
        const laporanRoutes = [
            "laporanLomba",
            "laporanBeasiswa",
            "laporanAbdimas",
            "laporanPenelitian",
        ];
        const pusatInformasiRoutes = [
            "pusatLomba",
            "pusatBeasiswa",
            "pusatAbdimas",
            "pusatPenelitian",
            "tambahInfoLomba",
            "tambahInfoBeasiswa",
            "tambahInfoAbdimas",
            "tambahInfoPenelitian",
            "editInfoLomba",
            "editInfoBeasiswa",
            "editInfoAbdimas",
            "editInfoPenelitian",
        ];

        setIsLaporanDropdownOpen(
            laporanRoutes.some((route) => url.includes(route))
        );
        setIsPusatInformasiDropdownOpen(
            pusatInformasiRoutes.some((route) => url.includes(route))
        );
    }, [url]);

    // Data menu pusat informasi
    const [pusatInformasiMenu, setPusatInformasiMenu] = useState([
        {
            name: "Lomba",
            route1: "pusatLomba",
            route2: "tambahInfoLomba",
            route3: "",
            route4: "editInfoLomba",
        },
        {
            name: "Beasiswa",
            route1: "pusatBeasiswa",
            route2: "tambahInfoBeasiswa",
            route3: "",
            route4: "editInfoBeasiswa",
        },
        {
            name: "Pengabdian Masyarakat",
            route1: "pusatAbdimas",
            route2: "tambahInfoAbdimas",
            route3: "pusatAbdimas.show",
            route4: "editInfoAbdimas",
        },
        {
            name: "Penelitian",
            route1: "pusatPenelitian",
            route2: "tambahInfoPenelitian",
            route3: "pusatPenelitian.show",
            route4: "editInfoPenelitian",
        },
    ]);

    // Update menu jika user adalah ormawa
    useEffect(() => {
        if (ormawa) {
            setPusatInformasiMenu([
                {
                    name: "Lomba",
                    route1: "pusatLomba",
                    route2: "tambahInfoLomba",
                    route3: "",
                },
                {
                    name: "Beasiswa",
                    route1: "pusatBeasiswa",
                    route2: "tambahInfoBeasiswa",
                    route3: "",
                },
            ]);
        }
    }, [ormawa]);

    // Update menu jika user adalah dosen
    // useEffect(() => {
    //     if (dosen) {
    //         setPusatInformasiMenu([
    //             {
    //                 name: "Abdimas",
    //                 route1: "pusatAbdimas",
    //                 route2: "tambahInfoAbdimas",
    //                 route3: "",
    //             },
    //             {
    //                 name: "Penelitian",
    //                 route1: "pusatPenelitian",
    //                 route2: "tambahInfoPenelitian",
    //                 route3: "",
    //             },
    //         ]);
    //     }
    // }, [dosen]);

    const [showModal, setShowModal] = useState(false);

    const handleRoleSwitch = () => {
        setShowModal(false);
    };

    // State untuk kontrol modal
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

    // Fungsi untuk membuka dan menutup modal
    const openLogoutModal = () => setIsLogoutModalOpen(true);
    const closeLogoutModal = () => setIsLogoutModalOpen(false);

    // Fungsi untuk menangani logout
    const handleLogout = () => {
        post(route("logout"));
    };

    return (
        <div>
            {/* Header */}
            <div className="w-full h-18 px-4 md:px-10 py-4 bg-white shadow-md flex items-center justify-between fixed top-0 left-0 z-20">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 md:gap-4">
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center overflow-hidden">
                            <ApplicationLogo className="w-full h-full object-cover" />
                        </div>

                        <Link
                            href={route("dashboardAdmin")}
                            className="flex items-center"
                        >
                            <span className="text-gray-900 text-lg md:text-2xl font-semibold">
                                Tech
                            </span>
                            <span className="text-orange-600 text-lg md:text-2xl font-semibold">
                                fo
                            </span>
                        </Link>
                    </div>
                </div>

                {/* Dropdown profil */}
                <div className="relative flex items-center ml-auto">
                    <button
                        onClick={toggleProfileDropdown}
                        className="flex items-center"
                    >
                        <img
                            className="w-9 h-9 md:w-9 md:h-9 rounded-full cursor-pointer"
                            src="/img/profiledefault.png"
                            alt="User Profile"
                        />
                        <div className="font-medium ml-2 hover:text-orange-600 cursor-pointer">
                            {mahasiswa
                                ? mahasiswa.mahasiswa_access.instansi
                                : user.name}
                        </div>
                    </button>

                    {isProfileDropdownOpen && (
                        <div
                            className="absolute right-0 mt-20 w-56 border bg-white rounded-md shadow-lg z-10"
                            onMouseLeave={handleProfileMouseLeave}
                        >
                            <button
                                onClick={openLogoutModal}
                                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-orange-50 hover:font-bold hover:text-orange-600"
                            >
                                Keluar
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Sidebar */}
            <div className="fixed top-2 left-0 w-72 h-screen bg-white shadow-md p-4 mt-16 z-10 flex flex-col">
                <ul className="flex-1">
                    {/* Dashboard Menu */}
                    <li key="dashboard" className="mb-4">
                        <Link
                            href={route("dashboardAdmin")}
                            className={`${
                                route().current("dashboardAdmin")
                                    ? "text-white bg-orange-500 hover:font-bold"
                                    : "text-gray-500 hover:text-orange-500"
                            } flex items-center w-full group transition duration-150 px-2 py-1 rounded-md`}
                        >
                            <LayoutDashboard
                                className={`w-5 h-5 mr-2 ${
                                    route().current("dashboardAdmin")
                                        ? "text-white group-hover:scale-105"
                                        : "group-hover:text-orange-500"
                                }`}
                            />
                            <span>Dashboard</span>
                        </Link>
                    </li>

                    {/* Laporan Menu */}
                    {user.role === "admin" || wadek || kaprodi ? (
                        <li key="laporan" className="mb-4">
                            <button
                                onClick={toggleLaporanDropdown}
                                className={`${
                                    route().current("laporanLomba") ||
                                    route().current("laporanBeasiswa") ||
                                    route().current("laporanAbdimas") ||
                                    route().current("laporanPenelitian")
                                        ? "text-white bg-orange-500 hover:font-bold"
                                        : "text-gray-500 hover:text-orange-500"
                                } flex items-center w-full group transition duration-150 px-2 py-1 rounded-md`}
                            >
                                <Briefcase
                                    className={`w-5 h-5 mr-2 ${
                                        route().current("laporanLomba") ||
                                        route().current("laporanBeasiswa") ||
                                        route().current("laporanAbdimas") ||
                                        route().current("laporanPenelitian")
                                            ? "text-white group-hover:scale-105"
                                            : "group-hover:text-orange-500"
                                    }`}
                                />
                                <span>Laporan</span>
                                <ChevronDown
                                    className={`ml-auto w-5 h-5 transform transition-transform duration-200 ${
                                        isChevronLaporanRotated
                                            ? "rotate-180"
                                            : ""
                                    }`}
                                />
                            </button>
                            {isLaporanDropdownOpen && (
                                <ul className="pl-8 mt-2">
                                    {[
                                        {
                                            name: "Lomba",
                                            route: "laporanLomba",
                                        },
                                        {
                                            name: "Beasiswa",
                                            route: "laporanBeasiswa",
                                        },
                                        {
                                            name: "Pengabdian Masyarakat",
                                            route: "laporanAbdimas",
                                        },
                                        {
                                            name: "Penelitian",
                                            route: "laporanPenelitian",
                                        },
                                    ].map((subItem) => (
                                        <li
                                            key={subItem.name}
                                            className="mb-2 flex items-center group"
                                        >
                                            <Link
                                                href={route(subItem.route)}
                                                className={`${
                                                    route().current(
                                                        subItem.route
                                                    )
                                                        ? "text-orange-500 hover:font-bold"
                                                        : "text-gray-500 group-hover:text-orange-500"
                                                } flex items-center`}
                                            >
                                                <NotepadText
                                                    className={`w-4 h-4 mr-2 ${
                                                        route().current(
                                                            subItem.route
                                                        )
                                                            ? "text-orange-500 group-hover:scale-105"
                                                            : "text-gray-500 group-hover:text-orange-500"
                                                    }`}
                                                />
                                                {subItem.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ) : (
                        ""
                    )}

                    {/* Pusat Informasi Menu */}
                    <li key="pusatInformasi" className="mb-4">
                        <button
                            onClick={togglePusatInformasiDropdown}
                            className={`${
                                route().current("pusatLomba") ||
                                route().current("pusatBeasiswa") ||
                                route().current("pusatAbdimas") ||
                                route().current("pusatPenelitian") ||
                                route().current("tambahInfoLomba") ||
                                route().current("tambahInfoBeasiswa") ||
                                route().current("tambahInfoAbdimas") ||
                                route().current("pusatAbdimas.show") ||
                                route().current("tambahInfoPenelitian") ||
                                route().current("pusatPenelitian.show") ||
                                route().current("editInfoLomba") ||
                                route().current("editInfoBeasiswa") ||
                                route().current("editInfoAbdimas") ||
                                route().current("editInfoPenelitian")
                                    ? "text-white bg-orange-500 hover:font-bold"
                                    : "text-gray-500 hover:text-orange-500"
                            } flex items-center w-full group transition duration-150 px-2 py-1 rounded-md`}
                        >
                            <ChartBar
                                className={`w-5 h-5 mr-2 ${
                                    route().current("pusatLomba") ||
                                    route().current("pusatBeasiswa") ||
                                    route().current("pusatAbdimas") ||
                                    route().current("pusatPenelitian") ||
                                    route().current("tambahInfoLomba") ||
                                    route().current("tambahInfoBeasiswa") ||
                                    route().current("tambahInfoAbdimas") ||
                                    route().current("pusatAbdimas.show") ||
                                    route().current("tambahInfoPenelitian") ||
                                    route().current("pusatPenelitian.show") ||
                                    route().current("editInfoLomba") ||
                                    route().current("editInfoBeasiswa") ||
                                    route().current("editInfoAbdimas") ||
                                    route().current("editInfoPenelitian")
                                        ? "text-white group-hover:scale-105"
                                        : "group-hover:text-orange-500"
                                }`}
                            />
                            <span>Pusat Informasi</span>
                            <ChevronDown
                                className={`ml-auto w-5 h-5 transform transition-transform duration-200 ${
                                    isChevronPusatInformasiRotated
                                        ? "rotate-180"
                                        : ""
                                }`}
                            />
                        </button>
                        {isPusatInformasiDropdownOpen && (
                            <ul className="pl-8 mt-2">
                                {pusatInformasiMenu.map((subItem) => (
                                    <li
                                        key={subItem.name}
                                        className="mb-2 flex items-center group"
                                    >
                                        <Link
                                            href={route(subItem.route1)}
                                            className={`${
                                                route().current(
                                                    subItem.route1
                                                ) ||
                                                route().current(
                                                    subItem.route2
                                                ) ||
                                                (subItem.route3 &&
                                                    route().current(
                                                        subItem.route3
                                                    )) ||
                                                (subItem.route4 &&
                                                    route().current(
                                                        subItem.route4
                                                    ))
                                                    ? "text-orange-500 hover:font-bold"
                                                    : "text-gray-500 group-hover:text-orange-500"
                                            } flex items-center`}
                                        >
                                            <NotepadText
                                                className={`w-4 h-4 mr-2 ${
                                                    route().current(
                                                        subItem.route1
                                                    ) ||
                                                    route().current(
                                                        subItem.route2
                                                    ) ||
                                                    (subItem.route3 &&
                                                        route().current(
                                                            subItem.route3
                                                        )) ||
                                                    (subItem.route4 &&
                                                        route().current(
                                                            subItem.route4
                                                        ))
                                                        ? "text-orange-500 group-hover:scale-105"
                                                        : "text-gray-500 group-hover:text-orange-500"
                                                }`}
                                            />
                                            {subItem.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>

                    {/* Management User Menu */}
                    {user.role === "admin" ? (
                        <li key="manajemenUser" className="mb-4">
                            <a
                                href={route("manajemenUser")}
                                className={`${
                                    route().current("manajemenUser")
                                        ? "text-white bg-orange-500 hover:font-bold"
                                        : "text-gray-500 hover:text-orange-500"
                                } flex items-center w-full group transition duration-150 px-2 py-1 rounded-md`}
                            >
                                <UsersRound
                                    className={`w-5 h-5 mr-2 ${
                                        route().current("manajemenUser")
                                            ? "text-white group-hover:scale-105"
                                            : "group-hover:text-orange-500"
                                    }`}
                                />
                                <span>Manajemen User</span>
                            </a>
                        </li>
                    ) : (
                        ""
                    )}

                    {/* Role Switching Menu*/}
                    {ormawa ? (
                        <li key="roleSwitch" className="mb-4">
                            <button
                                onClick={() => setShowModal(true)}
                                className={`${
                                    route().current("dashboardUser")
                                        ? "text-white bg-orange-500 hover:font-bold"
                                        : "text-gray-500 hover:text-orange-500"
                                } flex items-center w-full group transition duration-150 px-2 py-1 rounded-md`}
                            >
                                <UsersRound
                                    className={`w-5 h-5 mr-2 ${
                                        route().current("dashboardUser")
                                            ? "text-white group-hover:scale-105"
                                            : "group-hover:text-orange-500"
                                    }`}
                                />
                                <span>Dashboard User</span>
                            </button>
                        </li>
                    ) : (
                        ""
                    )}
                </ul>

                {/* Logout */}
                <div className="mt-auto mb-20">
                    <div>
                        <button
                            onClick={openLogoutModal}
                            className="w-full px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-orange-700 flex items-center justify-center gap-2"
                        >
                            <span>Keluar</span>
                            <LogOut className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal Konfirmasi */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white w-96 p-6 rounded-lg shadow-lg">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">
                            Konfirmasi Perpindahan
                        </h2>
                        <p className="text-gray-600 mb-6">
                            Anda akan berpindah ke dashboard user. Apakah Anda
                            yakin?
                        </p>
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                            >
                                Batal
                            </button>
                            <Link
                                href={route("dashboardUser")}
                                onClick={handleRoleSwitch}
                                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                            >
                                Pindah
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Popup Logout */}
            {isLogoutModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
                        <h2 className="text-lg font-semibold text-gray-800">
                            Konfirmasi Keluar
                        </h2>
                        <p className="mt-2 text-gray-600">
                            Apakah Anda yakin ingin keluar?
                        </p>
                        <div className="mt-4 flex justify-end gap-4">
                            <button
                                onClick={closeLogoutModal}
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                            >
                                Batal
                            </button>
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                            >
                                Keluar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NavbarAdmin;
