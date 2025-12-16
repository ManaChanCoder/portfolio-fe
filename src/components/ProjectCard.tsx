import { motion } from "framer-motion";
type TProjectCardSate = {
  title: string;
  description: string;
  demoCode: string;
  liveLink: string;
  urlImg: string;
};

// icons
import { FaGithub } from "react-icons/fa";
import { MdEmojiPeople } from "react-icons/md";

// components
import { trimByWords } from "../utility/wordTrim";

// store
import { themeStore } from "../store/themeStore";

const ProjectCard = ({
  title,
  description,
  demoCode,
  liveLink,
  urlImg,
}: TProjectCardSate) => {
  const isDark = themeStore((state) => state.isDark);

  return (
    <div
      className={`container-fluid m-2 ${isDark ? "text-white" : "text-black"}`}
    >
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 50,
          duration: 0.3,
        }}
        className="row rounded-3 card-container pb-3 d-flex flex-column"
        style={{ minHeight: "600px" }}
      >
        {/* Image */}
        <div className="col-12 p-0">
          <img
            src={urlImg}
            alt="project image"
            style={{ height: "230px", width: "100%" }}
            className="rounded-top-3"
          />
        </div>

        {/* Content */}
        <div className="col-12 my-3 flex-grow-1">
          <h3 className="fw-semibold fs-5 my-3">{title}</h3>
          <p className="fs-6 opacity-75">{trimByWords(description, 55)}</p>
        </div>

        {/* Buttons */}
        <div className="col-12 mt-auto">
          <div className="d-flex gap-2 justify-content-end px-3">
            <a
              href={demoCode}
              className="no-underline d-flex align-items-center gap-2 btn btn-primary"
            >
              Code <FaGithub size={18} />
            </a>

            <a
              href={liveLink}
              className="no-underline d-flex align-items-center gap-2 btn btn-primary"
            >
              Demo <MdEmojiPeople size={18} />
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectCard;
