import "./share-components.css";
// icons
import { FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa";

import { themeStore } from "../../store/themeStore";

export default function Footer() {
  const isDark = themeStore((state) => state.isDark);

  return (
    <div className={isDark ? "footer-dark" : "footer-light"}>
      <footer className="d-flex flex-column flex-md-row gap-2 gap-md-0 justify-content-between py-3 px-5 container-fluid">
        <span className="text-center">ManachanCoder © 2025</span>
        <span className="text-center">
          Frontend Developer | Slight Knowledgeable in MERN Stack
        </span>
        <div className="d-flex justify-content-center justify-content-md-start gap-3">
          <a
            href="https://github.com/ManaChanCoder?tab=repositories"
            className={`underline-none ${isDark ? "text-white" : "text-black"}`}
          >
            <FaGithub size={25} className="s-link-effect cursor-pointer" />
          </a>
          <a
            href="https://www.linkedin.com/feed/"
            className={`underline-none ${isDark ? "text-white" : "text-black"}`}
          >
            <FaLinkedin size={25} className="s-link-effect cursor-pointer" />
          </a>
          <a
            href="https://www.facebook.com/Rhogenn"
            className={`underline-none ${isDark ? "text-white" : "text-black"}`}
          >
            <FaFacebook size={25} className="s-link-effect cursor-pointer" />
          </a>
        </div>
      </footer>
    </div>
  );
}
