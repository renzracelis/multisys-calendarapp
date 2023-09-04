import { useNavigate } from "react-router-dom"
import { useAuth } from "../App"
import logo from "../logo.svg"
import Button from "./Button"
import Heading from "./Heading"
import { useLayoutEffect } from "react"

export default function Header() {
    const { isAuth } = useAuth()
    const navigate = useNavigate()

    const logout = () => {
        sessionStorage.removeItem('accessToken')
        navigate('/login')
        window.location.reload()
    }

    useLayoutEffect(() => {
        if (!isAuth) {
            navigate('/login')
            window.location.reload()
        }
    }, [isAuth])

    return (
        <header className=" p-5 bg-indigo-50">
            <div className="w-full m-auto max-w-screen-xl grid grid-cols-2">
                <div className="flex items-center w-full">
                    <img src={logo} alt="logo" className="w-32" />
                </div>
                <div className="flex justify-end items-center">
                    <div>
                        <Button variant="danger" click={logout}>Logout</Button>
                    </div>
                </div>
            </div>
        </header>
    )
}