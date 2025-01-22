import React, { useState } from "react";
import { Link, useForm, usePage } from "@inertiajs/react";
import { ChevronDown, Menu, X } from "lucide-react";
import ApplicationLogo from "@/Components/ApplicationLogo";

const Navbar = () => {
    // State untuk dropdown dan menu navigasi
    const [isPendataanDropdownOpen, setIsPendataanDropdownOpen] =
        useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobilePendataanDropdownOpen, setIsMobilePendataanDropdownOpen] =
        useState(false);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

    const { ormawa } = usePage().props.auth;

    // Fungsi untuk mengontrol interaksi dropdown Pendataan
    const handlePendataanMouseEnter = () => {
        setIsPendataanDropdownOpen(true);
    };
    const handlePendataanMouseLeave = () => {
        setIsPendataanDropdownOpen(false);
    };
    const togglePendataanDropdown = () => {
        setIsPendataanDropdownOpen((prev) => !prev);
    };

    // Fungsi untuk mengontrol interaksi dropdown Profil
    const handleProfileMouseLeave = () => {
        setIsProfileDropdownOpen(false);
    };
    const toggleProfileDropdown = () => {
        setIsProfileDropdownOpen((prev) => !prev);
        if (isPendataanDropdownOpen) {
            setIsPendataanDropdownOpen(false);
        }
    };

    // Fungsi untuk mengontrol tampilan menu Mobile
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen((prev) => !prev);
    };
    const toggleMobilePendataanDropdown = () => {
        setIsMobilePendataanDropdownOpen((prev) => !prev);
    };

    // Fungsi untuk logout
    const { post } = useForm();

    const handleLogout = () => {
        post(route("logout"));
    };

    const toggleLogoutModal = () => {
        setIsLogoutModalOpen((prev) => !prev);
    };

    const handleCloseModal = () => {
        setIsLogoutModalOpen(false);
    };

    return (
        <header className="w-full h-16 px-4 md:px-10 py-4 bg-white shadow-md flex items-center justify-between">
            {/* Logo dan judul aplikasi */}
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 md:gap-4">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center overflow-hidden">
                        <ApplicationLogo className="w-full h-full object-cover" />
                    </div>

                    <Link
                        href={route("dashboardUser")}
                        className="flex items-center"
                    >
                        <span className="text-gray-900 text-lg md:text-2xl font-semibold">
                            Tech
                        </span>
                        <span className="text-[#fe632e] text-lg md:text-2xl font-semibold">
                            fo
                        </span>
                    </Link>
                </div>
            </div>

            <div className="flex-grow flex items-center justify-center">
                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-6">
                    <Link
                        href={route("dashboardUser")}
                        className={`${
                            route().current("dashboardUser")
                                ? "bg-[#fe632e] text-white rounded-lg px-3 py-1 hover:font-bold"
                                : "text-gray-900 hover:text-[#fe632e] hover:font-bold"
                        } text-sm md:text-base font-medium transition duration-150`}
                    >
                        Home
                    </Link>
                    <Link
                        href={route("lomba")}
                        className={`${
                            route().current("lomba") ||
                            route().current("competition.show")
                                ? "bg-[#fe632e] text-white rounded-lg px-3 py-1 hover:font-bold"
                                : "text-gray-900 hover:text-[#fe632e] hover:font-bold"
                        } text-sm md:text-base font-medium transition duration-150`}
                    >
                        Lomba
                    </Link>
                    <Link
                        href={route("beasiswa")}
                        className={`${
                            route().current("beasiswa") ||
                            route().current("scholarship.show")
                                ? "bg-[#fe632e] text-white rounded-lg px-3 py-1 hover:font-bold"
                                : "text-gray-900 hover:text-[#fe632e] hover:font-bold"
                        } text-sm md:text-base font-medium transition duration-150`}
                    >
                        Beasiswa
                    </Link>
                    <Link
                        href={route("abdimas")}
                        className={`${
                            route().current("abdimas") ||
                            route().current("abdimas.show") ||
                            route().current("daftarAbdimas")
                                ? "bg-[#fe632e] text-white rounded-lg px-3 py-1 hover:font-bold"
                                : "text-gray-900 hover:text-[#fe632e] hover:font-bold"
                        } text-sm md:text-base font-medium transition duration-150`}
                    >
                        Pengabdian Masyarakat
                    </Link>
                    <Link
                        href={route("penelitian")}
                        className={`${
                            route().current("penelitian") ||
                            route().current("research.show") ||
                            route().current("daftarPenelitian")
                                ? "bg-[#fe632e] text-white rounded-lg px-3 py-1 hover:font-bold"
                                : "text-gray-900 hover:text-[#fe632e] hover:font-bold"
                        } text-sm md:text-base font-medium transition duration-150`}
                    >
                        Penelitian
                    </Link>

                    {/* Pendataan Dropdown */}
                    <div
                        className="relative"
                        onMouseEnter={handlePendataanMouseEnter}
                        onMouseLeave={handlePendataanMouseLeave}
                    >
                        <button
                            onClick={togglePendataanDropdown}
                            className={`flex items-center ${
                                route().current("pendataanLomba") ||
                                route().current("pendataanBeasiswa")
                                    ? "bg-[#fe632e] text-white rounded-lg px-3 py-1 hover:font-bold"
                                    : "text-gray-900 hover:text-[#fe632e] hover:font-bold"
                            } text-sm md:text-base font-medium`}
                        >
                            <span>Pendataan</span>
                            <ChevronDown className="h-5 w-5 ml-1" />
                        </button>
                        {isPendataanDropdownOpen && (
                            <div
                                className="absolute left-0 mt-0 w-72 border bg-white rounded-xl shadow-lg z-20"
                                onMouseEnter={handlePendataanMouseEnter}
                                onMouseLeave={handlePendataanMouseLeave}
                            >
                                <Link
                                    href={route("pendataanLomba")}
                                    className={`block px-4 py-2 ${
                                        route().current("pendataanLomba")
                                            ? "bg-[#fe632e] text-white font-bold rounded-t-xl hover:font-bold"
                                            : "hover:bg-orange-100 hover:text-[#fe632e] font-bold hover:rounded-t-xl"
                                    }`}
                                >
                                    <div className="text-base font-semibold leading-normal">
                                        Pendataan Lomba
                                    </div>
                                    <div className="text-gray-500 text-xs font-normal leading-tight">
                                        Lakukan pendataan lomba disini
                                    </div>
                                </Link>

                                <Link
                                    href={route("pendataanBeasiswa")}
                                    className={`block px-4 py-2 ${
                                        route().current("pendataanBeasiswa")
                                            ? "bg-[#fe632e] text-white font-bold rounded-b-lg hover:font-bold"
                                            : "hover:bg-orange-100 hover:text-[#fe632e] font-bold hover:rounded-b-l"
                                    }`}
                                >
                                    <div className="text-base font-semibold leading-normal">
                                        Pendataan Beasiswa
                                    </div>
                                    <div className="text-gray-500 text-xs font-normal leading-tight">
                                        Lakukan pendataan beasiswa disini
                                    </div>
                                </Link>
                            </div>
                        )}
                    </div>
                    <Link
                        href={route("faq")}
                        className={`${
                            route().current("faq")
                                ? "bg-[#fe632e] text-white rounded-lg px-3 py-1 hover:font-bold"
                                : "text-gray-900 hover:text-[#fe632e] hover:font-bold"
                        } text-sm md:text-base font-medium transition duration-150`}
                    >
                        FAQ
                    </Link>
                </nav>
            </div>

            {/* Profile Dropdown (Desktop) */}
            <div className="relative hidden md:block">
                <button
                    onClick={toggleProfileDropdown}
                    className={`flex items-center space-x-2 transition duration-150 hover:scale-105 hover:border-4 hover:border-orange-400 hover:rounded-full ${
                        route().current("profile")
                            ? "border-4 border-orange-400 rounded-full"
                            : "border-4 rounded-full"
                    }`}
                >
                    <img
                        className="w-9 h-9 md:w-9 md:h-9 rounded-full ml-auto cursor-pointer"
                        src="/img/profiledefault.png"
                        alt="User Profile"
                    />
                </button>
                {isProfileDropdownOpen && (
                    <div
                        className="absolute right-0 mt-0 w-56 border bg-white rounded-md shadow-md z-10"
                        onMouseLeave={handleProfileMouseLeave}
                    >
                        <Link
                            href={route("profile")}
                            className={`block px-4 py-2 text-gray-700 transition duration-150 ${
                                route().current("profile")
                                    ? "bg-orange-50 text-[#fe632e] font-bold"
                                    : "hover:bg-orange-50 hover:text-[#fe632e] hover:font-bold"
                            }`}
                            style={{
                                color: route().current("profile")
                                    ? "#fe632e"
                                    : "",
                            }} // Fallback color
                        >
                            Profil Saya
                        </Link>
                        {ormawa ? (
                            <Link
                                href={route("dashboardAdmin")}
                                className={`block px-4 py-2 text-gray-700 transition duration-150 ${
                                    route().current("profile")
                                        ? "bg-orange-50 text-[#fe631e] font-bold"
                                        : "hover:bg-orange-50 hover:text-[#fe632e] hover:font-bold"
                                }`}
                            >
                                Dashboard Admin
                            </Link>
                        ) : (
                            ""
                        )}
                        <button
                            onClick={toggleLogoutModal}
                            className="block w-full text-left px-4 py-2 text-gray-700 transition duration-150 hover:bg-orange-50 hover:text-[#fe632e] hover:font-bold hover:rounded-b-md"
                        >
                            Keluar
                        </button>
                    </div>
                )}
            </div>

            {/* Mobile Menu Toggle (AlignJustify Icon) */}
            <button
                className="md:hidden text-gray-900 ml-auto transition-transform duration-200 hover:scale-110"
                onClick={toggleMobileMenu}
            >
                {/* Mobile icon toggle: AlignJustify or X */}
                {isMobileMenuOpen ? (
                    <X className="w-6 h-6 transition-all transform rotate-180 hover:text-[#fe632e] hover:scale-105 hover:rotate-90" />
                ) : (
                    <Menu className="w-6 h-6 transition-all hover:text-[#fe632e] hover:scale-105" />
                )}
            </button>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-16 left-0 w-full bg-white shadow-md z-20">
                    <nav className="flex flex-col items-center gap-4 py-4 w-full">
                        <div className="w-full hover:bg-orange-50 transition duration-150">
                            <Link
                                href={route("dashboardUser")}
                                className="px-4 py-2 text-gray-900 text-lg font-medium transition duration-150 hover:text-[#fe632e] hover:font-bold w-full block text-center"
                            >
                                Home
                            </Link>
                        </div>
                        <div className="w-full hover:bg-orange-50 transition duration-150">
                            <Link
                                href={route("lomba")}
                                className="px-4 py-2 text-gray-900 text-lg font-medium transition duration-150 hover:text-[#fe632e] hover:font-bold w-full block text-center"
                            >
                                Lomba
                            </Link>
                        </div>
                        <div className="w-full hover:bg-orange-50 transition duration-150">
                            <Link
                                href={route("beasiswa")}
                                className="px-4 py-2 text-gray-900 text-lg font-medium transition duration-150 hover:text-[#fe632e] hover:font-bold w-full block text-center"
                            >
                                Beasiswa
                            </Link>
                        </div>
                        <div className="w-full hover:bg-orange-50 transition duration-150">
                            <Link
                                href={route("abdimas")}
                                className="px-4 py-2 text-gray-900 text-lg font-medium transition duration-150 hover:text-[#fe632e] hover:font-bold w-full block text-center"
                            >
                                Pengabdian Masyarakat
                            </Link>
                        </div>
                        <div className="w-full hover:bg-orange-50 transition duration-150">
                            <Link
                                href={route("penelitian")}
                                className="px-4 py-2 text-gray-900 text-lg font-medium transition duration-150 hover:text-[#fe632e] hover:font-bold w-full block text-center"
                            >
                                Penelitian
                            </Link>
                        </div>
                        <div className="w-full hover:bg-orange-50 transition duration-150">
                            <button
                                onClick={toggleMobilePendataanDropdown}
                                className="w-full px-4 py-2 text-gray-900 text-lg font-medium transition duration-150 hover:bg-orange-100 hover:text-[#fe632e] hover:font-bold text-center flex justify-center items-center gap-1"
                            >
                                <span className="text-center">Pendataan</span>
                                <ChevronDown
                                    className={`h-5 w-5 transform transition-transform ${
                                        isMobilePendataanDropdownOpen
                                            ? "rotate-180"
                                            : "rotate-0"
                                    }`}
                                />
                            </button>
                            {isMobilePendataanDropdownOpen && (
                                <div className="w-full bg-orange-50">
                                    <Link
                                        href={route("pendataanLomba")}
                                        className="block px-4 py-2 text-gray-900 text-base text-center hover:bg-orange-100 hover:text-[#fe632e] hover:font-bold transition duration-150"
                                    >
                                        Pendataan Lomba
                                    </Link>
                                    <Link
                                        href={route("pendataanBeasiswa")}
                                        className="block px-4 py-2 text-gray-900 text-base text-center hover:bg-orange-100 hover:text-[#fe632e] hover:font-bold transition duration-150"
                                    >
                                        Pendataan Beasiswa
                                    </Link>
                                </div>
                            )}
                        </div>
                        <div className="w-full hover:bg-orange-50 transition duration-150">
                            <Link
                                href={route("faq")}
                                className="px-4 py-2 text-gray-900 text-lg font-medium transition duration-150 hover:text-[#fe632e] hover:font-bold w-full block text-center"
                            >
                                FAQ
                            </Link>
                        </div>
                        <div className="w-full hover:bg-orange-50 transition duration-150">
                            <Link
                                href={route("profile")}
                                className="px-4 py-2 text-gray-900 text-lg font-medium transition duration-150 hover:text-[#fe632e] hover:font-bold w-full block text-center"
                            >
                                Profil Saya
                            </Link>
                        </div>
                        {ormawa ? (
                            <div className="w-full hover:bg-orange-50 transition duration-150">
                                <Link
                                    href={route("dashboardAdmin")}
                                    className="px-4 py-2 text-gray-900 text-lg font-medium transition duration-150 hover:text-[#fe632e] hover:font-bold w-full block text-center"
                                >
                                    DashboardAdmin
                                </Link>
                            </div>
                        ) : (
                            ""
                        )}
                        <div className="w-full hover:bg-orange-50 transition duration-150">
                            <button
                                onClick={toggleLogoutModal}
                                className="px-4 py-2 text-gray-900 text-lg font-medium transition duration-150 hover:text-[#fe632e] hover:font-bold w-full block text-center"
                            >
                                Keluar
                            </button>
                        </div>
                    </nav>
                </div>
            )}

            {/* Modal Popup for Logout Confirmation */}
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
                                onClick={handleCloseModal}
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
        </header>
    );
};

export default Navbar;
