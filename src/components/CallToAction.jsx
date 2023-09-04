import CheckCircle from '../components/icons/CheckCircle'
import Clock from '../components/icons/Clock'
import Heading from "../components/Heading";
import toDateString from '../helper/toDateString';


export default function CallToAction({ title, date, status }) {
    const _status = {
        "completed": {
            icon: <CheckCircle className="fill-lime-300 h-full absolute -right-10 -top-10" />,
            color: 'bg-lime-400 hover:bg-lime-500'
        },
        "pending": {
            icon: <Clock className="fill-amber-300 h-full absolute -right-10 -top-10" />,
            color: 'bg-amber-400 hover:bg-amber-500'
        },
    }

    return (
        <div className={`call-to-action ${_status[status]?.color} duration-300 h-full flex items-end rounded-md p-7 pt-16 relative overflow-hidden`}>
            {_status[status]?.icon}
            <div className="relative z-10">
                <Heading h="3">{title}</Heading>
                <p className="text-sm">{toDateString(date)}</p>
            </div>
        </div>
    )
}