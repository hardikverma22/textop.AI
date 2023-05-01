const Loader = () => {
  return (
    <div className="h-[calc(100vh-3rem)] w-[100vw] flex justify-center items-center">
      <div className="font-bold flex flex-col items-center justify-center text-teal-900 gap-3">
        <div className="flex gap-3">
          <span className="animate-pulse bg-teal-600 w-6 h-6 rounded-full "></span>
          <span className="animate-pulse bg-teal-600 w-6 h-6 rounded-full "></span>
          <span className="animate-pulse bg-teal-600 w-6 h-6 rounded-full "></span>
        </div>
        <span className="flex justify-center items-center text-2xl">
          Loading
        </span>
      </div>
    </div>
  );
};

export default Loader;
