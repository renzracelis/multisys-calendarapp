import { useState } from "react"
import dateFieldFormat from "../helper/dateFieldFormat"

export default function useAppointment() {
    const [appointment, setAppointment] = useState({
        'name': '',
        'date': dateFieldFormat(new Date()),
        'status': 'pending'
    })

    const handleAppointment = (e) => {
        setAppointment(prevState => {
            prevState[e.target.name] = e.target.value
            return { ...prevState }
        })
    }

    return { appointment, setAppointment, handleAppointment }
}