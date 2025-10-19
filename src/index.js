import ReactDOM from "react-dom/client";
import About from "./Pages/About";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router";
import { MainError } from "./Pages/Error";
import Home from "./Pages/Home";
import Header from "./components/Header";
import SingleRestaurant from "./Pages/SingleRestaurant";

const App = () => (
  <div className="app light">
    <Header />
    <Outlet />
  </div>
);

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/restaurant/:resid",
        element: <SingleRestaurant />,
      },
    ],
    errorElement: <MainError />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
