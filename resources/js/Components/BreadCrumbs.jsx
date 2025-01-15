const BreadCrumbs = ({ breadcrumbItems = [] }) => {
    // Set default breadcrumbItems jika tidak ada nilai yang diberikan
    const defaultItems = [
        { label: "Pusat Informasi", href: "#" },
        { label: "Lomba", href: "#" },
        { label: "Detail Informasi Lomba", href: "#" },
    ];

    const items = breadcrumbItems.length === 0 ? defaultItems : breadcrumbItems;

    return (
        <nav className="flex w-full" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
                {items.map((item, index) => (
                    <li key={index} className="flex items-center">
                        {/* Tampilkan ikon panah jika bukan elemen pertama */}
                        {index > 0 && (
                            <svg
                                className="w-6 h-6 text-gray-400 mx-2"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                        )}
                        {/* Link ke halaman */}
                        <a
                            href={item.href}
                            className={`text-sm font-medium ${
                                index === items.length - 1
                                    ? "text-gray-500"
                                    : "text-gray-700 hover:text-gray-900"
                            }`}
                            aria-current={
                                index === items.length - 1 ? "page" : undefined
                            }
                        >
                            {item.label}
                        </a>
                    </li>
                ))}
            </ol>
        </nav>
    );
};

export default BreadCrumbs;
