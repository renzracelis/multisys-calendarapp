import logo from "../logo1.svg"
import Field from "../components/Field";
import Wrapper from "../components/Wrapper";
import Heading from "../components/Heading";
import Button from "../components/Button";
import { useLayoutEffect, useState } from "react";
import { useAuth } from "../App";
import { useNavigate } from "react-router-dom";
import axiosClient from "../axiosClient";

export default function Login() {
    const [credentials, setCredentials] = useState({
        'email': '',
        'password': ''
    })

    const [error, setError] = useState(null)

    const { isAuth } = useAuth()

    const login = (email, password) => {
        axiosClient.post('login', { email, password })
            .then(({ data, status }) => {
                if (status === 200) {
                    sessionStorage.setItem('accessToken', JSON.stringify(data.accessToken))
                    window.location.reload()
                }
            }).catch(error => {
                setError('Invalid email/password')
            })
    }

    const navigate = useNavigate()

    useLayoutEffect(() => {
        if (isAuth) {
            navigate('/')
        }
    }, [isAuth])

    const handleCredentials = (e) => {
        setCredentials(prevState => {
            prevState[e.target.name] = e.target.value
            return { ...prevState }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        login(credentials.email, credentials.password)
    }



    return (
        <Wrapper>
            <div className="min-h-screen flex">
                <form onSubmit={handleSubmit} action="#" method="post" className="w-full max-w-sm m-auto text-center ">
                    <div className="mb-8">
                        <img src={logo} alt="logo" className="w-40 m-auto" />
                    </div>
                    {
                        error && <p className="text-red-500 mb-8">{error}</p>
                    }
                    <Field onChange={handleCredentials} value={credentials.email} type="email" label="Email Address" name="email" placeholder="Enter your email" />
                    <Field onChange={handleCredentials} value={credentials.password} type="password" label="Password" name="password" placeholder="Enter your password" />
                    <div className="mt-8 w-full">
                        <Button type="submit">Login</Button>
                    </div>
                </form>
            </div>
        </Wrapper>
    )
}