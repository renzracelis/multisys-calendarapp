const dateFieldFormat = (date) => {
    if(date === undefined) return
    return new Date(date).toISOString().split('T')[0]
}

export default dateFieldFormat