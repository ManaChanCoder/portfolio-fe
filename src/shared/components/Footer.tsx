import "./share-components.css";
// icons
import { FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa";

import { themeStore } from "../../store/themeStore";

export default function Footer() {
  const isDark = themeStore((state) => state.isDark);

  return (
    <div className={isDark ? "footer-dark" : "footer-light"}>
      <footer className="d-flex justify-content-between py-3 px-5 container-fluid">
        <span>ManachanCoder © 2025</span>
        <span>Frontend Developer | Slight Knowledgeable in MERN Stack</span>
        <div className="d-flex gap-3">
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
