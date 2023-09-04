const toDateString = (date) => {
    const [_month, _date, _year] = new Date(date).toDateString().split(' ').splice(1, 3)
    return `${_month}. ${_date}, ${_year}`
}

export default toDateString