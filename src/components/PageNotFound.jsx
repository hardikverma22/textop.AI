import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="bg-gray-100 flex flex-col justify-center items-center h-screen">
      <h1 className="text-6xl font-bold text-red-500 mb-10">404</h1>
      <h2 className="text-2xl font-bold mb-5">Oops! Page not found</h2>
      <p className="text-lg text-gray-600 mb-5">
        We're sorry, but the page you requested could not be found. Please check
        the URL and try again.
      </p>
      <Link
        to="/textop.AI/"
        className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-700 transition-colors duration-300"
      >
        Go to Homepage
      </Link>
    </div>
  );
};

export default PageNotFound;
