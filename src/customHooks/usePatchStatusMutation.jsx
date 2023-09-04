import { useMutation, useQueryClient } from "react-query"
import axiosClient from "../axiosClient"

export default function usePatchStatusMutation(id) {
    const queryClient = useQueryClient()
    return useMutation(
        async ({ id, status }) => {
            return await axiosClient.patch(`appointment/${id}`, { status: status ? 'completed' : 'pending' })
                .then(response => response.data)
        },
        {
            onSettled: (response) => {
                queryClient.invalidateQueries({
                    queryKey: ["appointments", response.id],
                    exact: true
                })
                queryClient.invalidateQueries("appointments")
            }
        }
    )
}