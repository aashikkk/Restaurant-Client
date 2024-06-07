import React, { useState, useEffect } from "react";
import axios from "../axios";
import { useNavigate, useParams } from "react-router-dom";

function CreateUpdateRestaurant({ func }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [values, setValues] = useState({
        name: "",
        address: "",
        telephone: "",
    });

    useEffect(() => {
        if (id) {
            axios
                .get(`/api/v1/restaurants/${id}`)
                .then((res) => {
                    console.log(res.data);
                    const { name, address, telephone } = res.data.restaurant;
                    setValues({
                        name: name,
                        address: address,
                        telephone: telephone,
                    });
                })
                .catch((err) => console.error(err));
        }
    }, [id]);

    function handleChange(event) {
        const { name, value } = event.target;
        setValues((prevValue) => ({ ...prevValue, [name]: value }));
    }

    function handleSubmit(event) {
        event.preventDefault();
        const method = id ? "put" : "post";
        const url = id ? `/api/v1/restaurants/${id}` : "/api/v1/restaurants/";

        axios[method](url, values)
            .then(() => navigate("/"))
            .catch((err) => console.error(err));
    }
    return (
        <div>
            <section className="bg-white dark:bg-gray-900">
                <div className="max-w-2xl px-4 py-8 mx-auto lg:py-16">
                    <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                        {func} Restaurant
                    </h2>
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
                            <div className="sm:col-span-2">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    value={values.name}
                                    placeholder="Name"
                                    required=""
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="sm:col-span-2">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Address
                                </label>
                                <textarea
                                    id="address"
                                    name="address"
                                    rows="3"
                                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Address"
                                    value={values.address}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="sm:col-span-2">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Telephone
                                </label>
                                <input
                                    type="tel"
                                    name="telephone"
                                    id="telephone"
                                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Telephone"
                                    value={values.telephone}
                                    onChange={handleChange}
                                    minLength="9"
                                    maxLength="15"
                                    pattern="(\+)?\d{9,15}"
                                />
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button
                                type="submit"
                                className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            >
                                {func} Restaurant
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
}

export default CreateUpdateRestaurant;
