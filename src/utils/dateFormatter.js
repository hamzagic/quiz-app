const DateFormatter = (date) => {
    const pad = (num) => (num < 10 ? `0${num}` : num);
    const fullDate = new Date(date);
    const day = fullDate.getDate();
    const month = fullDate.getMonth() + 1;
    const year = fullDate.getFullYear();
    const hours = pad(fullDate.getHours());
    const minutes = pad(fullDate.getMinutes());
    const seconds = pad(fullDate.getSeconds());
    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return formattedDate;
}

export default DateFormatter;