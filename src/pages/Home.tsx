import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import { motion, AnimatePresence } from "framer-motion";

// components
import Navbar from "../shared/components/Navbar";
import Footer from "../shared/components/Footer";
import ProjectCard from "../components/ProjectCard";
import "./pages.css";
import Certification from "../components/Certification";

// store
import { themeStore } from "../store/themeStore";
import { projectStore } from "../store/projectStore";
import { scrollBehavior } from "../store/themeStore";

// img
import MyImg1 from "../assets/img-1.jpg";
import MyImg2 from "../assets/img-2.png";
import DataEncoder from "../assets/Data Encoder - Saingga.png";
import WebDeveloper from "../assets/Rhogenn Saingga_Web_Dev_Cert.png";

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

interface CertificationState {
  img: string;
  title: string;
  content: string;
}

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
  }, [fetchProj, setVisible]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const internCertification: CertificationState[] = [
    {
      img: DataEncoder,
      title: "Data Encoder",
      content:
        "During my internship at Ollopa Corporation (Ollopa LLC), I was responsible for managing and organizing hotel-related content on the company’s website by inputting and updating details such as pricing, accommodation packages, food offerings, ambiance descriptions, images, and other relevant information to keep the platform accurate, clear, and up to date. I also worked with the company’s digital resources, particularly eBook materials, where I reviewed content, selected appropriate titles, and transferred data into structured Excel sheets while ensuring consistency and accuracy. This experience helped me develop skills in data entry, content organization, and web content management while improving my attention to detail and ability to handle digital assets efficiently, contributing to the overall quality of the company’s online platform.",
    },
    {
      img: WebDeveloper,
      title: "Web Developer",
      content:
        "During my voluntary internship at SSBIFood Services Corporation, I worked as a Web Developer on a full-stack mentorship and e-learning platform where users can teach or enroll in courses. The system features AI integration to generate quizzes, exams, surveys, and course content, along with a subscription model that provides access to advanced AI capabilities such as image and video generation based on plan limits. Built using React, Node.js, Express.js, Prisma, and SQL, the project focuses on delivering a responsive, scalable, and user-friendly learning experience.      ",
    },
  ];

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
            onClick={() => navigate("/resume")}
            className={`rounded-2 px-3 py-2 ${
              isDark ? "btn-dark" : "btn-light"
            }`}
          >
            View Resume
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 50 }}
          className="banner-c-size d-flex justify-content-center"
        >
          {isDark ? (
            <motion.img
              whileHover={{ scale: [1, 0.95, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              src={MyImg1}
              alt="my_img"
              loading="lazy"
              style={imgSize}
            />
          ) : (
            <motion.img
              whileHover={{ scale: [1, 0.95, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              src={MyImg2}
              alt="my_img"
              loading="lazy"
              style={imgSize}
              className="shadow-lg"
            />
          )}
        </motion.div>
      </div>

      <div className="">
        <h1 className="text-center fw-bold">Passion</h1>

        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
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

      <div className="">
        <h1 className="fw-bold text-center mb-4 category-title-size">
          Certifications During Intern Program
        </h1>

        <div className="d-flex flex-column align-items-center align-items-lg-start flex-lg-row justify-content-center">
          {internCertification.map((cert, index) => (
            <Certification
              key={index}
              img={cert.img}
              title={cert.title}
              content={cert.content}
            />
          ))}
        </div>
      </div>

      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 12,
          duration: 0.5,
        }}
        className="px-5 pb-3 mb-2"
      >
        <h1 className="text-center fw-bold mb-4">Projects</h1>
        <div className="d-flex justify-content-center">
          {loading && (
            <Oval
              height={40}
              width={40}
              color="#ffffff"
              visible={true}
              ariaLabel="oval-loading"
              secondaryColor="#080c80"
              strokeWidth={2}
              strokeWidthSecondary={2}
            />
          )}

          {projects.length + 1 > 0 ? (
            <div className="row">
              {displayedProj.map((v) => (
                <div key={v._id} className="col-sm-12 col-md-6 col-xl-4">
                  <ProjectCard
                    title={v.title}
                    description={v.description}
                    demoCode={v.demoCode}
                    liveLink={v.liveLink}
                    urlImg={v.urlImg}
                  />
                </div>
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

      <AnimatePresence>
        {isVisible && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
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
      </AnimatePresence>
    </div>
  );
};

export default Home;
