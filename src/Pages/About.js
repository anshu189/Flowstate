import { useSelector } from "react-redux";

const About = () => {
  const userinfo = useSelector((store) => store?.userinfo);
  return (
    <div className="flex flex-col gap-10 px-32 py-12">
      <h1 className="text-3xl font-medium">About us Page</h1>
      <div className="w-[36%] flex flex gap-2 text-xl text-primarywhite bg-primaryblack rounded-md">
        <div className="w-4/12">
          <img
            src={userinfo?.photoURL}
            alt={userinfo?.displayName}
            className=" rounded-l-sm"
          />
        </div>
        <div className="flex flex-col font-light gap-6 justify-center p-4">
          <p>
            Name: <span className="font-medium">{userinfo?.displayName}</span>
          </p>
          <p>
            Email: <span className="font-medium">{userinfo?.email}</span>
          </p>
          <p>
            UID: <span className="font-medium">{userinfo?.uid}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
