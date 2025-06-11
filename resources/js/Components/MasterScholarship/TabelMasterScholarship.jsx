import React, { useState } from "react";
import { CheckCircleIcon, EyeIcon, FilePenLine } from "lucide-react";
import { Trash } from "lucide-react";
import { formatDate, formatDatetimeToIndonesian } from "@/lib/helper";
import { useForm, usePage } from "@inertiajs/react";
import PrimaryButton from "../PrimaryButton";
import DangerButton from "../DangerButton";

const TabelMasterScholarship = ({ data }) => {
    const { user } = usePage().props;
    const { post } = useForm();

    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const totalPages = Math.ceil(data.length / rowsPerPage);

    const paginatedData = data.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleRowsPerPageChange = (e) => {
        setRowsPerPage(Number(e.target.value));
        setCurrentPage(1);
    };

    return (
        <>
            <table className="w-full border-collapse text-sm">
                <thead>
                    <tr className="bg-gray-100 text-left text-gray-700 text-center">
                        <th className="border p-2">NO</th>
                        <th className="border p-2">JENIS BEASISWA</th>
                        <th className="border p-2">AKSI</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedData.map((item, index) => (
                        <tr key={index} className="border-t hover:bg-gray-50">
                            <td className="border p-2">
                                {(currentPage - 1) * rowsPerPage + index + 1}
                            </td>
                            <td className="border p-2">{item.name}</td>
                            <td className="border p-2">
                                <div className="flex justify-center space-x-2 gap-8 ml-2">
                                    <button className="text-blue-500 hover:text-blue-600 transition">
                                        <a
                                            href={route(
                                                "master-scholarship.edit",
                                                item.id
                                            )}
                                        >
                                            <FilePenLine />
                                        </a>
                                    </button>
                                    <button className="text-red-500 hover:text-red-600 transition">
                                        <a
                                            href={route(
                                                "master-scholarship.delete",
                                                item.id
                                            )}
                                        >
                                            <Trash />
                                        </a>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination controls */}
            <div className="flex items-center justify-between mt-4">
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
                            <option value={100}>100</option>
                            <option value={data.length}>All</option>
                        </select>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
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
                <p className="text-gray-500 mt-2">
                    Total {(currentPage - 1) * rowsPerPage + 1} -{" "}
                    {Math.min(currentPage * rowsPerPage, data.length)} of{" "}
                    {data.length}
                </p>
            </div>
        </>
    );
};

export default TabelMasterScholarship;
