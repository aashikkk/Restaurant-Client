import React from "react";
import HeaderLayout from "../components/HeaderLayout";
import RestaurantTable from "../components/RestaurantTable";

function HomePage() {
    return (
        <div>
            <HeaderLayout />
            <RestaurantTable />
        </div>
    );
}

export default HomePage;
