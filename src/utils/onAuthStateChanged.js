import { useLocation, useNavigate } from "react-router";
import { addUser, removeUser } from "../store/userSlice";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const onAuthStateChange = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
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
        if (pathname === "/login") {
          navigate("/");
        }
      } else {
        -(
          // User is signed out
          dispatch(removeUser())
        );
        navigate("/login");
      }
    });

    // Unsusbscribe when component unmounts
    return () => unsubscribe();
  }, []);
};

export default onAuthStateChange;
