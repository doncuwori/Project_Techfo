import { useForm, usePage } from "@inertiajs/react";
import { Minus, Plus, Trash, Upload } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import SearchableSelect from "@/Components/SearchableSelect";
import PernyataanLegalitas from "@/Components/PernyataanLegalitas";

export const TabPartisipasiLomba = ({ mahasiswa, dosen, country }) => {
    const [member, setMember] = useState([]);
    const { data, setData, post, processing, errors, reset } = useForm({
        id_country: "",
        id_dosen: "",
        ormawa_delegation: "",
        mentor_name: "",
        activity_name: "",
        field: "",
        organizer: "",
        scope: "",
        location: "",
        activity_date_start: "",
        activity_date_end: "",
        description: "",
        poster_url: "",
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

    const [selectedFile, setSelectedFile] = useState(null);
    const [isChecked, setIsChecked] = useState(false);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setData("poster_url", file);
        setSelectedFile(file);
    };

    const handleDropFile = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];

        if (
            file &&
            file.size <= 1 * 1024 * 1024 &&
            /\.(jpg|jpeg|png)$/i.test(file.name)
        ) {
            setData("poster_url", file);
            setSelectedFile(file);
        } else {
            toast.error("File tidak valid atau melebihi ukuran maksimal 1MB.");
        }
    };

    const handleRemoveFile = () => {
        setSelectedFile(null);
        // Clear the file input field
        setData("poster_url", null);
        document.getElementById("fileInput").value = null;
    };

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route("competitions.store"), {
            onSuccess: (res) => {
                reset();
                toast.success("Pendataan Partisipasi Lomba Berhasil Dibuat!");
            },
            onError: (errors) => {
                toast.error("Pendataan Partisipasi Lomba Gagal Dibuat!");
                console.error(errors);
            },
        });
    };

    const handleMember = (value) => {
        const input = document.querySelectorAll('input[name="members[]"]');
        const member = Array.from(input).map((input) => input.value);
        setData("members", [...member, value.value]);
    };

    const handleCountry = (value) => {
        setData("id_country", value.value);
    };

    const handleDosen = (value) => {
        setData("id_dosen", value.value);
    };

    return (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">
                    Data Partisipasi Mahasiswa
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
                                        className="text-md px-4 py-2 rounded-lg border-neutral-400 border-[1.5px] bg-gray-200 md:w-96"
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
                    </div>
                    <div className="flex flex-col w-full">
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">
                                Bidang<span className="text-red-600">*</span>
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
                <h2 className="text-xl font-bold mb-4">Dokumen Pendukung</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">
                        Poster Kegiatan<span className="text-red-600">*</span>
                    </label>
                    <div
                        className="border-dashed border-2 border-gray-300 rounded-lg p-4 text-center"
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={handleDropFile}
                    >
                        <div className="flex flex-col items-center justify-center">
                            <Upload className="text-gray-500 w-7 h-7 mb-2" />
                            <p>Click to upload or drag and drop</p>
                        </div>
                        <p className="text-gray-500">Max. file size: 1MB</p>
                        <input
                            type="file"
                            accept=".jpg,.jpeg,.png"
                            className="hidden"
                            id="fileInput"
                            onChange={handleFileChange}
                        />
                        <label
                            htmlFor="fileInput"
                            className="mt-2 bg-green-500 text-white py-1 px-4 rounded-lg cursor-pointer inline-block"
                        >
                            Browse File
                        </label>
                        {selectedFile && (
                            <div className="mt-4 flex items-center justify-center">
                                <p className="text-green-500 mr-2">
                                    {selectedFile.name}
                                </p>
                                <button
                                    type="button"
                                    className="text-red-500 hover:text-red-700"
                                    onClick={handleRemoveFile}
                                    aria-label="Remove file"
                                >
                                    &times;
                                </button>
                            </div>
                        )}
                    </div>
                    <p className="text-gray-500 mt-2">
                        Ketentuan file poster kegiatan yang diunggah:
                    </p>
                    <ul className="text-gray-500 list-disc list-inside">
                        <li>
                            Poster kegiatan lomba yang diikuti, menunjukkan nama
                            lomba;
                        </li>
                        <li>
                            Berkas yang diunggah dalam format: .jpg, .jpeg,
                            .png;
                        </li>
                        <li>Ukuran file maksimal 1MB.</li>
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
