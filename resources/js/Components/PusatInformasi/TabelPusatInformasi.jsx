import React, { useState } from "react";
import { CheckCircleIcon, EyeIcon, FilePenLine } from "lucide-react";
import { Trash } from "lucide-react";
import { formatDate, formatDatetimeToIndonesian } from "@/lib/helper";
import { useForm, usePage } from "@inertiajs/react";
import PrimaryButton from "../PrimaryButton";
import DangerButton from "../DangerButton";

const TabelPusatInformasi = ({ data, title }) => {
    const { user } = usePage().props;
    const [rejectProposalModal, setRejectProposalModal] = useState(null);
    const { post } = useForm();

    const toggleRejectProposalModal = (id) => {
        setRejectProposalModal(id ?? null);
    };

    const handleRejectProposal = (proposalId) => {
        let routePage =
            title == "abdimas"
                ? route("pusatAbdimas.rejectProposal", proposalId)
                : route("pusatPenelitian.rejectProposal", proposalId);

        post(routePage, {
            onSuccess: () => {
                toggleRejectProposalModal(null);
            },
        });
    };

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
                        <th className="border p-2">
                            {title === "abdimas"
                                ? "NAMA ABDIMAS"
                                : title === "penelitian"
                                ? "NAMA PENELITIAN"
                                : title === "lomba"
                                ? "NAMA LOMBA"
                                : title === "beasiswa"
                                ? "NAMA BEASISWA"
                                : ""}
                        </th>
                        <th className="border p-2">PENGUNGGAH</th>
                        <th className="border p-2">HARI & TANGGAL UPLOAD</th>
                        <th className="border p-2">DEADLINE KEGIATAN</th>
                        <th className="border p-2">AKSI</th>
                        {(title == "abdimas" || title == "penelitian") &&
                        user.role == "admin" ? (
                            <th className="border p-2">PROPOSAL DITOLAK</th>
                        ) : (
                            ""
                        )}
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
                                {item.user.mahasiswa
                                    ? item.user.mahasiswa.mahasiswa_access
                                          .instansi
                                    : item.user.name}
                            </td>
                            <td className="border p-2">
                                {formatDatetimeToIndonesian(item.created_at)}
                            </td>
                            <td className="border p-2">
                                {formatDatetimeToIndonesian(
                                    item.event_time_end
                                )}
                            </td>
                            <td className="border p-2">
                                <div className="flex justify-center space-x-2 gap-8 ml-2">
                                    {title == "abdimas" ||
                                    title == "penelitian" ? (
                                        title == "abdimas" ? (
                                            <a
                                                href={route(
                                                    "pusatAbdimas.show",
                                                    item.id
                                                )}
                                            >
                                                <EyeIcon />
                                            </a>
                                        ) : (
                                            <a
                                                href={route(
                                                    "pusatPenelitian.show",
                                                    item.id
                                                )}
                                            >
                                                <EyeIcon />
                                            </a>
                                        )
                                    ) : (
                                        ""
                                    )}
                                    {(title == "lomba" ||
                                        title == "beasiswa") &&
                                    (user?.role == "admin" ||
                                        user?.role == "dosen") &&
                                    !item.is_valid ? (
                                        <button className="text-green-500 hover:text-blue-600 transition">
                                            {title == "lomba" ? (
                                                <a
                                                    href={route(
                                                        "lombaValidate",
                                                        item.id
                                                    )}
                                                >
                                                    <CheckCircleIcon />
                                                </a>
                                            ) : title == "beasiswa" ? (
                                                <a
                                                    href={route(
                                                        "beasiswaValidate",
                                                        item.id
                                                    )}
                                                >
                                                    <CheckCircleIcon />
                                                </a>
                                            ) : (
                                                ""
                                            )}
                                        </button>
                                    ) : (
                                        ""
                                    )}

                                    <button className="text-blue-500 hover:text-blue-600 transition">
                                        {title == "abdimas" ? (
                                            <a
                                                href={route(
                                                    "editInfoAbdimas",
                                                    item.id
                                                )}
                                            >
                                                <FilePenLine />
                                            </a>
                                        ) : title == "penelitian" ? (
                                            <a
                                                href={route(
                                                    "editInfoPenelitian",
                                                    item.id
                                                )}
                                            >
                                                <FilePenLine />
                                            </a>
                                        ) : title == "lomba" ? (
                                            <a
                                                href={route(
                                                    "editInfoLomba",
                                                    item.id
                                                )}
                                            >
                                                <FilePenLine />
                                            </a>
                                        ) : title == "beasiswa" ? (
                                            <a
                                                href={route(
                                                    "editInfoBeasiswa",
                                                    item.id
                                                )}
                                            >
                                                <FilePenLine />
                                            </a>
                                        ) : (
                                            ""
                                        )}
                                    </button>
                                    <button className="text-red-500 hover:text-red-600 transition">
                                        {title == "abdimas" ? (
                                            <a
                                                href={route(
                                                    "hapusInfoAbdimas",
                                                    item.id
                                                )}
                                            >
                                                <Trash />
                                            </a>
                                        ) : title == "penelitian" ? (
                                            <a
                                                href={route(
                                                    "hapusInfoPenelitian",
                                                    item.id
                                                )}
                                            >
                                                <Trash />
                                            </a>
                                        ) : title == "lomba" ? (
                                            <a
                                                href={route(
                                                    "hapusInfoLomba",
                                                    item.id
                                                )}
                                            >
                                                <Trash />
                                            </a>
                                        ) : title == "beasiswa" ? (
                                            <a
                                                href={route(
                                                    "hapusInfoBeasiswa",
                                                    item.id
                                                )}
                                            >
                                                <Trash />
                                            </a>
                                        ) : (
                                            ""
                                        )}
                                    </button>
                                </div>
                            </td>
                            {(title == "abdimas" || title == "penelitian") &&
                            user.role == "admin" &&
                            item.closed ? (
                                item.proposal_rejected ? (
                                    <td className="border p-2 text-red-500 font-bold text-center">
                                        Ditolak
                                    </td>
                                ) : (
                                    <td className="border p-2 text-center align-middle">
                                        <DangerButton
                                            onClick={(e) =>
                                                toggleRejectProposalModal(
                                                    item.id
                                                )
                                            }
                                        >
                                            Proposal Tertolak
                                        </DangerButton>
                                    </td>
                                )
                            ) : title !== "lomba" && title !== "beasiswa" ? (
                                <td className="border p-2 text-center align-middle">
                                    -
                                </td>
                            ) : null}
                        </tr>
                    ))}
                </tbody>
                {rejectProposalModal != null && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
                            <h2 className="text-lg font-semibold text-gray-800">
                                Konfirmasi Penolakan
                            </h2>
                            <p className="mt-2 text-gray-600">
                                Apakah Anda yakin ingin menolak proposal ini?
                            </p>
                            <div className="mt-4 flex justify-end gap-4">
                                <button
                                    type="button"
                                    onClick={(e) =>
                                        toggleRejectProposalModal(null)
                                    }
                                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                                >
                                    Batal
                                </button>
                                <button
                                    type="button"
                                    onClick={(e) =>
                                        handleRejectProposal(
                                            rejectProposalModal
                                        )
                                    }
                                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                                >
                                    Tolak
                                </button>
                            </div>
                        </div>
                    </div>
                )}
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

export default TabelPusatInformasi;
