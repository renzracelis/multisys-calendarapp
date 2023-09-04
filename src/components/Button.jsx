import { Link } from "react-router-dom"

export default function Button({ children, variant, type, click, element, to }) {

    if (element === "anchor") {
        return <Link to={to} className="duration-300 px-5 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600">
            {children}
        </Link>
    }

    if (variant === "link") {
        return <button type={type} onClick={click} className="duration-300 text-indigo-500 hover:text-indigo-600">
            {children}
        </button>
    }

    if (variant === "danger") {
        return <button type={type} onClick={click} className="duration-300 px-5 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
            {children}
        </button>
    }

    return <button type={type} onClick={click} className="duration-300 px-5 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600">
        {children}
    </button>
}