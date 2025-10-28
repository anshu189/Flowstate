import { useRef, useState } from "react";
import validation from "../utils/validation";
import { auth } from "../utils/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router";

const Login = () => {
  const [newuser, setNewuser] = useState(true);
  const navigate = useNavigate();

  const handlenewuser = () => {
    setValidationerrorMessage("");
    setNewuser(!newuser);
  };
  const [validationerrorMessage, setValidationerrorMessage] = useState("");
  const nameref = useRef("");
  const emailref = useRef(null);
  const passwordref = useRef(null);

  const handleloginsubmit = () => {
    const validationcheck = validation(
      emailref.current.value,
      passwordref.current.value
    );
    setValidationerrorMessage(validationcheck);
    if (validationerrorMessage) return;

    // Sign-up/New User Logic
    if (newuser) {
      createUserWithEmailAndPassword(
        auth,
        emailref.current.value,
        passwordref.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: nameref.current.value,
            photoURL: "https://avatars.githubusercontent.com/u/65893784?v=4",
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
              navigate("/");
            })
            .catch((error) => {
              // An error occurred
              setValidationerrorMessage(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          if (errorMessage.includes("invalid-email")) {
            setValidationerrorMessage("Invalid Email");
          } else if (errorMessage.includes("email-already-in-use")) {
            setValidationerrorMessage("Email Already Exist");
          } else {
            setValidationerrorMessage(`${errorCode} - ${errorMessage}`);
          }
        });
    }
    // Login/Existing User Logic
    else {
      signInWithEmailAndPassword(
        auth,
        emailref.current.value,
        passwordref.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          if (user) {
            navigate("/");
          }
        })
        .catch((error) => {
          const errorMessage = error.message;
          if (errorMessage.includes("invalid-credential")) {
            setValidationerrorMessage("Invalid Credentials");
          }
        });
    }
  };

  return (
    <div className="flex min-h-[100vh] flex-col justify-center px-6 py-12 lg:px-8 text-primarywhite bg-primaryblack">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="text-center text-2xl font-bold tracking-light">
          {newuser ? "Create your account" : "Log in to your account"}
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          {newuser && (
            <div>
              <div className="mt-2">
                <input
                  id="name"
                  ref={nameref}
                  name="name"
                  type="text"
                  placeholder="Full Name"
                  required
                  autoComplete="name"
                  className="block w-full rounded-md bg-primarywhite/5 px-3 py-2 text-base outline-1 -outline-offset-1 outline-primarywhite/10 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>
          )}

          <div>
            <div className="mt-2">
              <input
                id="email"
                ref={emailref}
                name="email"
                type="email"
                placeholder="Email address"
                required
                autoComplete="email"
                className="block w-full rounded-md bg-primarywhite/5 px-3 py-2 text-base outline-1 -outline-offset-1 outline-primarywhite/10 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            {!newuser && (
              <div className="mb-2 flex items-center justify-end">
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-400 hover:text-indigo-300"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
            )}
            <div>
              <input
                id="password"
                ref={passwordref}
                name="password"
                type="password"
                placeholder="Password"
                required
                autoComplete="current-password"
                className="block w-full rounded-md bg-primarywhite/5 px-3 py-2 text-base outline-1 -outline-offset-1 outline-primarywhite/10 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <p
              className={`${
                validationerrorMessage?.includes("Login Succeessful!") ||
                validationerrorMessage?.includes("Account Created Succeessful!")
                  ? "text-green-400"
                  : " text-red-400 "
              } `}
            >
              {validationerrorMessage}
            </p>
          </div>

          <div>
            <button
              onClick={handleloginsubmit}
              className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-2 text-base font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              {newuser ? "Sign up" : "Login"}
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-400">
          {newuser ? "Already a member? " : "Not a member? "}
          <a
            href="#"
            onClick={handlenewuser}
            className="font-semibold text-indigo-400 hover:text-indigo-300"
          >
            {newuser ? "Log in" : "Sing up"}
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
