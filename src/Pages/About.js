const About = () => {
  return (
    <div className="flex flex-col gap-4 px-32 py-12">
      <h1 className="text-3xl font-medium">About us Page</h1>
      <div className="w-3/12 flex flex-col gap-1 text-2xl text-primarywhite bg-primaryblack p-4 rounded-md">
        <p>Name</p>
        <p>Age: 75</p>
        <p>Skills: Devour</p>
      </div>
    </div>
  );
};

export default About;
