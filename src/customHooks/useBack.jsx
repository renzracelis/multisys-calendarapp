import { useNavigate } from "react-router-dom";

export default function useBack() {
    const navigate = useNavigate()

    const handleBack = () => navigate(-1)

    return handleBack
}