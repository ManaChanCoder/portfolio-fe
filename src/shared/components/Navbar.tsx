import { Link, useLocation, useNavigate } from "react-router-dom";
import "./share-components.css";

// icons
import { CiLight, CiMenuFries } from "react-icons/ci";
import { MdOutlineDarkMode, MdOutlineClose } from "react-icons/md";
import Logo from "../../assets/portfolio.png";

// store
import { themeStore } from "../../store/themeStore";

type TLinks = {
  id: number;
  name: string;
  path: string;
};

export default function Navbar() {
  const { isDark, toggleTheme } = themeStore();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const link: TLinks[] = [
    {
      id: 1,
      name: "Home",
      path: "/",
    },
    {
      id: 2,
      name: "Projects",
      path: "/projects",
    },
    {
      id: 3,
      name: "Resume",
      path: "/resume",
    },
    {
      id: 4,
      name: "Login",
      path: "/login",
    },
  ];

  return (
    <div
      className={`container-fluid d-flex justify-content-between py-3 px-5 nav-container`}
    >
      <img
        onClick={() => navigate("/")}
        src={Logo}
        alt="favicon_logo"
        style={{ width: "60px", height: "50px" }}
      />
      <div className="d-flex d-md-none align-items-center gap-3">
        {isDark ? (
          <CiLight size={30} onClick={toggleTheme} className="light-mode" />
        ) : (
          <MdOutlineDarkMode
            size={30}
            onClick={toggleTheme}
            className="light-mode"
          />
        )}
        <button
          className={`d-block d-md-none bg-transparent border-0 ${
            isDark ? "text-white" : "text-dark"
          }`}
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasScrolling"
          aria-controls="offcanvasScrolling"
        >
          <CiMenuFries size={25} />
        </button>
      </div>

      <div
        className={`offcanvas offcanvas-end w-75 ${
          isDark ? "dark-bg" : "light-bg"
        }`}
        data-bs-scroll="true"
        data-bs-backdrop="false"
        tabIndex={-1}
        id="offcanvasScrolling"
        aria-labelledby="offcanvasScrollingLabel"
      >
        <div className="offcanvas-header justify-content-end">
          <button
            type="button"
            className={`mt-2 border-0 bg-transparent me-4 ${
              isDark ? "text-white" : "text-black"
            }`}
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          >
            <MdOutlineClose size={25} />
          </button>
        </div>
        <div className="offcanvas-body d-flex flex-column align-items-center gap-2 w-100">
          {link.map((v) => (
            <Link
              key={v.id}
              to={v.path}
              className={`fs-5 no-underline s-link w-auto ${
                isDark ? "s-link-dark" : "s-link-light"
              } ${v.path === pathname ? "s-link-acitve" : ""}`}
            >
              {v.name}
            </Link>
          ))}
        </div>
      </div>

      <div className="navbar-menu d-md-flex gap-3 align-items-center">
        {link.map((v) => (
          <Link
            key={v.id}
            to={v.path}
            className={`fs-5 no-underline s-link ${
              isDark ? "s-link-dark" : "s-link-light"
            } ${v.path === pathname ? "s-link-acitve" : ""}`}
          >
            {v.name}
          </Link>
        ))}
        {isDark ? (
          <CiLight
            size={30}
            onClick={toggleTheme}
            className="cursor-pointer light-mode"
          />
        ) : (
          <MdOutlineDarkMode
            size={30}
            onClick={toggleTheme}
            className="cursor-pointer light-mode"
          />
        )}
      </div>
    </div>
  );
}
