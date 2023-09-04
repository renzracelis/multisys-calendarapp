import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import axiosClient from "../axiosClient";

export default function useUpdateAppointmentMutation() {
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    return useMutation(
        async (data) => await axiosClient.put(`appointment/${data.id}`, { ...data }),
        {
            onSuccess: () => navigate(`/`),
            onSettled: () => queryClient.invalidateQueries('appointments'),
        }
    );
}