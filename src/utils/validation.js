const validation = (email, password) => {
  const isEmaildvalid =
    /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email);
  const isPassworddvalid =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(
      password
    );
  if (!isEmaildvalid) return "Email is not valid";
  if (!isPassworddvalid) return "Password is not valid";

  return null;
};

export default validation;
