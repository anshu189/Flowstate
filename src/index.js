import { lazy, StrictMode, Suspense, useEffect } from "react";
import Home from "./Pages/Home";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import { MainError } from "./Pages/Error";
import SingleRestaurant from "./Pages/SingleRestaurant";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  useNavigate,
} from "react-router";
import { Provider, useDispatch } from "react-redux";
import appStore from "./store/appStore";
import CartPage from "./Pages/CartPage";
import Login from "./components/Login";
import { onAuthStateChanged } from "firebase/auth";
import { addUser, removeUser } from "./store/userSlice";
import { auth } from "./utils/firebase";

// Chunking | Code Splitting | Dynamic Bundling | lazy loading | On demand loading
const About = lazy(() => import("./Pages/About"));

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        const { uid, email, displayName, photoURL } = user;
        console.log("signed in");
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/");
        console.log("user:", user);
      } else {
        console.log("signed out");
        // User is signed out
        dispatch(removeUser());
        navigate("/login");
      }
    });

    // Unsusbscribe when component unmounts
    return () => unsubscribe();
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
    errorElement: <MainError />,
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
