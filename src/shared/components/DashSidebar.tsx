import "./share-components.css";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
// store
import { themeStore } from "../../store/themeStore";
import { accountStore } from "../../store/accountStore";

// icons
import { CiLight } from "react-icons/ci";
import { MdOutlineDarkMode } from "react-icons/md";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";

type TSidebarState = {
  title: string;
  link: string;
};

const DashSidebar = () => {
  const { isDark, toggleTheme } = themeStore();
  const { username, logout, isLoggedIn } = accountStore();
  const navigate = useNavigate();
  const [openProj, setOpenProj] = useState<boolean>(false);
  const [time, setTime] = useState<string>("");
  const [dateToday, setDateToday] = useState<string>("");

  const oProject: TSidebarState[] = [
    {
      title: "Create",
      link: "create/project",
    },
    {
      title: "Update",
      link: "update/project",
    },
    {
      title: "View",
      link: "view/project",
    },
  ];

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      const formattedTime = now.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });

      const formattedDate = now.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
      setTime(formattedTime);
      setDateToday(formattedDate);
    };
    updateTime();
    setInterval(updateTime, 60000);
  }, []);

  return (
    <div
      className={`w-25 px-3 py-4 ${
        isDark ? "sidebar-bg-dark" : "sidebar-bg-light"
      }`}
      style={{ height: "100vh" }}
    >
      <div className="d-flex flex-column gap-2">
        <div className="d-flex justify-content-between">
          <span className="fs-5 text-capitalize user-select-none">
            Welcome,{" "}
            <span
              className={`fs-6 ${isDark ? "text-success" : "text-primary"}`}
            >
              {username}
            </span>
          </span>

          <div className="">
            {isDark ? (
              <CiLight
                onClick={toggleTheme}
                size={30}
                className="cursor-pointer"
              />
            ) : (
              <MdOutlineDarkMode
                onClick={toggleTheme}
                size={30}
                className="cursor-pointer"
              />
            )}
          </div>
        </div>
        <div className={`${isDark ? "text-white" : "text-black"}`}>
          <span className="d-block">{`Time: ${time}`}</span>
          <span className="d-block">{`Date: ${dateToday}`}</span>
        </div>
        <a
          className="btn btn-primary mt-5"
          data-bs-toggle="collapse"
          href="#multiCollapseExample1"
          role="button"
          aria-expanded="false"
          aria-controls="multiCollapseExample1"
          onClick={() => setOpenProj(!openProj)}
        >
          Projects
          <span className="ms-1">
            {openProj ? (
              <IoIosArrowForward size={25} />
            ) : (
              <IoIosArrowDown size={25} />
            )}
          </span>
        </a>
        <div className="row">
          <div className="col-12">
            <div className="collapse multi-collapse" id="multiCollapseExample1">
              <ul
                className={`d-flex flex-column gap-2 p-0 ${
                  isDark ? "text-white" : "text-dark"
                }`}
              >
                {oProject.map((v, i) => (
                  <li className="list-unstyled" key={i}>
                    <Link to={v.link}>
                      <button className="btn btn-primary w-100">
                        {v.title}
                      </button>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <Link to="/" className="outline-none">
              <button className="btn btn-primary w-100 mb-2">Home</button>
            </Link>
            <Link to="/resume" className="outline-none">
              <button className="btn btn-primary w-100 mb-2">Resume</button>
            </Link>
          </div>
          <div className="col-12">
            <p className="btn btn-danger w-100" onClick={logout}>
              Logout
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashSidebar;
