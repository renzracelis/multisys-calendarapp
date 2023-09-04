import Button from "../components/Button";
import Field from "../components/Field";
import Heading from "../components/Heading";
import useToggle from "../customHooks/useToggle";
import Switcher from "../components/Switcher";
import useBack from "../customHooks/useBack";
import useAppointment from "../customHooks/useAppointment";
import dateFieldFormat from "../helper/dateFieldFormat";
import { useEffect } from "react";
import { useMutation, useQueryClient } from "react-query";
import axiosClient from "../axiosClient";
import { useNavigate } from "react-router-dom";

export default function CreateAppointment() {
    const { toggle, handleToggle } = useToggle(false)
    const { appointment, setAppointment, handleAppointment } = useAppointment()
    const handleBack = useBack()
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    const mutation = useMutation({
        mutationKey: ['appointment', 'create'],
        mutationFn: () => axiosClient.post("appointment", appointment).then(response => response.data),
        onSuccess: ({ id }) => navigate(`/appointments/${id}`),
        onSettled: () => queryClient.invalidateQueries("appointments") // This will update the appointment lists
    })

    const handleSubmit = e => {
        e.preventDefault()
        mutation.mutate()
    }

    useEffect(() => {
        setAppointment(prevState => {
            prevState.status = toggle ? 'completed' : 'pending'
            return { ...prevState }
        })
    }, [toggle])

    return (
        <>
            <div className="flex items-center justify-start gap-8 mb-8 flex-wrap">
                <Button type="button" click={handleBack}>Back</Button>
                <Heading h="2">Create Appointment</Heading>
            </div>
            <form onSubmit={handleSubmit} action="#" method="post" className="w-full m-auto">
                <Field
                    onChange={handleAppointment}
                    type="text"
                    label="Name"
                    name="name"
                    placeholder="Enter your appointment name"
                    value={appointment.name} />
                <Field
                    onChange={handleAppointment}
                    type="date"
                    label="Date"
                    name="date"
                    value={dateFieldFormat(appointment.date)} />
                <div>
                    <p className="block mb-1 text-gray-700 text-left">Status</p>
                    <Switcher enabled={toggle} handleSwitch={handleToggle} />
                </div>
                <div className="mt-8 flex gap-8">
                    <Button type="submit">Create</Button>
                </div>
            </form>
        </>
    )
}