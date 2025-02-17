import { useForm, usePage } from "@inertiajs/react";
import { Plus, Trash, Upload } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import SearchableSelect from "@/Components/SearchableSelect";
import PernyataanLegalitas from "@/Components/PernyataanLegalitas";

export const TabPrestasiLomba = ({ mahasiswa, dosen, country }) => {
    const [member, setMember] = useState([]);
    const { data, setData, post, processing, errors, reset } = useForm({
        is_group: false,
        leader_nim: "",
        id_country: "",
        ormawa_delegation: "",
        achievement_level: "",
        mentor_name: "",
        activity_name: "",
        field: "",
        type: "",
        degree: "",
        organizer: "",
        scope: "",
        location: "",
        activity_date_start: "",
        activity_date_end: "",
        description: "",
        proof_scan_url: "",
        event_photo_url: "",
        report_url: "",
        phone: "",
        members: [],
    });

    const [memberNim, setMemberNim] = useState("");
    const [fetchedUsers, setFetchedUsers] = useState([]);
    const user = usePage().props.auth.user;

    const mahasiswaOption = mahasiswa.map((val) => {
        return { value: val.id, label: `${val.nama} - ${val.nim}` };
    });

    const dosenOption = dosen.map((val) => {
        return {
            value: val.id,
            label: `${val.nama} - ${val.nidn} - Kuota : ${val.max_dosen_competition}/3`,
        };
    });

    const countryOption = country.map((val) => {
        return { value: val.id, label: val.country_name };
    });

    const [fields, setFields] = useState([{ value: "" }]);

    const addField = () => {
        setFields([...fields, { value: "" }]);
    };

    const removeField = (e, index) => {
        e.preventDefault();
        if (fields.length > 1) {
            setFields(fields.slice(0, -1));

            setTimeout(() => {
                const input = document.querySelectorAll(
                    'input[name="members[]"]'
                );
                const member = Array.from(input).map((input) => input.value);
                console.log(member);
                setData("members", member);
            }, 100);
        }
    };

    const fetchUsers = async () => {
        try {
            const response = await axios.get(route("api.user"), {
                params: { nim: memberNim },
            });
            setFetchedUsers(response.data.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    useEffect(() => {
        if (memberNim != "") fetchUsers();
    }, [memberNim]);

    const handleCheckbox = (e) => {
        setData("is_group", e.target.checked);
    };

    const [scanBuktiFile, setScanBuktiFile] = useState(null);
    const [kegiatanFile, setKegiatanFile] = useState(null);
    const [laporanFile, setLaporanFile] = useState(null);
    const [isChecked, setIsChecked] = useState(false);
    const [fileURL, setFileURL] = useState(null);

    const handleFileScanBuktiChange = (event) => {
        const file = event.target.files[0];

        if (file && file.size > 2097152) {
            toast.error("File tidak valid atau melebihi ukuran maksimal 2MB.");
            return;
        }

        if (file) {
            setScanBuktiFile(file);
            const url = URL.createObjectURL(file);
            setFileURL(url);
            setData("proof_scan_url", file);
        }
    };

    const handleFileKegiatanChange = (event) => {
        const file = event.target.files[0];

        if (file && file.size > 2097152) {
            toast.error("File tidak valid atau melebihi ukuran maksimal 2MB.");
            return;
        }

        if (file) {
            setKegiatanFile(file);
            const url = URL.createObjectURL(file);
            setFileURL(url);
            setData("event_photo_url", file);
        }
    };

    const handleFileLaporanChange = (event) => {
        const file = event.target.files[0];

        if (file && file.size > 2097152) {
            toast.error("File tidak valid atau melebihi ukuran maksimal 2MB.");
            return;
        }

        if (file) {
            setLaporanFile(file);
            const url = URL.createObjectURL(file);
            setFileURL(url);
            setData("report_url", file);
        }
    };

    const handleDropScanBuktiFile = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];

        if (
            file &&
            file.size <= 2 * 1024 * 1024 &&
            /\.(jpg|jpeg|png|pdf)$/i.test(file.name)
        ) {
            const url = URL.createObjectURL(file);
            setScanBuktiFile(file);
            setFileURL(url);
            setData("proof_scan_url", file);
        } else {
            toast.error("File tidak valid atau melebihi ukuran maksimal 2MB.");
        }
    };

    const handleDropKegiatanFile = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];

        if (
            file &&
            file.size <= 2 * 1024 * 1024 &&
            /\.(jpg|jpeg|png)$/i.test(file.name)
        ) {
            const url = URL.createObjectURL(file);
            setKegiatanFile(file);
            setFileURL(url);
            setData("event_photo_url", file);
        } else {
            toast.error("File tidak valid atau melebihi ukuran maksimal 2MB.");
        }
    };

    const handleDropLaporanFile = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];

        if (file && file.size <= 2 * 1024 * 1024 && /\.pdf$/i.test(file.name)) {
            const url = URL.createObjectURL(file);
            setLaporanFile(file);
            setFileURL(url);
            setData("report_url", file);
        } else {
            toast.error("File tidak valid atau melebihi ukuran maksimal 2MB.");
        }
    };

    const handleRemoveScanBuktiFile = () => {
        setScanBuktiFile(null);
        setFileURL(null);
        setData("proof_scan_url", null);
        const scanBuktiInput = document.getElementById("scanBuktiInput");
        if (scanBuktiInput) scanBuktiInput.value = null;
    };

    const handleRemoveKegiatanFile = () => {
        setKegiatanFile(null);
        setFileURL(null);
        setData("event_photo_url", null);
        const fotoKegiatanInput = document.getElementById("fotoKegiatanInput");
        if (fotoKegiatanInput) fotoKegiatanInput.value = null;
    };

    const handleRemoveLaporanFile = () => {
        setLaporanFile(null);
        setFileURL(null);
        setData("report_url", null);
        const laporanInput = document.getElementById("laporanInput");
        if (laporanInput) laporanInput.value = null;
    };

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route("competitionAchievement.store"), {
            onSuccess: (res) => {
                console.log("success");
                reset();
                toast.success("Pendataan Prestasi Lomba Berhasil Dibuat!");
            },
            onError: (errors) => {
                toast.error("Pendataan Prestasi Lomba Gagal DIbuat!");
                console.error(errors);
            },
        });
    };

    const handleMember = (value) => {
        const input = document.querySelectorAll('input[name="members[]"]');
        const member = Array.from(input).map((input) => input.value);
        setData("members", [...member, value.value]);
    };

    const handleDosen = (value) => {
        setData("id_dosen", value.value);
    };

    const handleCountry = (value) => {
        setData("id_country", value.value);
    };

    return (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">
                    Data Prestasi Mahasiswa
                </h2>
                <div className="mb-4">
                    <div className="flex items-center mb-2 bg-orange-50 gap-3 px-2 py-1 w-fit">
                        <input
                            type="checkbox"
                            value={data.is_group}
                            id="is_group"
                            onChange={handleCheckbox}
                        />
                        <label htmlFor="is_group" className="text-black">
                            Beri tanda Centang untuk kejuaraan beregu/kelompok
                            (Grup).
                        </label>
                    </div>
                    {data.is_group && (
                        // && artinya kalau true tampilkan, kalau false ga ditampilkan
                        <div className="mt-4 flex flex-col bg-neutral-50 gap-4 p-4">
                            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4">
                                <p>
                                    Perhatian! Isikan NIM atau NPM anggota yang
                                    diperkenankan menjadi ketua anggota. Untuk
                                    anggota diisikan menghubungi ketua untuk
                                    proses memasukkan data ketanggapan pada form
                                    ini prestasi mahasiswa.
                                </p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <div className="flex gap-2 flex-wrap">
                                    <input
                                        className="text-md px-2.5 py-2 rounded-lg border-neutral-400 border-[1.5px] bg-gray-200 md:w-96"
                                        placeholder="Tuliskan NIM"
                                        disabled={true}
                                        value={
                                            user.name + " - " + user.username
                                        }
                                    />
                                    <input
                                        className="text-sm px-2.5 py-2 rounded-lg border-neutral-400 border-[1.5px] bg-gray-200"
                                        value={"Ketua Regu"}
                                        disabled={true}
                                    />
                                </div>
                                {fields.map((field, index) => (
                                    <div className="flex gap-2" key={index + 1}>
                                        {/* <select
                                            className="text-sm px-2.5 py-2 rounded-lg border-neutral-400 border-[1.5px] w-96"
                                            placeholder="Tuliskan NIM"
                                        >
                                            <option disabled={true} selected={true}>- Pilih Mahasiswa -</option>
                                            {
                                                mahasiswa.map((val)=>{
                                                    return(
                                                        <option>{val.nama} - {val.nim}</option>
                                                    )
                                                })
                                            }

                                        </select> */}

                                        <div className="w-96">
                                            <SearchableSelect
                                                name={"members[]"}
                                                onChange={handleMember}
                                                options={mahasiswaOption}
                                                placeholder={
                                                    "- Pilih Mahasiswa -"
                                                }
                                            />
                                        </div>

                                        <input
                                            className="text-sm px-2.5 py-2 rounded-lg border-neutral-400 border-[1.5px] bg-gray-200"
                                            value={"Anggota " + (index + 1)}
                                            disabled={true}
                                        />
                                        {index != 0 ? (
                                            <button
                                                onClick={(e) =>
                                                    removeField(e, index)
                                                }
                                                className="bg-red-500 text-white px-4 py-2 rounded"
                                            >
                                                <Trash size={20} />
                                            </button>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                ))}
                                <div className="flex">
                                    <button
                                        type="button"
                                        className="bg-green-500 p-2 rounded-lg text-white"
                                        onClick={addField}
                                    >
                                        <Plus size={20} />
                                    </button>
                                </div>
                            </div>

                            <div></div>
                        </div>
                    )}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">
                        Nomor Telepon (WhatsApp)
                        <span className="text-red-600">*</span>
                    </label>
                    <input
                        type="number"
                        className="w-full border rounded-lg p-2"
                        placeholder="Masukkan Nomor Telepon Anda"
                        onChange={(e) => setData("phone", e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">
                        Delegasi ORMAWA<span className="text-red-600">*</span>
                    </label>
                    <select
                        value={data.ormawa_delegation}
                        onChange={(e) => {
                            setData("ormawa_delegation", e.target.value);
                        }}
                        className="w-full border rounded-lg px-4"
                    >
                        <option>-- Pilih Delegasi --</option>
                        <option>Bukan Delegasi dari ORMAWA</option>
                        <option>
                            Badan Eksekutif Mahasiswa Fakultas Ilmu Komputer
                        </option>
                        <option>BI Corner</option>
                        <option>Club Frame of Photography</option>
                        <option>Commander of the Menwa</option>
                        <option>Enterprise Development Center</option>
                        <option>FIBER PRODUCTION</option>
                        <option>Five TV</option>
                        <option>Forum Kajian Islam Asy Sifa</option>
                        <option>Forum Kartu Jakarta Mahasiswa Unggul</option>
                        <option>Forum Komunikasi Islam Al Hakim</option>
                        <option>
                            Forum Mahasiswa Bidikmisi dan Forum Komunikasi
                            Mahasiswa Penerima Kartu Jakarta Mahasiswa Unggul
                        </option>
                        <option>Forum Riset dan Debat Mahasiswa</option>
                        <option>Frame of Photography</option>
                        <option>Himpunan Mahasiswa Informatika S1</option>
                        <option>Himpunan Mahasiswa Sitem Informasi</option>
                        <option>Kelompok Studi Mahasiswa Android</option>
                        <option>
                            Kelompok Studi Mahasiswa "Cyber Security"
                        </option>
                        <option>Kelompok Studi Mahasiswa Multimedia</option>
                        <option>Kelompok Studi Mahasiswa Robotika</option>
                        <option>Senat Mahasiswa Fakultas Ilmu Komputer</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">
                        Nama Kegiatan<span className="text-red-600">*</span>
                    </label>
                    <input
                        type="text"
                        onChange={(e) => {
                            setData("activity_name", e.target.value);
                        }}
                        value={data.activity_name}
                        className="w-full border rounded-lg px-4"
                        placeholder="Contoh: Lomba Karya Tulis Ilmiah Nasional Tahun 2017"
                    />
                </div>

                <div className="flex gap-4">
                    <div className="flex flex-col w-full">
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">
                                Tingkat Prestasi
                                <span className="text-red-600">*</span>
                            </label>
                            <select
                                onChange={(e) => {
                                    setData("scope", e.target.value);
                                }}
                                value={data.scope}
                                className="w-full border rounded-lg px-4"
                            >
                                <option>-- Pilih Tingkat Prestasi --</option>
                                <option>International</option>
                                <option>Nasional</option>
                                <option>Regional</option>
                                <option>Wilayah</option>
                                <option>Daerah/Provinsi</option>
                                <option>Kabupaten/Kota</option>
                                <option>Kecamatan</option>
                                <option>UPN "Veteran" Jakarta</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">
                                Gelar<span className="text-red-600">*</span>
                            </label>
                            <select
                                onChange={(e) => {
                                    setData("degree", e.target.value);
                                }}
                                value={data.degree}
                                className="w-full border rounded-lg px-4"
                            >
                                <option>-- Pilih Gelar --</option>
                                <option>Juara Harapan I</option>
                                <option>Juara Harapan II</option>
                                <option>Juara Harapan III</option>
                                <option>Juara I</option>
                                <option>Juara II</option>
                                <option>Juara III</option>
                                <option>Medali Emas</option>
                                <option>Medali Perak</option>
                                <option>Medali Perunggu</option>
                                <option>Penerima Hibah</option>
                                <option>Terbaik</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-col w-full">
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">
                                Bidang Lomba<span className="text-red-600">*</span>
                            </label>
                            <select
                                onChange={(e) => {
                                    setData("field", e.target.value);
                                }}
                                value={data.field}
                                className="w-full border rounded-lg px-4"
                            >
                                <option>-- Pilih Bidang Lomba --</option>
                                <option>Ilmiah/Penalaran/Akademik</option>
                                <option>Minat Khusus</option>
                                <option>Olahraga</option>
                                <option>Sains</option>
                                <option>Lainnya</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">
                                Jenis Lomba
                                <span className="text-red-600">*</span>
                            </label>
                            <select
                                onChange={(e) => {
                                    setData("type", e.target.value);
                                }}
                                value={data.type}
                                className="w-full border rounded-lg px-4"
                            >
                                <option>-- Pilih Jenis Lomba --</option>
                                <option>UI/UX Design</option>
                                <option>Front-End Development</option>
                                <option>Back-End Development</option>
                                <option>Business Plan</option>
                                <option>Cybersecurity</option>
                                <option>Data Science & Machine Learning</option>
                                <option>Mobile App Development</option>
                                <option>Game Development</option>
                                <option>Internet of Things (IoT)</option>
                                <option>Hackathon</option>
                                <option>Software Engineering</option>
                                <option>Cloud Computing</option>
                                <option>Robotics and Automation</option>
                                <option>
                                    Augmented Reality (AR) / Virtual Reality
                                    (VR)
                                </option>
                                <option>Blockchain Development</option>
                                <option>Digital Marketing</option>
                                <option>Artificial Intelligence (AI)</option>
                                <option>Big Data Analytics</option>
                                <option>DevOps</option>
                                <option>Virtual Assistant Management</option>
                                <option>Web Development</option>
                                <option>Digital Animation</option>
                                <option>Full-Stack Development</option>
                                <option>Lainnya</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">
                        Dosen Pembimbing/Pendamping
                        <span className="text-red-600">*</span>
                    </label>
                    <SearchableSelect
                        onChange={handleDosen}
                        options={dosenOption}
                        placeholder={"- Pilih Dosen -"}
                    />
                    {/* <input
                                type="text"
                                onChange={(e) => {
                                    setData("mentor_name", e.target.value);
                                }}
                                value={data.mentor_name}
                                className="w-full border rounded-lg px-4"
                                placeholder="Tuliskan nama dosen pembimbing/pendamping..."
                            /> */}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">
                        Penyelenggara<span className="text-red-600">*</span>
                    </label>
                    <input
                        type="text"
                        onChange={(e) => {
                            setData("organizer", e.target.value);
                        }}
                        value={data.organizer}
                        className="w-full border rounded-lg px-4"
                        placeholder="Tuliskan penyelenggara kegiatan..."
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">
                        Negara Penyelenggara
                        <span className="text-red-600">*</span>
                    </label>
                    <SearchableSelect
                        onChange={handleCountry}
                        options={countryOption}
                        placeholder={"-- Pilih Negara Penyelenggara --"}
                    />
                    {/* <select
                        onChange={(e) => {
                            setData("host_country", e.target.value);
                        }}
                        value={data.host_country}
                        className="w-full border rounded-lg px-4"
                    >
                        <option>Pilih Negara Penyelenggara</option>
                        <option>Indonesia</option>
                        <option>Malaysia</option>
                    </select> */}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">
                        Tempat Pelaksanaan
                        <span className="text-red-600">*</span>
                    </label>
                    <input
                        type="text"
                        onChange={(e) => {
                            setData("location", e.target.value);
                        }}
                        value={data.location}
                        className="w-full border rounded-lg px-4"
                        placeholder="Tuliskan tempat pelaksanaan kegiatan..."
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">
                        Waktu Pelaksanaan Dimulai
                        <span className="text-red-600">*</span>
                    </label>
                    <input
                        onChange={(e) => {
                            setData("activity_date_start", e.target.value);
                        }}
                        value={data.activity_date_start}
                        type="date"
                        className="w-full border rounded-lg px-4"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">
                        Waktu Pelaksanaan Berakhir
                        <span className="text-red-600">*</span>
                    </label>
                    <input
                        onChange={(e) => {
                            setData("activity_date_end", e.target.value);
                        }}
                        value={data.activity_date_end}
                        type="date"
                        className="w-full border rounded-lg px-4"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">
                        Deskripsi Kegiatan
                        <span className="text-red-600">*</span>
                    </label>
                    <textarea
                        onChange={(e) => {
                            setData("description", e.target.value);
                        }}
                        value={data.description}
                        className="w-full border rounded-lg px-4"
                        placeholder="Tulis teks disini..."
                    ></textarea>
                </div>
            </section>
            <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">Bukti Dokumen</h2>

                {/* Upload Scan Bukti */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">
                        Scan Bukti<span className="text-red-600">*</span>
                    </label>
                    <div
                        className="border-dashed border-2 border-gray-300 rounded-lg p-4 text-center"
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={handleDropScanBuktiFile}
                    >
                        <div className="flex flex-col items-center justify-center">
                            <Upload className="text-gray-500 w-7 h-7 mb-2" />
                            <p>Click to upload or drag and drop</p>
                        </div>
                        <p className="text-gray-500">Max. file size: 2MB</p>
                        <input
                            type="file"
                            accept=".jpg,.jpeg,.png,.pdf"
                            className="hidden"
                            id="scanBuktiInput"
                            onChange={handleFileScanBuktiChange}
                        />
                        <label
                            htmlFor="scanBuktiInput"
                            className="mt-2 bg-green-500 text-white py-1 px-4 rounded-lg cursor-pointer inline-block"
                        >
                            Browse File
                        </label>
                        {scanBuktiFile && fileURL && (
                            <div className="mt-4 flex items-center justify-center">
                                <div>
                                    <a
                                        href={fileURL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <img
                                            src={fileURL}
                                            alt="Preview"
                                            className="mb-2 max-w-xs mx-auto cursor-pointer"
                                        />
                                    </a>
                                    <div className="flex items-center justify-center space-x-1 mb-2">
                                        <p className="text-green-500">
                                            {scanBuktiFile.name}
                                        </p>
                                        <button
                                            type="button"
                                            className="text-red-500 hover:text-red-700 ml-4"
                                            onClick={handleRemoveScanBuktiFile}
                                            aria-label="Remove file"
                                        >
                                            &times;
                                        </button>
                                    </div>
                                    {/* <a
                                        href={fileURL}
                                        download={selectedFile.name}
                                        className="bg-blue-500 text-white py-1 px-4 rounded-lg"
                                    >
                                        Download File
                                    </a> */}
                                </div>
                            </div>
                        )}
                    </div>
                    <p className="text-gray-500 mt-2">
                        Ketentuan file scan bukti yang diunggah:
                    </p>
                    <ul className="text-gray-500 list-disc list-inside">
                        <li>
                            Detail scan bukti berupa
                            Piagam/Sertifikat/Penghargaan atau Dokumen hasil
                            prestasi yang telah disahkan dengan stempel basah;
                        </li>
                        <li>
                            Berkas yang diunggah dalam format: .jpg,
                            .jpeg, .png, .pdf;
                        </li>
                        <li>Ukuran maksimal setiap file adalah 2MB.</li>
                    </ul>
                </div>

                {/* Upload Foto Kegiatan */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">
                        Foto Kegiatan<span className="text-red-600">*</span>
                    </label>
                    <div
                        className="border-dashed border-2 border-gray-300 rounded-lg p-4 text-center"
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={handleDropKegiatanFile}
                    >
                        <div className="flex flex-col items-center justify-center">
                            <Upload className="text-gray-500 w-7 h-7 mb-2" />
                            <p>Click to upload or drag and drop</p>
                        </div>
                        <p className="text-gray-500">Max. file size: 2MB</p>
                        <input
                            type="file"
                            accept=".jpg,.jpeg,.png"
                            className="hidden"
                            id="fotoKegiatanInput"
                            onChange={handleFileKegiatanChange}
                        />
                        <label
                            htmlFor="fotoKegiatanInput"
                            className="mt-2 bg-green-500 text-white py-1 px-4 rounded-lg cursor-pointer inline-block"
                        >
                            Browse File
                        </label>
                        {kegiatanFile && fileURL && (
                            <div className="mt-4 flex items-center justify-center">
                                <div>
                                    <a
                                        href={fileURL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <img
                                            src={fileURL}
                                            alt="Preview"
                                            className="mb-2 max-w-xs mx-auto cursor-pointer"
                                        />
                                    </a>
                                    <div className="flex items-center justify-center space-x-1 mb-2">
                                        <p className="text-green-500">
                                            {kegiatanFile.name}
                                        </p>
                                        <button
                                            type="button"
                                            className="text-red-500 hover:text-red-700 ml-4"
                                            onClick={handleRemoveKegiatanFile}
                                            aria-label="Remove file"
                                        >
                                            &times;
                                        </button>
                                    </div>
                                    {/* <a
                                        href={fileURL}
                                        download={selectedFile.name}
                                        className="bg-blue-500 text-white py-1 px-4 rounded-lg"
                                    >
                                        Download File
                                    </a> */}
                                </div>
                            </div>
                        )}
                    </div>
                    <p className="text-gray-500 mt-2">
                        Ketentuan file foto kegiatan yang diunggah:
                    </p>
                    <ul className="text-gray-500 list-disc list-inside">
                        <li>
                            Foto Kegiatan saat menerima
                            Piagam/Sertifikat/Penghargaan;
                        </li>
                        <li>
                            Berkas yang diunggah dalam format: .jpg, .jpeg,
                            .png;
                        </li>
                        <li>Ukuran maksimal setiap file adalah 2MB.</li>
                    </ul>
                </div>

                {/* Upload LPJ Kegiatan */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">
                        Laporan Pertanggung Jawaban (LPJ) Kegiatan
                        <span className="text-red-600">*</span>
                    </label>
                    <div
                        className="border-dashed border-2 border-gray-300 rounded-lg p-4 text-center"
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={handleDropLaporanFile}
                    >
                        <div className="flex flex-col items-center justify-center">
                            <Upload className="text-gray-500 w-7 h-7 mb-2" />
                            <p>Click to upload or drag and drop</p>
                        </div>
                        <p className="text-gray-500">Max. file size: 2MB</p>
                        <input
                            type="file"
                            accept=".pdf"
                            className="hidden"
                            id="laporanInput"
                            onChange={handleFileLaporanChange}
                        />
                        <label
                            htmlFor="laporanInput"
                            className="mt-2 bg-green-500 text-white py-1 px-4 rounded-lg cursor-pointer inline-block"
                        >
                            Browse File
                        </label>
                        {laporanFile && fileURL && (
                            <div className="mt-4 flex items-center justify-center">
                                <div>
                                    <a
                                        href={fileURL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <img
                                            src={fileURL}
                                            alt="Preview"
                                            className="mb-2 max-w-xs mx-auto cursor-pointer"
                                        />
                                    </a>
                                    <div className="flex items-center justify-center space-x-1 mb-2">
                                        <p className="text-green-500">
                                            {laporanFile.name}
                                        </p>
                                        <button
                                            type="button"
                                            className="text-red-500 hover:text-red-700 ml-4"
                                            onClick={handleRemoveLaporanFile}
                                            aria-label="Remove file"
                                        >
                                            &times;
                                        </button>
                                    </div>
                                    {/* <a
                                        href={fileURL}
                                        download={selectedFile.name}
                                        className="bg-blue-500 text-white py-1 px-4 rounded-lg"
                                    >
                                        Download File
                                    </a> */}
                                </div>
                            </div>
                        )}
                    </div>
                    <p className="text-gray-500 mt-2">
                        Ketentuan file LPJ kegiatan yang diunggah:
                    </p>
                    <ul className="text-gray-500 list-disc list-inside">
                        <li>
                            Silakan unduh format LPJ berikut{" "}
                            <a
                                href="https://docs.google.com/document/d/1_ZemBsFWiwQ7EWc6J5oI3FC_cDtwlKEA/edit?usp=sharing&ouid=102283645336565718024&rtpof=true&sd=true"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 underline"
                            >
                                unduh file LPJ di sini{" "}
                            </a>
                            dan contoh penyusunan LPJ{" "}
                            <a
                                href="https://drive.google.com/file/d/1gVZcW6n81Neiyqts_mEFYTSCDbwOqF-g/view?usp=sharing"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 underline"
                            >
                                lihat di sini;
                            </a>
                        </li>
                        <li>Berkas yang diunggah dalam format: .pdf;</li>
                        <li>Ukuran maksimal setiap file adalah 2MB.</li>
                    </ul>
                </div>
            </section>

            <PernyataanLegalitas
                isChecked={isChecked}
                onCheckboxChange={handleCheckboxChange}
            />
            <div className="flex justify-end w-full">
                <button
                    type="submit"
                    className={`mt-2 ${
                        processing || !isChecked
                            ? "bg-gray-400"
                            : "bg-orange-500"
                    } text-white py-1 px-4 rounded-lg`}
                    disabled={processing || !isChecked}
                >
                    {processing ? "Submitting..." : "Submit"}
                </button>
            </div>
        </form>
    );
};
