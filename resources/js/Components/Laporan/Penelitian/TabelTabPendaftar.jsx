import React, { useEffect, useRef, useState } from "react";
import { useDownloadExcel } from "react-export-table-to-excel";

const TabelTabPendaftar = ({ data, filters, refs }) => {
    const tableRef = useRef(null);

    const { onDownload } = useDownloadExcel({
        currentTableRef: tableRef.current,
        filename: "Pendaftar Penelitian Export",
        sheet: "Pendaftar",
    });

    const [filtered, setFiltered] = useState(data);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
        let nama = filters.nama;
        let funding = filters.funding;
        let prodi = filters.prodi;
        let angkatan = filters.angkatan;
        let tahun = filters.tahun;

        let temp = data;
        if (nama) {
            temp = temp.filter((item) =>
                item.mahasiswa.nama.toLowerCase().includes(nama.toLowerCase())
            );
        }

        if (funding) {
            temp = temp.filter((item) =>
                item.research_registrant.research_information.funding
                    .toLowerCase()
                    .includes(funding.toLowerCase())
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

        setFiltered(temp);

        if (refs) {
            onDownload();
        }
    }, [filters, refs]);

    const totalPages = Math.ceil(filtered.length / rowsPerPage);
    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const paginatedData = filtered.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    const handleRowsPerPageChange = (e) => {
        setRowsPerPage(Number(e.target.value));
        setCurrentPage(1);
    };

    return (
        <div>
            <div className="overflow-x-auto">
                <table
                    ref={tableRef}
                    class="min-w-full divide-y divide-gray-200 "
                >
                    <thead>
                        <tr>
                            <th class="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                No
                            </th>
                            <th class="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Nama Kegiatan
                            </th>
                            <th class="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Lokasi
                            </th>
                            <th class="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Pendanaan
                            </th>
                            <th class="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                NIM
                            </th>
                            <th class="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Nama
                            </th>
                            <th class="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Program Studi
                            </th>
                            <th class="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Angkatan
                            </th>
                            <th class="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Email
                            </th>
                            <th class="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Nomor Telepon/WA
                            </th>
                            <th class="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                KHS
                            </th>
                            <th class="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                CV
                            </th>
                            <th class="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Portofolio
                            </th>
                            <th class="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Foto 3x4
                            </th>
                            <th class="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Surat Pernyataan
                            </th>
                            <th class="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Daftar Dosen
                            </th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                        {paginatedData.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td class="px-6 py-4 whitespace-nowrap text-center">
                                        {(currentPage - 1) * rowsPerPage +
                                            index +
                                            1}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-center">
                                        {
                                            item.research_registrant
                                                .research_information.name
                                        }
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-center">
                                        {
                                            item.research_registrant
                                                .research_information.location
                                        }
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-center">
                                        {
                                            item.research_registrant
                                                .research_information.funding
                                        }
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-center">
                                        {item.mahasiswa.nim}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-center">
                                        {item.mahasiswa.nama}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-center">
                                        {" "}
                                        {item.mahasiswa.prodi.nama_prodi}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-center">
                                        {item.mahasiswa.angkatan}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-center">
                                        {item.mahasiswa.email}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-center">
                                        {item.research_registrant.telephone}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-center">
                                        <a
                                            className="underline text-blue-500"
                                            target="_blank"
                                            href={
                                                "/images/" +
                                                item.research_registrant.khs
                                            }
                                        >
                                            Lihat File
                                        </a>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-center">
                                        <a
                                            className="underline text-blue-500"
                                            target="_blank"
                                            href={
                                                "/images/" +
                                                item.research_registrant.cv
                                            }
                                        >
                                            Lihat File
                                        </a>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-center">
                                        <a
                                            className="underline text-blue-500"
                                            target="_blank"
                                            href={
                                                "/images/" +
                                                item.research_registrant
                                                    .portofolio
                                            }
                                        >
                                            Lihat File
                                        </a>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-center">
                                        <a
                                            className="underline text-blue-500"
                                            target="_blank"
                                            href={
                                                "/images/" +
                                                item.research_registrant.foto
                                            }
                                        >
                                            Lihat File
                                        </a>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-center">
                                        <a
                                            className="underline text-blue-500"
                                            target="_blank"
                                            href={
                                                "/images/" +
                                                item.research_registrant
                                                    .surat_pernyataan
                                            }
                                        >
                                            Lihat File
                                        </a>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-center">
                                        {item.research_registrant.research_information.dosen.map(
                                            (item, index) => {
                                                return (
                                                    <div
                                                        className="text-left"
                                                        key={index}
                                                    >
                                                        {item.nama}
                                                    </div>
                                                );
                                            }
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-between items-center mt-4">
                <div className="flex items-center">
                    <label className="mr-2 text-gray-500">Rows per page:</label>
                    <div className="relative">
                        <select
                            value={rowsPerPage}
                            onChange={handleRowsPerPageChange}
                            className="px-4 py-0.5 border rounded-md pr-8"
                        >
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={50}>50</option>
                            <option value={filtered.length}>All</option>
                        </select>
                    </div>
                </div>
                <div className="flex items-center space-x-4 mt-4">
                    <button
                        className="px-4 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:bg-gray-300 disabled:text-gray-500"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Prev
                    </button>
                    <div className="flex space-x-2">
                        {[...Array(totalPages).keys()].map((page) => {
                            const pageNumber = page + 1;
                            if (
                                pageNumber === 1 ||
                                pageNumber === totalPages ||
                                (pageNumber >= currentPage - 2 &&
                                    pageNumber <= currentPage + 2)
                            ) {
                                return (
                                    <button
                                        key={pageNumber}
                                        className={`px-3 py-1 rounded-md ${
                                            pageNumber === currentPage
                                                ? "bg-blue-500 text-white"
                                                : "bg-gray-200 text-gray-700 hover:bg-blue-100"
                                        }`}
                                        onClick={() =>
                                            handlePageChange(pageNumber)
                                        }
                                    >
                                        {pageNumber}
                                    </button>
                                );
                            } else if (
                                pageNumber === currentPage - 3 ||
                                pageNumber === currentPage + 3
                            ) {
                                return (
                                    <span
                                        key={pageNumber}
                                        className="text-gray-500"
                                    >
                                        ...
                                    </span>
                                );
                            }
                            return null;
                        })}
                    </div>
                    <button
                        className="px-4 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:bg-gray-300 disabled:text-gray-500"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
                <p className="text-gray-500">
                    Total {(currentPage - 1) * rowsPerPage + 1} -{" "}
                    {Math.min(currentPage * rowsPerPage, filtered.length)} of{" "}
                    {filtered.length}
                </p>
            </div>
        </div>
    );
};

export default TabelTabPendaftar;
