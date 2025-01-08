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
    
    const day = date.getUTCDate(); // Get day of the month
    const month = months[date.getUTCMonth()]; // Get month name
    const year = date.getUTCFullYear(); // Get year

    const hours = String(date.getUTCHours()).padStart(2, '0'); // Format hours
    const minutes = String(date.getUTCMinutes()).padStart(2, '0'); // Format minutes

    return `${day} ${month} ${year}, ${hours}:${minutes} WIB`;
}

export const getFiveYears = () => {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 5 }, (_, index) => currentYear - index);
    return years;
}
