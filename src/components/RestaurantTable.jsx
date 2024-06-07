import React, { useState, useEffect } from "react";
import { Table } from "flowbite-react";
import axios from "../axios";
import { useNavigate } from "react-router-dom";

function RestaurantTable() {
    const navigate = useNavigate();
    const [restaurants, setRestaurants] = useState([]);
    const [isDltModelOpen, setIsDltModelOpen] = useState(false);
    const [currentRestaurantId, setCurrentRestaurantId] = useState(null);

    useEffect(() => {
        axios
            .get("/api/v1/restaurants/")
            .then((response) => {
                setRestaurants(response.data);
            })
            .catch((error) => {
                console.error("Error fetching restaurants", error);
            });
    }, []);

    const handleDelete = (restaurantId) => {
        axios
            .delete(`/api/v1/restaurants/${restaurantId}`)
            .then((response) => {
                setRestaurants(
                    restaurants.filter(
                        (restaurant) => restaurant._id !== restaurantId
                    )
                );
                setIsDltModelOpen(false); // close modal after deletion
            })
            .catch((error) => {
                console.error("Error deleting restaurant", error);
            });
    };

    const handleRestaurantClick = (restaurant) => {
        navigate("/restaurant/desc", { state: { restaurant: restaurant } });
    };

    const openModal = (restaurantId) => {
        setCurrentRestaurantId(restaurantId);
        setIsDltModelOpen(true);
    };

    const closeModal = () => {
        setIsDltModelOpen(false);
        setCurrentRestaurantId(null);
    };

    // Default window confirm
    // if (
    //     window.confirm("Are you sure you want to delete this restaurant?")
    // )

    return (
        <div className="overflow-x-auto py-12 mx-auto w-3/4">
            <div className="flex justify-end pb-3">
                <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => (window.location.href = `restaurant/create`)} // Navigate to your create route
                >
                    Create
                </button>
            </div>
            {restaurants.length > 0 ? (
                <Table striped>
                    <Table.Head>
                        {Object.keys(restaurants[0]).map(
                            (key) =>
                                !["_id", "__v"].includes(key) && (
                                    <Table.HeadCell key={key}>
                                        {key}
                                    </Table.HeadCell>
                                )
                        )}
                        <Table.HeadCell>
                            <span className="sr-only">Edit</span>
                        </Table.HeadCell>
                        <Table.HeadCell>
                            <span className="sr-only">Delete</span>
                        </Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {restaurants.map((restaurant) => (
                            <Table.Row
                                key={restaurant._id}
                                onClick={() => {
                                    handleRestaurantClick(restaurant);
                                }}
                                className="bg-white dark:border-gray-700 dark:bg-gray-800"
                            >
                                {Object.keys(restaurant).map(
                                    (key) =>
                                        !["_id", "__v"].includes(key) && (
                                            <Table.Cell key={key}>
                                                {restaurant[key]}
                                            </Table.Cell>
                                        )
                                )}
                                <Table.Cell>
                                    <a
                                        href={`restaurant/update/${restaurant._id}`}
                                        onClick={(e) => {
                                            e.stopPropagation(); // Prevents the row onClick from being triggered
                                        }}
                                        className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                                    >
                                        Edit
                                    </a>
                                </Table.Cell>
                                <Table.Cell>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            openModal(restaurant._id);
                                        }}
                                        className="font-medium text-red-600 hover:underline dark:text-red-500"
                                    >
                                        Delete
                                    </button>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            ) : (
                <div className="text-center py-8">
                    <span className="text-gray-500">No records found.</span>
                </div>
            )}
            {isDltModelOpen && (
                <div
                    id="deleteModal"
                    className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
                >
                    <div className="relative top-60 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                        <div className="mt-3 text-center">
                            <svg
                                className="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto"
                                aria-hidden="true"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                            <h3 className="text-lg leading-6 font-medium text-gray-900">
                                Delete Confirmation
                            </h3>
                            <div className="mt-2 px-7 py-3">
                                <p className="text-sm text-gray-500">
                                    Are you sure you want to delete this
                                    restaurant? This action cannot be undone.
                                </p>
                            </div>
                            <div className="items-center px-4 py-3">
                                <button
                                    id="cancel-btn"
                                    className="px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md w-auto shadow-sm hover:bg-gray-400"
                                    onClick={closeModal}
                                >
                                    Cancel
                                </button>
                                <button
                                    id="confirm-btn"
                                    className="mx-4 px-4 py-2 bg-red-600 text-white text-base font-medium rounded-md w-auto shadow-sm hover:bg-red-700"
                                    onClick={() =>
                                        handleDelete(currentRestaurantId)
                                    }
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default RestaurantTable;
