import Header from "../components/Header";
import Wrapper from "../components/Wrapper";
import { Outlet } from "react-router-dom";

export default function Root() {
    return (
        <>
            <Header />
            <Wrapper>
                <Outlet />
            </Wrapper>
        </>
    )
}