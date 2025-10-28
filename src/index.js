import { lazy, StrictMode, Suspense, useEffect } from "react";
import Home from "./Pages/Home";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import { MainError } from "./Pages/Error";
import SingleRestaurant from "./Pages/SingleRestaurant";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router";
import { Provider, useDispatch } from "react-redux";
import appStore from "./store/appStore";
import CartPage from "./Pages/CartPage";
import { auth } from "./utils/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { addUser, removeUser } from "./store/userSlice";
import ProtectedRoute from "./utils/ProtectedRoute";
import Login from "./components/Login";

// Chunking | Code Splitting | Dynamic Bundling | lazy loading | On demand loading
const About = lazy(() => import("./Pages/About"));

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
      } else {
        // User is signed out
        dispatch(removeUser());
      }
    });
  }, []);

  return (
    <div className="light m-0 p-0 min-h-[100vh]">
      <Header />
      <Outlet />
    </div>
  );
};

// In Dev-mode
const appRouter = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <App />,
    errorElement: <MainError />,
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/",
            element: <Home />,
          },
          {
            path: "/home",
            element: <Home />,
          },
          {
            path: "/error",
            element: <MainError />,
          },
          {
            path: "/about",
            element: (
              <Suspense
                fallback={
                  <>
                    <h1>Loading...</h1>
                  </>
                }
              >
                <About />
              </Suspense>
            ),
          },
          {
            path: "/restaurant/:resid",
            element: <SingleRestaurant />,
          },
          {
            path: "/cart",
            element: <CartPage />,
          },
        ],
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <Provider store={appStore}>
      <RouterProvider router={appRouter} />
    </Provider>
  </StrictMode>
);
