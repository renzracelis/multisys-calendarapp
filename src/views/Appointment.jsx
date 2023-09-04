import Button from "../components/Button";
import Field from "../components/Field";
import Heading from "../components/Heading";
import useToggle from "../customHooks/useToggle";
import useAppointment from "../customHooks/useAppointment";
import Switcher from "../components/Switcher";
import useBack from "../customHooks/useBack";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import axiosClient from "../axiosClient";
import { useEffect, useRef } from "react";
import LoaderIcon from "../components/icons/Loader";
import dateFieldFormat from "../helper/dateFieldFormat"
import Close from "../components/icons/Close"
import useDeleteAppointmentMutation from "../customHooks/useDeleteAppointmentMutation";
import useUpdateAppointmentMutation from "../customHooks/useUpdateAppointmentMutation";
import usePatchStatusMutation from "../customHooks/usePatchStatusMutation";


export default function Appointment() {
    const { handleToggle } = useToggle()
    const { appointment, setAppointment, handleAppointment } = useAppointment()
    const handleBack = useBack()
    const modalRef = useRef()
    const { id } = useParams()
    const handleDelete = useDeleteAppointmentMutation(id)
    const handleUpdate = useUpdateAppointmentMutation()
    const handleStatus = usePatchStatusMutation()
    const { isLoading, error, data } = useQuery(
        ["appointments", id],
        () => axiosClient.get(`appointment/${id}`)
            .then(response => response.data)
    )

    const handleSubmit = (e) => {
        e.preventDefault();
        handleUpdate.mutate(appointment);
    };

    useEffect(() => {
        if (!isLoading && !error && data) {
            setAppointment(data)
        }
    }, [isLoading, data])


    const handleOpenDialog = () => modalRef.current.showModal()
    const handleCloseDialog = () => modalRef.current.close()

    return (
        <>
            <dialog data-modal ref={modalRef} className="max-w-xl w-full rounded-md">
                <div className="flex justify-between items-center py-8 px-5 border-b border-solid border-red-500">
                    <Heading h="3">Delete Confirmation</Heading>
                    <button onClick={handleCloseDialog}>
                        <Close className="fill-indigo-500 hover:fill-indigo-600" />
                    </button>
                </div>
                <div className="pt-8 px-5">
                    <p>Are you sure you want to delete the appointment?</p>
                </div>
                <div className="py-8 px-5 flex items-center justify-end gap-8">
                    <Button variant="link" click={handleCloseDialog}>Cancel</Button>
                    <Button variant="danger" click={() => handleDelete.mutate()}>Delete</Button>
                </div>
            </dialog>
            <div className="flex items-center justify-start gap-8 mb-8 flex-wrap">
                <Button click={handleBack} type="button">Back</Button>
                <Heading h="2">Appointment</Heading>
            </div>
            {
                (isLoading && error) && <div>Something went wrong!</div>
            }
            {
                isLoading && !error
                    ? <LoaderIcon />
                    : <form onSubmit={handleSubmit} action="#" method="post" className="w-full m-auto">
                        <Field
                            onChange={handleAppointment}
                            type="text"
                            label="Name"
                            name="name"
                            placeholder="Enter your appointment name"
                            value={appointment?.name} />
                        <Field
                            onChange={handleAppointment}
                            type="date"
                            label="Date"
                            name="date"
                            value={dateFieldFormat(appointment?.date)} />
                        <div>
                            <p className="block mb-1 text-gray-700 text-left">Status</p>
                            <Switcher enabled={appointment?.status === "completed"} handleSwitch={() => {
                                handleToggle(prevState => handleStatus.mutate({ id, status: prevState }))
                            }} />
                        </div>
                        <div className="mt-8 flex gap-8">
                            <Button type="submit">Update</Button>
                            <Button type="button" variant="danger" click={handleOpenDialog}>Delete</Button>
                        </div>
                    </form>
            }
        </>
    )
}