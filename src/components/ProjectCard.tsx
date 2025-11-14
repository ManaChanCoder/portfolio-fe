import type { CSSProperties } from "react";
type TProjectCardSate = {
  title: string;
  description: string;
  demoCode: string;
  liveLink: string;
  urlImg: string;
};
type ButtonState = CSSProperties;

// icons
import { FaGithub } from "react-icons/fa";
import { MdEmojiPeople } from "react-icons/md";

// store
import { themeStore } from "../store/themeStore";

const ProjectCard = ({
  title,
  description,
  demoCode,
  liveLink,
  urlImg,
}: TProjectCardSate) => {
  const buttonStyle: ButtonState = {
    position: "absolute",
    bottom: "20px",
    right: "10px",
  };

  const isDark = themeStore((state) => state.isDark);

  return (
    <div
      className={`container-fluid my-3 mx-2 ${
        isDark ? "text-white" : "text-black"
      }`}
    >
      <div
        className="row rounded-3 card-container pb-3 position-relative"
        style={{ minHeight: "600px", height: "100%" }}
      >
        <div className="col-12 p-0">
          <img
            src={urlImg}
            alt="project image"
            style={{ height: "230px", width: "100%" }}
            className=" rounded-top-3"
          />
        </div>

        <div className="col-12 my-3">
          <h3 className="fw-semibold">{title}</h3>
          <p>{description}</p>
        </div>

        <div className="col-12" style={buttonStyle}>
          <div className="d-flex gap-2 justify-content-end">
            <a
              href={demoCode}
              className="no-underline d-flex align-items-center gap-2 btn btn-primary"
            >
              Code
              <FaGithub size={18} />
            </a>
            <a
              href={liveLink}
              className="no-underline d-flex gap-2 align-items-center btn btn-primary"
            >
              Demo
              <MdEmojiPeople size={18} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
