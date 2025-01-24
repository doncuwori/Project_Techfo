import React, { useEffect, useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import NavbarAdmin from "@/Components/NavbarAdmin";
import { CheckCircleIcon, EyeIcon, FilePenLine, Trash } from "lucide-react";
import { Toaster, toast } from "react-hot-toast";
import DangerButton from "@/Components/DangerButton";

const ManajemenUser = ({ user, data }) => {
    const { flash } = usePage().props;

    useEffect(() => {
        toast.dismiss();
        if (flash.success) {
            toast.success(flash.success);
        } else if (flash.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    // const [currentPage, setCurrentPage] = useState(1);
    // const [rowsPerPage, setRowsPerPage] = useState(10);
    // const totalPages = Math.ceil(data.length / rowsPerPage);

    // const paginatedData = data.slice(
    //     (currentPage - 1) * rowsPerPage,
    //     currentPage * rowsPerPage
    // );

    // const handlePageChange = (page) => {
    //     if (page >= 1 && page <= totalPages) {
    //         setCurrentPage(page);
    //     }
    // };

    // const handleRowsPerPageChange = (e) => {
    //     setRowsPerPage(Number(e.target.value));
    //     setCurrentPage(1);
    // };

    return (
        <div>
            <Toaster position="top-right" reverseOrder={false} />
            <NavbarAdmin user={user} />
            <main className="pl-72 w-full z-0">
                <div className="container px-4 py-8 w-full">
                    <h1 class="text-3xl font-bold text-black mt-16 mb-4">
                        Manajemen User
                    </h1>
                    <div className="bg-white p-6 rounded shadow-lg">
                        <table className="w-full border-collapse text-sm">
                            <thead>
                                <tr className="bg-gray-100 text-left text-gray-700 text-center">
                                    <th className="border p-2">NO</th>
                                    <th className="border p-2">NAMA</th>
                                    <th className="border p-2">USERNAME</th>
                                    <th className="border p-2">ROLE / AKSES</th>
                                    <th className="border p-2">AKSI</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* {paginatedData.map((item, index) => ( */}
                                <tr
                                    // key={index}
                                    className="border-t hover:bg-gray-50"
                                >
                                    <td className="border p-2">
                                        {/* {(currentPage - 1) * rowsPerPage +
                                                index +
                                                1} */}
                                        1
                                    </td>
                                    <td className="border p-2">
                                        Erly Krisnanik
                                    </td>
                                    <td className="border p-2">0308097401</td>
                                    <td className="border p-2">
                                        Wakil Dekan 1
                                    </td>
                                    <td className="border p-2 text-center align-middle">
                                        <DangerButton
                                            onClick={(e) =>
                                                toggleRejectProposalModal(
                                                    item.id
                                                )
                                            }
                                        >
                                            Ganti
                                        </DangerButton>
                                    </td>
                                </tr>
                                {/* ))} */}
                            </tbody>
                        </table>

                        {/* Pagination controls
                        <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center">
                                <label className="mr-2 text-gray-500">
                                    Rows per page:
                                </label>
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
                                    onClick={() =>
                                        handlePageChange(currentPage - 1)
                                    }
                                    disabled={currentPage === 1}
                                >
                                    Prev
                                </button>
                                <div className="flex space-x-2">
                                    {[...Array(totalPages).keys()].map(
                                        (page) => {
                                            const pageNumber = page + 1;
                                            if (
                                                pageNumber === 1 ||
                                                pageNumber === totalPages ||
                                                (pageNumber >=
                                                    currentPage - 2 &&
                                                    pageNumber <=
                                                        currentPage + 2)
                                            ) {
                                                return (
                                                    <button
                                                        key={pageNumber}
                                                        className={`px-3 py-1 rounded-md ${
                                                            pageNumber ===
                                                            currentPage
                                                                ? "bg-blue-500 text-white"
                                                                : "bg-gray-200 text-gray-700 hover:bg-blue-100"
                                                        }`}
                                                        onClick={() =>
                                                            handlePageChange(
                                                                pageNumber
                                                            )
                                                        }
                                                    >
                                                        {pageNumber}
                                                    </button>
                                                );
                                            } else if (
                                                pageNumber ===
                                                    currentPage - 3 ||
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
                                        }
                                    )}
                                </div>
                                <button
                                    className="px-4 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:bg-gray-300 disabled:text-gray-500"
                                    onClick={() =>
                                        handlePageChange(currentPage + 1)
                                    }
                                    disabled={currentPage === totalPages}
                                >
                                    Next
                                </button>
                            </div>
                            <p className="text-gray-500 mt-2">
                                Total {(currentPage - 1) * rowsPerPage + 1} -{" "}
                                {Math.min(
                                    currentPage * rowsPerPage,
                                    data.length
                                )}{" "}
                                of {data.length}
                            </p>
                        </div> */}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ManajemenUser;
