export default function Field(props) {
    const { type, name, placeholder, label, onChange, value, className } = props
    return (
        <div className="block w-full mb-5">
            <label htmlFor={name} className={`block mb-1 text-gray-700 text-left ${className}`}>{label}</label>
            <input
                type={type}
                name={name}
                id={name}
                placeholder={placeholder}
                onChange={onChange}
                value={value}
                className="block w-full px-5 py-2 ring-1 border-0 outline-none ring-inset ring-indigo-300 placeholder:text-gray-400 focus:ring-inset focus:ring-indigo-500 rounded-md" />
        </div>
    )
}