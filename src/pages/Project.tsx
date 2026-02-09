import { useEffect } from "react";
import { ThreeDots, Oval } from "react-loader-spinner";
import { motion, AnimatePresence } from "framer-motion";

// components
import Navbar from "../shared/components/Navbar";
import ProjectCard from "../components/ProjectCard";

// store
import { themeStore } from "../store/themeStore";
import { projectStore } from "../store/projectStore";
import { scrollBehavior } from "../store/themeStore";

// icons
import { IoArrowUp } from "react-icons/io5";

const Project = () => {
  const isDark = themeStore((state) => state.isDark);
  const { fetchProj, projects, loading, computedProj } = projectStore();
  const { isVisible, setVisible } = scrollBehavior();

  useEffect(() => {
    fetchProj();

    const toggleVisibility = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, [fetchProj]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      className={`${isDark ? "dark-bg text-white" : "light-bg text-black"}`}
      style={{ minHeight: "100vh", maxHeight: "100%" }}
    >
      <Navbar />

      <div className="p-5">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.4,
            type: "spring",
            stiffness: 50,
          }}
          className="d-flex justify-content-between align-items-center"
        >
          <h1>Projects</h1>
          <span className="d-flex align-items-end gap-2 fs-5">
            <span className="">Total:</span>{" "}
            {loading ? (
              <ThreeDots
                height="20"
                width="25"
                radius="10"
                color={`${isDark ? "#fff" : "#080c80"}`}
                ariaLabel="three-dots-loading"
                // wrapperStyle={{ margin: "20px" }}
                wrapperClass="custom-loader"
                visible={true}
              />
            ) : (
              computedProj
            )}
          </span>
        </motion.div>
        {loading ? (
          <div className="position-absolute start-50 top-50">
            <Oval
              height={50}
              width={50}
              color="#ffffff"
              visible={true}
              ariaLabel="oval-loading"
              secondaryColor="#080c80"
              strokeWidth={5}
              strokeWidthSecondary={3}
            />
          </div>
        ) : (
          <div className="row mt-5 row-gap-3">
            {projects.map((v) => (
              <div key={v._id} className="col-sm-12 col-md-6 col-lg-4">
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
        )}
      </div>

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
              duration: 0.8,
            }}
            onClick={scrollToTop}
            style={{ bottom: "20px", right: "20px" }}
            className="position-fixed btn btn-primary text-white rounded-cirle py-2 px-3 rounded-circle"
          >
            <IoArrowUp size={25} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Project;
