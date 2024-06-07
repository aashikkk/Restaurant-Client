import React, { useState, useEffect } from "react";
import { Table } from "flowbite-react";
import ToggleDelete from "./ToggleDelete";
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
                <ToggleDelete
                    isOpen={isDltModelOpen}
                    onClose={closeModal}
                    onDelete={handleDelete}
                    restaurantId={currentRestaurantId}
                />
            )}
        </div>
    );
}

export default RestaurantTable;
