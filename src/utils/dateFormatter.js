const DateFormatter = (date) => {
    const fullDate = new Date(date);
    const day = fullDate.getDate();
    const month = fullDate.getMonth() + 1;
    const year = fullDate.getFullYear();
    const formattedDate = `${year}-${month}-${day} 00:00:00`;
    return formattedDate;
}

export default DateFormatter;