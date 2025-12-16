import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import { motion } from "framer-motion";

// components
import Navbar from "../shared/components/Navbar";
import Footer from "../shared/components/Footer";
import ProjectCard from "../components/ProjectCard";
import "./pages.css";

// store
import { themeStore } from "../store/themeStore";
import { projectStore } from "../store/projectStore";
import { scrollBehavior } from "../store/themeStore";

// img
import MyImg from "../assets/img-1.png";
import {
  FaReact,
  FaHtml5,
  FaCss3Alt,
  FaJsSquare,
  FaBootstrap,
  FaFigma,
  FaNode,
} from "react-icons/fa";
import { SiMongodb, SiTailwindcss } from "react-icons/si";
import { IoArrowUp } from "react-icons/io5";

const Home = () => {
  const navigate = useNavigate();
  const isDark = themeStore((state) => state.isDark);
  const { fetchProj, projects, loading } = projectStore();
  const { isVisible, setVisible } = scrollBehavior();
  const limit: number = 3;
  const displayedProj = projects.slice(0, limit);
  const imgSize = {
    width: "400px",
    height: "400px",
    borderRadius: "50%",
  };

  useEffect(() => {
    fetchProj();

    const toggleVisibility = () => {
      setVisible(window.scrollY > 700);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, [fetchProj,setVisible]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  console.log(isVisible);

  return (
    <div
      className={`overflow-hidden ${
        isDark ? "dark-bg text-white" : "light-bg text-black"
      }`}
    >
      <Navbar />
      <div className="banner my-5">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, type: "spring", stiffness: 50 }}
          className="banner-c-size px-5"
        >
          <h1 className="fw-bold m-0">Hi, I'm Rhogenn</h1>
          <p className="fs-5 fw-medium light-sec-text">
            Aspiring Frontend Developer.
          </p>
          <p>
            I'm a passionate and detail-oriented junior frontend developer with
            hands-on experience using HTML, CSS, JavaScript, and React.js. I
            enjoy building clean, responsive web interfaces and continuously
            improving my skills through real-world projects. I'm also exploring
            the MERN stack and using tools like Zustand for state management and
            Tailwind CSS for efficient styling. I thrive in problem-solving
            environments and love turning ideas into interactive, functional
            websites. I'm eager to contribute to collaborative teams and grow as
            a developer in the tech industry.
          </p>
          <button
            className={`rounded-2 px-3 py-2 ${
              isDark ? "btn-dark" : "btn-light"
            }`}
          >
            Download Resume
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 50 }}
          className="banner-c-size d-flex justify-content-center"
        >
          <img src={MyImg} alt="my_img" loading="lazy" style={imgSize} />
        </motion.div>
      </div>

      <div className="">
        <h1 className="text-center fw-bold">Passion</h1>

        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{
            duration: 0.5,
            type: "spring",
            stiffness: 50,
          }}
          className="d-flex flex-column align-items-center mb-3"
        >
          <p className="w-75 text-center">
            I have basic knowledge of HTML, CSS, and JavaScript, which I use to
            build simple and responsive user interfaces. I work with React.js to
            create reusable components and handle basic interactivity, and I use
            Tailwind CSS for styling layouts efficiently. I also use Zustand for
            basic state management and push my projects to GitHub for version
            control practice. I'm still learning the MERN stack slowly to
            understand how frontend connects with backend logic. Most of my
            hands-on experience comes from projects like task trackers, profile
            cards, and modal-based forms. I can also use Figma at a basic level
            to interpret and create simple UI designs, especially for personal
            projects. Although my skills are still growing, I try to understand
            how everything works under the hood. I rely on research and
            consistent practice to improve. My goal is to write cleaner code,
            understand problem-solving better, and keep progressing at my own
            pace.
          </p>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 2.7, y: 0 }}
            transition={{
              duration: 1,
              type: "spring",
              stiffness: 50,
              delay: 0.5,
            }}
            className="d-flex flex-column gap-3 mb-5"
          >
            <div className="d-flex justify-content-center gap-3">
              <FaHtml5 size={40} className="text-danger p-icon" />
              <FaReact size={40} className="text-info p-icon" />
              <FaCss3Alt size={40} className="text-primary p-icon" />
              <FaJsSquare size={40} className="text-warning p-icon" />
              <FaNode
                size={40}
                className={`p-icon ${isDark ? "text-light" : "text-dark"}`}
              />
            </div>
            <div className="d-flex justify-content-center gap-3">
              <SiMongodb size={40} className="text-success p-icon" />
              <SiTailwindcss size={40} className="text-info p-icon" />
              <FaBootstrap size={40} className="text-primary p-icon" />
              <FaFigma
                size={40}
                className={`p-icon ${isDark ? "text-light" : "text-dark"}`}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{
          duration: 0.5,
          type: "spring",
          stiffness: 100,
          damping: 12,
        }}
        viewport={{ once: true, amount: 0.5 }}
        className="px-5 pb-3 mb-2"
      >
        <h1 className="text-center fw-bold mb-4">Projects</h1>
        <div className="d-flex justify-content-center">
          {loading && (
            <Oval
              height={40}
              width={40}
              color="#4fa94d"
              visible={true}
              ariaLabel="oval-loading"
              secondaryColor="#4fa94d"
              strokeWidth={2}
              strokeWidthSecondary={2}
            />
          )}

          {projects.length + 1 > 0 ? (
            <div className="row">
              {displayedProj.map((v) => (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 12,
                    mass: 1,
                  }}
                  key={v._id}
                  className="col-sm-12 col-md-6 col-xl-4"
                >
                  <ProjectCard
                    title={v.title}
                    description={v.description}
                    demoCode={v.demoCode}
                    liveLink={v.liveLink}
                    urlImg={v.urlImg}
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <span className="fs-5">No data found</span>
          )}
        </div>
        <div className="d-flex justify-content-center mt-5 mb-4">
          <button
            onClick={() => navigate("/projects")}
            className="px-4 py-1 fs-5 btn btn-primary"
          >
            View All
          </button>
        </div>
      </motion.div>
      <Footer />

      {isVisible && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 12,
            mass: 1,
          }}
          onClick={scrollToTop}
          style={{ bottom: "100px", right: "20px" }}
          className="position-fixed btn btn-primary text-white rounded-cirle py-2 px-3 rounded-circle"
        >
          <IoArrowUp size={25} />
        </motion.button>
      )}
    </div>
  );
};

export default Home;
