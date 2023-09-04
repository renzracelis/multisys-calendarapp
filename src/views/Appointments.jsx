import React, { useState } from "react";
import {
    useQuery,
} from "react-query";
import axiosClient from "../axiosClient";
import LoaderIcon from "../components/icons/Loader";
import { Link } from "react-router-dom";
import Heading from "../components/Heading";
import Button from "../components/Button";
import CallToAction from "../components/CallToAction";
import ChevronDown from "../components/icons/ChevronDown";

export default function Appointments() {
    const [filter, setFilter] = useState({
        pending: false,
        completed: false,
        date_order: "",
        search: "",
    });

    const filterAppointments = (appointments) => {
        const filteredAppointments = appointments.filter((_data) => {
            if (filter.pending && _data.status !== "pending") {
                return false;
            }
            if (filter.completed && _data.status !== "completed") {
                return false;
            }
            if (filter.search && !_data.name.includes(filter.search)) {
                return false;
            }
            return true;
        });

        if (filter.date_order === "old_new") {
            return filteredAppointments.sort((a, b) => new Date(a.date) - new Date(b.date));
        } else if (filter.date_order === "new_old") {
            return filteredAppointments.sort((a, b) => new Date(b.date) - new Date(a.date));
        }

        return filteredAppointments;
    };

    const { isLoading, error, data } = useQuery(["appointments", filter], () =>
        axiosClient.get("appointment").then(({ data }) => filterAppointments(data))
    );

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFilter((prevFilter) => ({
            ...prevFilter,
            [name]: type === "checkbox" ? checked : value,
        }));
    };


    return (
        <>
            <div className="flex justify-between items-center mb-8 gap-8 lg:flex-row flex-col">
                <div className="flex items-center justify-start flex-wrap gap-8 w-full">
                    <Heading h="2">Appointments</Heading>
                    <Button element="anchor" to="appointments/create">Add new</Button>
                </div>
                <div className="flex sm:items-center items-start gap-3 w-full sm:flex-row flex-col">
                    <label htmlFor="pending" className="flex items-center gap-1">
                        <input type="checkbox" name="pending" id="pending" onChange={handleChange} />
                        Pending
                    </label>
                    <label htmlFor="completed" className="flex items-center gap-1">
                        <input type="checkbox" name="completed" id="completed" onChange={handleChange} />
                        Completed
                    </label>
                    <div className="relative w-full">
                        <select name="date_order" id="date_order" onChange={handleChange} className="block w-full px-5 py-2 ring-1 border-0 outline-none ring-inset ring-indigo-300 placeholder:text-gray-400 focus:ring-inset focus:ring-indigo-500 rounded-md appearance-none">
                            <option>Sort Date</option>
                            <option value="old_new">Old - New</option>
                            <option value="new_old">New - Old</option>
                        </select>
                        <ChevronDown className="absolute top-1/2 -translate-y-1/2 right-5" />
                    </div>
                    <input
                        name="search"
                        id="search"
                        placeholder="Keyword"
                        onChange={handleChange}
                        className="block w-full px-5 py-2 ring-1 border-0 outline-none ring-inset ring-indigo-300 placeholder:text-gray-400 focus:ring-inset focus:ring-indigo-500 rounded-md" />
                </div>
            </div>

            {(isLoading && error) && <div>Something went wrong!</div>}

            {
                isLoading && !error
                    ? <LoaderIcon />
                    : <ul className="mt-4 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {data.map(({ id, name, date, status }) => {
                            return (
                                <li key={id}>
                                    <Link to={`appointments/${id}`}>
                                        <CallToAction title={name} date={date} status={status} />
                                    </Link>
                                </li>
                            )
                        })}

                    </ul>
            }
        </>

    )
}