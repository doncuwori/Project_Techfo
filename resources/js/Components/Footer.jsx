import React from "react";
import {
    University,
    MapPinned,
    PhoneCall,
    Mail,
    UserRound,
    Instagram,
    Facebook,
    Youtube,
    Twitter,
} from "lucide-react";

const Footer = () => {
    return (
        <div className="w-full bg-[#111111] py-12 px-8 text-white relative z-10">
            <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row justify-between gap-12">
                {/* Faculty Info Section */}
                <div className="flex flex-col gap-8 lg:max-w-[363px]">
                    <div className="flex items-center gap-4">
                        <img
                            className="w-14 h-14"
                            src="img/upn.png"
                            alt="Faculty Logo"
                        />
                        <div className="text-[#fe632e] font-bold text-lg">
                            FAKULTAS ILMU KOMPUTER
                            <br />
                            UPN VETERAN JAKARTA
                        </div>
                    </div>

                    <div className="text-base">
                        <a
                            href="https://www.upnvj.ac.id/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-orange-500 flex items-center gap-3"
                        >
                            <University className="w-6 h-6 text-orange-500" />
                            Universitas Pembangunan Nasional "Veteran" Jakarta
                        </a>
                        <br />
                        <a
                            href="https://maps.app.goo.gl/11a4NCFJruxPq5Yh9"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-orange-500 flex items-center gap-3"
                        >
                            <MapPinned className="w-6 h-6 text-orange-500" />
                            Jl. RS. Fatmawati, Pondok Labu, Jakarta Selatan, DKI
                            Jakarta. 12450.
                        </a>
                        <br />
                        <a
                            href="tel:(021)7656971"
                            className="hover:text-orange-500 flex items-center gap-3"
                        >
                            <PhoneCall className="w-5 h-5 text-orange-500" />{" "}
                            (021)7656971
                        </a>
                        <br />
                        <a
                            href="mailto:upnvj@upnvj.ac.id"
                            className="hover:text-orange-500 flex items-center gap-3"
                        >
                            <Mail className="w-5 h-5 text-orange-500" />{" "}
                            upnvj@upnvj.ac.id
                        </a>

                        <div className="mt-6 text-lg font-bold">
                            Media Sosial
                        </div>
                        <div className="flex mt-2 gap-4">
                            <a
                                href="https://www.instagram.com/fikupnvj/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-orange-500 hover:scale-110 transform transition-transform flex items-center gap-3"
                            >
                                <Instagram className="w-8 h-8 text-orange-500" />
                            </a>
                            <a
                                href="https://youtube.com/@fikupnvj?si=MlFSC2FJ2IrT80Y5"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-orange-500 hover:scale-110 transform transition-transform flex items-center gap-3"
                            >
                                <Youtube className="w-10 h-10 text-orange-500" />
                            </a>
                            <a
                                href="https://www.x.com/upnjakarta"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-orange-500 hover:scale-110 transform transition-transform flex items-center gap-3"
                            >
                                <Twitter className="w-8 h-8 text-orange-500" />
                            </a>
                            <a
                                href="https://www.facebook.com/infoupnjakarta"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-orange-500 hover:scale-110 transform transition-transform flex items-center gap-3"
                            >
                                <Facebook className="w-8 h-8 text-orange-500" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Technology Information Section */}
                <div className="flex flex-col gap-3 lg:max-w-[410px]">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-[#d9d9d9] rounded-full flex items-center justify-center border-2 border-[#fcfcfc]">
                            <img
                                className="w-12 h-12 rounded-full"
                                src="/img/LogoTechfo.jpg"
                                alt="Technology Icon"
                            />
                        </div>
                        <div className="text-xl font-bold">
                            <span className="text-white">Technology</span>
                            <span className="text-[#fb8207]"> Information</span>
                        </div>
                    </div>

                    <div className="text-base font-bold mt-5">
                        Project Akhir Mahasiswa
                    </div>
                    <div className="text-base font-normal leading-snug">
                        Website yang memuat informasi seputar lomba, beasiswa,
                        pengabdian masyarakat, dan penelitian oleh dosen.
                    </div>
                    <div className="text-base font-semibold">
                        Project Akhir Mahasiswa FIK 2021
                    </div>
                    <div className="text-base font-normal">
                        <div className="flex items-center gap-3">
                            <UserRound className="w-5 h-5" />
                            Andi Setiawan - 2110512083
                        </div>
                        <div className="flex items-center gap-3">
                            <UserRound className="w-5 h-5" />
                            Khaliza Fania - 2110512020
                        </div>
                        <div className="flex items-center gap-3">
                            <UserRound className="w-5 h-5" />
                            Elmira Ardelia - 2110512046
                        </div>
                    </div>
                    <div className="text-base font-semibold">
                        Dosen Pembimbing
                    </div>
                    <div className="text-base font-normal">
                        <div className="flex items-center gap-3">
                            <UserRound className="w-5 h-5" />
                            Erly Krisnanik, S.Kom., MM. - 0308097401
                        </div>
                        <div className="flex items-center gap-3">
                            <UserRound className="w-5 h-5" />
                            Ika Nurlaili, S.Kom., M.Sc. - 0015039301
                        </div>
                    </div>
                </div>

                {/* Location Project Section */}
                <div className="flex flex-col gap-12 mt-3 lg:max-w-[282px]">
                    <div className="text-xl font-bold text-white">
                        Temukan Kami Disini
                    </div>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.598723401264!2d106.7934897592435!3d-6.316324941843607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69ee3e065d4f6b%3A0xe176f81a31564166!2sUniversitas%20Pembangunan%20Nasional%20Veteran%20Jakarta!5e0!3m2!1sen!2sid!4v1730907281576!5m2!1sen!2sid"
                        width="100%"
                        height="200"
                        style={{ border: "none", borderRadius: "10px" }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </div>

            {/* Footer Section */}
            <div className="text-sm text-center mt-14">
                Copyright ©2025 Fakultas Ilmu Komputer UPN "Veteran" Jakarta
            </div>
        </div>
    );
};

export default Footer;
