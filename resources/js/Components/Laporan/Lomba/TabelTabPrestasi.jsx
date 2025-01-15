import React, { useEffect, useRef, useState } from "react";
import { formatDate } from "@/lib/helper";
import { useDownloadExcel } from "react-export-table-to-excel";
import axios from "axios";

const TabelTabPrestasi = ({ dataPemenang, filters, refs }) => {
    const tableRef = useRef(null);

    const { onDownload } = useDownloadExcel({
        currentTableRef: tableRef.current,
        filename: "Pemenang Lomba Export",
        sheet: "Pemenang",
    });

    const [filtered, setFiltered] = useState(dataPemenang);

    useEffect(() => {
        let nama = filters.nama;
        let prodi = filters.prodi;
        let angkatan = filters.angkatan;
        let tahun = filters.tahun;
        let tingkat = filters.tingkat;

        let temp = dataPemenang;

        if (nama) {
            temp = temp.filter((item) =>
                item.mahasiswa.nama.toLowerCase().includes(nama.toLowerCase())
            );
        }

        if (prodi) {
            temp = temp.filter((item) =>
                item.mahasiswa.prodi.nama_prodi
                    .toLowerCase()
                    .includes(prodi.toLowerCase())
            );
        }

        if (angkatan) {
            temp = temp.filter((item) => item.mahasiswa.angkatan == angkatan);
        }

        if (tahun) {
            temp = temp.filter((item) => item.created_at.includes(tahun));
        }

        if (tingkat) {
            temp = temp.filter((item) =>
                item.competition_achievement.scope
                    .toLowerCase()
                    .includes(tingkat.toLowerCase())
            );
        }

        setFiltered(temp);

        if (refs) {
            onDownload();
        }
    }, [filters, refs]);

    const handleValidate = (item) => {
        axios
            .get(route("laporanLomba.validate", item))
            .then((response) => {
                alert('Berhasil Validasi');
                window.location.reload();
            })
    };

    return (
        <div>
            <table
                ref={tableRef}
                className="min-w-full divide-y divide-gray-200"
            >
                <thead>
                    <tr>
                        <th className="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            No
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Nama Kegiatan
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Partisipan
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            NIM
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Program Studi
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Angkatan
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Predikat Kemenangan
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Delegasi Ormawa
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Tingkat Prestasi
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Bidang
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Dosen Pembimbing/Pendamping
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Penyelenggara
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Negara Penyelenggara
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Tempat Pelaksanaan
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Waktu Pelaksanaan
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Deskripsi Kegiatan
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Scan Bukti
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Foto Kegiatan
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Laporan Kegiatan
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Validasi
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {filtered.map((item, index) => (
                        <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                {index + 1}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                {item.competition_achievement.activity_name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                {item.mahasiswa.nama}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                {item.mahasiswa.nim}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                {item.mahasiswa.prodi.nama_prodi}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                {item.mahasiswa.angkatan}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                {item.is_group ? "Regu" : "Individu"}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                {item.competition_achievement.degree}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                {item.competition_achievement.ormawa_delegation}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                {item.competition_achievement.scope}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                {item.competition_achievement.field}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                {item.competition_achievement.dosen.nama}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                {item.competition_achievement.organizer}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                {
                                    item.competition_achievement.country
                                        .country_name
                                }
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                {item.competition_achievement.location}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                {formatDate(
                                    item.competition_achievement
                                        .activity_date_start
                                )}{" "}
                                -{" "}
                                {formatDate(
                                    item.competition_achievement
                                        .activity_date_end
                                )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                {item.competition_achievement.description}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                <a
                                    className="text-blue-600 underline"
                                    href={`${window.location.origin}/images/${item.competition_achievement.proof_scan_url}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Lihat File
                                </a>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                <a
                                    className="text-blue-600 underline"
                                    href={`${window.location.origin}/images/${item.competition_achievement.event_photo_url}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Lihat File
                                </a>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                <a
                                    className="text-blue-600 underline"
                                    href={`${window.location.origin}/images/${item.competition_achievement.report_url}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Lihat File
                                </a>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                {
                                    item.competition_achievement.is_validated == true ? 
                                    'Sudah Valid' : 
                                    <button className="bg-blue-500 text-sm text-white px-2 py-1 rounded" onClick={() => handleValidate(item.competition_achievement.id)}>Validasi</button>
                                }
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TabelTabPrestasi;
