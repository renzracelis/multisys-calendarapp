export default function Heading({ children, ...props }) {
    const { h } = props
    if (h === '2') return <h2 className="call-to-action__title text-3xl font-semibold" >{children}</h2>
    if (h === '3') return <h3 className="call-to-action__title text-xl font-semibold" >{children}</h3>
    return <h1 className="call-to-action__title text-4xl font-semibold" >{children}</h1>
}