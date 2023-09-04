
export default function Switcher({ enabled = false, handleSwitch }) {
    return (
        <div className="flex gap-2 items-center">
            <button onClick={handleSwitch} type="button" className={`bg-gray-400 h-8 w-14  rounded-full relative`}>
                <span className={`bg-gray-900 block duration-300 h-6 aspect-square  rounded-full absolute top-1 ${enabled ? 'left-1/2' : 'left-1'}`}></span>
            </button>
            <span>{enabled ? 'Completed' : 'Pending'}</span>
        </div>
    )
}