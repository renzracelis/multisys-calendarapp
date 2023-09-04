import { useMutation, useQueryClient } from "react-query"
import axiosClient from "../axiosClient"
import { useNavigate } from "react-router-dom"

export default function useDeleteAppointmentMutation(id) {
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    return useMutation({
        mutationFn: () => axiosClient.delete(`appointment/${id}`),
        onSuccess: () => navigate(`/`),
        onSettled: () => queryClient.invalidateQueries("appointments")
    })
}