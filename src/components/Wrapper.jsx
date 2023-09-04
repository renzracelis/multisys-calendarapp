export default function Wrapper({ children }) {
    return (
        <div className="box-border flex justify-center py-8 px-5">
            <div className="box-border w-full max-w-screen-xl">
                {children}
            </div>
        </div>
    )
}