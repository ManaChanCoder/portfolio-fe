import { useEffect } from "react";
import { ThreeDots } from "react-loader-spinner";
import { motion } from "framer-motion";

// components
import Navbar from "../shared/components/Navbar";
import ProjectCard from "../components/ProjectCard";

// store
import { themeStore } from "../store/themeStore";
import { projectStore } from "../store/projectStore";

const Project = () => {
  const isDark = themeStore((state) => state.isDark);
  const { fetchProj, projects, loading, computedProj } = projectStore();

  useEffect(() => {
    fetchProj();
  }, [fetchProj]);

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
                height="30"
                width="30"
                radius="9"
                color="#4fa94d"
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
          <div className="d-flex justify-content-center align-items-center">
            <ThreeDots
              height="100"
              width="100"
              radius="9"
              color="#4fa94d"
              ariaLabel="three-dots-loading"
              wrapperStyle={{ margin: "20px" }}
              wrapperClass="custom-loader"
              visible={true}
            />
          </div>
        ) : (
          <div className="row mt-5">
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
    </div>
  );
};

export default Project;
