const Shimmer = () => {
  return (
    <div className="flex flex-col justify-start gap-4 flex-[0_0_24rem] w-full pb-4 text-center rounded-xl cursor-default overflow-hidden bg-white border border-gray-300 transition-none shadow-none transform-none outline-none">
      {/* Image Placeholder */}
      <div className="w-full h-[240px] bg-gray-200 animate-pulse"></div>

      {/* Text Placeholder */}
      <div className="flex flex-col gap-2 px-4">
        <p className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></p>
        <p className="h-4 w-1/2 bg-gray-200 rounded animate-pulse"></p>
        <p className="h-4 w-2/3 bg-gray-200 rounded animate-pulse"></p>
        <p className="h-4 w-1/3 bg-gray-200 rounded animate-pulse"></p>
      </div>
    </div>
  );
};

export default Shimmer;
