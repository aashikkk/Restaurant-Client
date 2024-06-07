import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage";
import HomePage from "./pages/HomePage";
import CreateUpdateRestaurant from "./components/CreateUpdateRestaurant";
import RestaurantDescriptionCard from "./components/RestaurantDescriptionCard";

const router = createBrowserRouter([
    {
        path: "/",
        errorElement: <NotFoundPage />,
        element: <HomePage />,
    },
    {
        path: "/restaurant",
        children: [
            {
                path: "create",
                element: <CreateUpdateRestaurant func={"Create"} />,
            },
            {
                path: "update/:id",
                element: <CreateUpdateRestaurant func={"Update"} />,
            },
            {
                path: "desc",
                element: <RestaurantDescriptionCard />,
            },
        ],
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
