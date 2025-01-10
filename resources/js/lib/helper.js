export const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: '2-digit' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', options);
};

export const formatDatetimeToIndonesian = (datetime) => {
    const months = [
        "Januari", "Februari", "Maret", "April", "Mei", "Juni",
        "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];

    const date = new Date(datetime);

    // Ambil data lokal
    const day = date.getDate(); // Hari dalam bulan
    const month = months[date.getMonth()]; // Nama bulan
    const year = date.getFullYear(); // Tahun

    const hours = String(date.getHours()).padStart(2, '0'); // Format jam lokal
    const minutes = String(date.getMinutes()).padStart(2, '0'); // Format menit lokal

    // Format string tanggal dan waktu Indonesia
    return `${day} ${month} ${year}, ${hours}:${minutes} WIB`;
}

export const getFiveYears = () => {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 5 }, (_, index) => currentYear - index);
    return years;
}
