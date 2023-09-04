import { useState } from "react";

export default function useToggle(init = false) {
    const [toggle, setToggle] = useState(init)

    const handleToggle = (callback) => {
        setToggle(prevState => {
            prevState = !prevState
            if (typeof callback === "function") {
                callback(prevState)
            }
            return prevState
        })
    }


    return {
        toggle,
        handleToggle
    }
}