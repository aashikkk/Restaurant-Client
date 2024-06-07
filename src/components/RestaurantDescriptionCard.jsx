import React from "react";
import { Card } from "flowbite-react";
import { useLocation } from "react-router-dom";

function RestaurantDescriptionCard() {
    const location = useLocation();
    const selectedRestaurant = location.state.restaurant;

    return (
        <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
            <h2 className="mb-4 text-3xl tracking-tight font-extrabold text-center text-gray-00 dark:text-white pb-7">
                <mark className="px-2 text-white bg-blue-600 rounded dark:bg-blue-500">
                    Restaurant
                </mark>{" "}
                Details
            </h2>
            <Card className="flex ">
                <div className="flex flex-col  pb-10">
                    <h5 className="mb-1 text-2xl font-medium text-gray-900 dark:text-white ">
                        {selectedRestaurant.name}
                    </h5>
                    <h6 className="text-xl mb-1 text-gray-600 dark:text-gray-400">
                        {selectedRestaurant.address}
                    </h6>
                    <span className="text-xl text-gray-500 dark:text-gray-400">
                        {selectedRestaurant.telephone}
                    </span>
                </div>
            </Card>
        </div>
    );
}

export default RestaurantDescriptionCard;
