import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiGithub, FiMenu } from "../Icons";
import { useEffect, useRef, useState } from "react";
import { tabs } from "../constant";

const Navbar = () => {
  const { pathname } = useLocation();

  const [open, setOpen] = useState(false);

  const path = pathname?.split("/")[1];

  const navRef = useRef();

  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <header
      className="flex items-center justify-between
                px-5 py-2
                shadow-lg
                bg-transparent
                h-12 w-full"
    >
      <div>
        <span
          className="text-3xl font-Josefin
                  text-teal-800 font-bold cursor-pointer"
        >
          <Link to="/">
            <div>
              Textop.<span className="text-teal-500">AI</span>
            </div>
          </Link>
        </span>
      </div>
      {pathname === "/" ? (
        <a
          href="https://github.com/hardikverma22/textop.AI"
          target="_blank"
          className="px-2 py-1 rounded-md bg-teal-900 text-white
                    flex gap-1 justify-center items-center
                    hover:bg-teal-700 cursor-pointer"
        >
          <FiGithub className="text-lg" />
          <span>Github</span>
        </a>
      ) : (
        <nav>
          <ul
            className="md:flex hidden gap-5
                     text-primary/80 tracking-wide text-md font-semibold font-Josefin"
          >
            {tabs.map((tab, index) => (
              <Link to={tab.link} key={`${tab}_${index}`}>
                <li
                  className={`${
                    path === tab.link
                      ? "bg-white text-teal-950"
                      : "text-gray-500"
                  } hover:bg-white hover:text-black rounded-full p-2 transition duration-500 cursor-pointer`}
                >
                  {tab.title}
                </li>
              </Link>
            ))}
          </ul>
          <button
            ref={navRef}
            className="md:hidden flex justify-center items-center
                    bg-white/50 p-[.35rem] rounded-full
                              hover:bg-white cursor-pointer"
            onClick={() => setOpen(!open)}
          >
            <FiMenu className="text-2xl" />
          </button>
          {open ? (
            <div
              className={`bg-white
                          w-full absolute top-12 left-0
                          transition-all duration-500 ease-in-out`}
            >
              <ul className="flex flex-col w-full justify-center items-center">
                {tabs.map((tab) => (
                  <li
                    key={tab.link}
                    className="text-lg text-center py-2
                               border-b border-b-gray-200
                              w-full cursor-pointer hover:bg-teal-100 hover:font-bold"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(tab.link);
                    }}
                  >
                    {tab.title}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </nav>
      )}
    </header>
  );
};

export default Navbar;
