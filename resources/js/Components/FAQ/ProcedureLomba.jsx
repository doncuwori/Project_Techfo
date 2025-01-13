import React from "react";
import Dropdown from "@/Components/FAQ/Dropdown";
import Step from "@/Components/FAQ/Step";

const ProcedureLomba = () => {
    return (
        <div className="container max-w-5xl mx-auto px-8 py-8 relative z-10">
            <div className="text-left">
                <h3 className="text-2xl font-bold text-black">
                    Prosedur <span className="text-[#fe632e]">Lomba</span>
                </h3>
            </div>

            <div className="mt-4 relative z-10">
                <Dropdown title="Prosedur Pendaftaran Lomba">
                    <Step
                        stepNumber="1"
                        title="Pilih lomba yang ingin diikuti"
                        description="Pilih lomba sesuai minat dan bakat Anda melalui dashboard aplikasi Techfo. Pastikan untuk membaca informasi terbaru mengenai lomba tersebut."
                        linkText="disini"
                        linkUrl={route("dashboardUser")}
                    />
                    <Step
                        stepNumber="2"
                        title="Pilih dan hubungi dosen pembimbing"
                        description="Hubungi dosen pembimbing yang sesuai dengan topik lomba yang Anda pilih. Diskusikan kebutuhan bimbingan dan strategi lomba bersama dosen tersebut."
                    />
                    <Step
                        stepNumber="3"
                        title="Daftarkan diri ke lomba"
                        description="Daftarkan diri atau tim Anda melalui aplikasi Techfo dengan klik tombol Daftar pada detail informasi lomba yang tersedia."
                    />
                    <Step
                        stepNumber="4"
                        title="Lakukan Pendataan Partisipasi Lomba"
                        description="Isi pendataan partisipasi melalui fitur yang tersedia di aplikasi Techfo. Data ini digunakan untuk mencatat poin keaktifan Anda selama perkuliahan. Klik"
                        linkText="disini"
                        linkUrl={route("pendataanLomba")}
                    />
                </Dropdown>

                <Dropdown title="Prosedur Pendataan Prestasi Lomba">
                    <Step
                        stepNumber="1"
                        title="Pastikan Pendataan Partisipasi Sudah Dilakukan"
                        description="Pastikan Anda telah mengisi formulir pendataan partisipasi lomba di aplikasi Techfo sebelumnya. Jika belum klik"
                        linkText="disini"
                        linkUrl={route("pendataanLomba")}
                    />
                    <Step
                        stepNumber="2"
                        title="Akses Menu Profil"
                        description="Buka menu Profil pada aplikasi Techfo, lalu pilih kartu Riwayat Partisipasi Lomba untuk lomba yang telah Anda ikuti."
                    />
                    <Step
                        stepNumber="3"
                        title="Lengkapi Data Prestasi"
                        description="Masukkan data prestasi yang Anda peroleh, termasuk bukti prestasi seperti sertifikat atau dokumen pendukung lainnya."
                    />
                    <Step
                        stepNumber="4"
                        title="Submit Formulir Prestasi Lomba"
                        description="Setelah data prestasi diisi, klik Submit untuk menyelesaikan pendataan. Data ini akan menambah poin keaktifan Anda."
                    />
                </Dropdown>

                <Dropdown title="Prosedur Klaim Hadiah Prestasi dari Universitas">
                    <Step
                        stepNumber="1"
                        title="Buat Laporan Pertanggung Jawaban (LPJ) Kegiatan"
                        description={
                            <>
                                Siapkan laporan pertanggung jawaban kegiatan
                                sesuai dengan format yang telah ditentukan. Anda
                                dapat mengunduh format LPJ{" "}
                                <a
                                    href="https://docs.google.com/document/d/1_ZemBsFWiwQ7EWc6J5oI3FC_cDtwlKEA/edit?usp=sharing&ouid=102283645336565718024&rtpof=true&sd=true"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 underline"
                                >
                                    di sini
                                </a>{" "}
                                dan contoh penyusunan LPJ lihat {" "}
                                <a
                                    href="https://drive.google.com/file/d/1gVZcW6n81Neiyqts_mEFYTSCDbwOqF-g/view?usp=sharing"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 underline"
                                >
                                    di sini.
                                </a>
                            </>
                        }
                    />
                    <Step
                        stepNumber="2"
                        title="Unggah Laporan ke Form Pendataan Prestasi"
                        description="Unggah LPJ Anda melalui form pendataan prestasi yang disediakan. Pastikan semua dokumen telah diisi dan dilampirkan dengan benar."
                    />
                    <Step
                        stepNumber="3"
                        title="Hubungi Staf Administrasi Mahasiswa Fakultas Ilmu Komputer"
                        description="Setelah mengunggah laporan, hubungi staf Pengadministrasian Kemahasiswaan Fakultas Ilmu Komputer UPNVJ untuk mengonfirmasi pengajuan klaim hadiah Anda."
                    />
                    <Step
                        stepNumber="4"
                        title="Tunggu Proses Klaim Hadiah"
                        description="Setelah semua langkah selesai, tunggu proses verifikasi dan pencairan hadiah dari universitas."
                    />
                </Dropdown>
            </div>
        </div>
    );
};

export default ProcedureLomba;
