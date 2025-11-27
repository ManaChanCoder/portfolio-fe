import { motion } from "framer-motion";

import "./pages.css";
// store
import { themeStore } from "../store/themeStore";

// components
import Navbar from "../shared/components/Navbar";

// icons
import { LuBriefcaseBusiness } from "react-icons/lu";
import { FiTool } from "react-icons/fi";
import { CiLink } from "react-icons/ci";
import { FaRegLightbulb } from "react-icons/fa";

type TToolState = {
  tool?: string;
  skill?: string;
  description: string;
};

type TEducationState = {
  schoolName: string;
  gradeLvl: string;
  address: string;
  yearSE: string;
  course?: string;
};

const Resume = () => {
  const isDark = themeStore((state) => state.isDark);

  const toolsUsed: TToolState[] = [
    { tool: "Git & Github", description: "Basic version control" },
    { tool: "VS Code", description: "Code. Edit. Build." },
    { tool: "MongoDB Atlas", description: "Beginner level" },
  ];

  const skills: TToolState[] = [
    { skill: "HTML & CSS", description: "layouts, forms, simple designs" },
    { skill: "Javascript", description: "Simple function, event handling" },
    { skill: "React.js", description: "Component, useState, useEffect" },
    { skill: "Bootstrap & TailwindCSS", description: "Basic layout/styling" },
    { skill: "MongoDB", description: "Basic database setup and structure" },
  ];

  const education: TEducationState[] = [
    // elementary
    {
      schoolName: "Marick Elementary School",
      gradeLvl: "Elementary",
      yearSE: "2014 - 2015",
      address: "H4M6+FJ5, Gloria St, Cainta, 1900 Rizal",
    },
    // Highschool
    {
      schoolName: "Francisco P. Felix Memorial National Highschool",
      gradeLvl: "Secondary",
      yearSE: "2018 - 2019",
      address: "Municipal Compound, Sto Domingo, Cainta, 1900 Rizal",
    },
    // K-12
    {
      schoolName: "Gardner College",
      gradeLvl: "K-12",
      yearSE: "2019 - 2021",
      address:
        "J482+WHJ, RDS Building Felix Avenue Corner Sta Lucia Drive, Pasig, 1900 Rizal",
      course: "Information and Communications Technology - (ICT)",
    },
    // College
    {
      schoolName: "Colegio De Montalban",
      gradeLvl: "College",
      yearSE: "2021 - 2025",
      address: "Kasiglahan Village, Rodriguez, Rizal",
      course: "Bachelor of science in Information Technology - (BSIT)",
    },
  ];

  const learningExp: [string, string, string, string] = [
    "Practicing building small web apps using React and plain JavaScript",
    "Created simple UI designs using Bootstrap and Tailwind CSS",
    "Learning how to connect frontend to backend using the MERN stack",
    "Gaining knowledge through self-paced coding and basic CRUD operations with MongoDB",
  ];

  return (
    <div
      className={`${isDark ? "dark-bg" : "light-bg"}`}
      style={{ minHeight: "100vh", maxHeight: "100%" }}
    >
      <Navbar />
      <div className="p-5">
        <motion.h1
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, type: "spring", stiffness: 50 }}
        >
          Resume
        </motion.h1>
        <hr />
        {/* resume container */}
        <div className="row">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.4,
              type: "spring",
              stiffness: 50,
              delay: 0.2,
            }}
            className="col-sm-12 col-lg-5"
          >
            <div className="mb-3">
              <h6 className="text-uppercase">Language</h6>
              <span className="d-block">Filipino (Native)</span>
              <span className="d-block">English (Basic/Conversational)</span>
            </div>

            <div className="mb-3">
              <h6 className="text-uppercase">Contact</h6>
              <span className="d-block">sainggarhogenn@gmail.com</span>
              <span className="d-block">09923358395</span>
            </div>

            <div className="mb-3">
              <div className="d-flex gap-2">
                <LuBriefcaseBusiness size={15} />
                <h6 className="text-uppercase">Internship Experience</h6>
              </div>
              <span className="d-block">
                Web Content Assistant - Ollopa Corporation
              </span>
              <span className="d-block">March 2025 - June 2025</span>
            </div>

            <div className="mb-3">
              <div className="d-flex gap-2">
                <FiTool size={15} />
                <h6 className="text-uppercase">Tools Used:</h6>
              </div>

              {/* table for tools used */}
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",

                  color: isDark ? "#fff" : "#000",
                }}
                className={
                  isDark ? "dark-bg table-size" : "light-bg table-size"
                }
              >
                <thead>
                  <tr>
                    <th style={{ borderBottom: "1px solid", padding: "8px" }}>
                      #
                    </th>
                    <th style={{ borderBottom: "1px solid", padding: "8px" }}>
                      Tools
                    </th>
                    <th style={{ borderBottom: "1px solid", padding: "8px" }}>
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {toolsUsed.map((t, i) => (
                    <tr
                      key={i}
                      style={{
                        color: isDark ? "#fff" : "#000",
                      }}
                    >
                      <td style={{ padding: "8px", borderBottom: "1px solid" }}>
                        {i + 1}
                      </td>
                      <td style={{ padding: "8px", borderBottom: "1px solid" }}>
                        {t.tool}
                      </td>
                      <td style={{ padding: "8px", borderBottom: "1px solid" }}>
                        {t.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mb-3">
              <h6 className="text-uppercase">Skills</h6>
              {/* table for skills */}
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",

                  color: isDark ? "#fff" : "#000",
                }}
                className={
                  isDark ? "dark-bg table-size" : "light-bg table-size"
                }
              >
                <thead>
                  <tr>
                    <th style={{ borderBottom: "1px solid", padding: "8px" }}>
                      #
                    </th>
                    <th style={{ borderBottom: "1px solid", padding: "8px" }}>
                      Skill
                    </th>
                    <th style={{ borderBottom: "1px solid", padding: "8px" }}>
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {skills.map((t, i) => (
                    <tr
                      key={i}
                      style={{
                        color: isDark ? "#fff" : "#000",
                      }}
                    >
                      <td style={{ padding: "8px", borderBottom: "1px solid" }}>
                        {i + 1}
                      </td>
                      <td style={{ padding: "8px", borderBottom: "1px solid" }}>
                        {t.skill}
                      </td>
                      <td style={{ padding: "8px", borderBottom: "1px solid" }}>
                        {t.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mb-3 user-select-none">
              <p className="m-0 d-flex gap-2 align-items-center">
                Github:{" "}
                <a href="https://github.com/ManaChanCoder" target="_blank">
                  Click me
                  <CiLink size={23} className="ms-2" />
                </a>
              </p>
              <p>
                Portfolio:{" "}
                <a
                  href="https://portfolio-fe-gamma.vercel.app/"
                  target="_blank"
                >
                  Click me
                  <CiLink size={23} className="ms-2" />
                </a>
              </p>
            </div>

            <div className="mb-3 d-flex">
              <div className="w-75">
                <h6 className="text-uppercase">Address</h6>
                <p>
                  Calavinti st, srs corner kasiglahan rd, Brgy San Jose
                  Rodriguez Montalban Rizal
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.4,
              type: "spring",
              stiffness: 50,
              delay: 0.2,
            }}
            className="col-sm-12 col-lg-7"
          >
            <div className="mb-3">
              <h1>Rhogenn G. Saingga</h1>
              <h5>Aspiring Frontend Developer</h5>
              <p>
                A BSIT graduate from Colegio de Montalban with basic knowledge
                of HTML, CSS, JavaScript, and React.js. I am passionate about
                web development and eager to join a company where I can grow as
                a frontend developer. I aim to apply my skills, gain hands-on
                experience, and improve through real-world projects. I'm
                committed to learning, collaborating with teams, and
                contributing to building responsive and user-friendly web
                applications using modern tools and practices.
              </p>
              <hr />
            </div>

            <div className="mb-3">
              <h4 className="text-uppercase">Education</h4>

              {education.map((edu, i) => (
                <div className="mb-3" key={i}>
                  <h6>{edu.gradeLvl}</h6>
                  <span className="d-block">{edu.schoolName}</span>
                  <span className="d-block">{edu.address}</span>
                  <span className="d-block">{`${edu.yearSE} ${
                    edu.course ? `• ${edu.course}` : ""
                  } `}</span>
                </div>
              ))}
              <hr />
            </div>

            <div className="mb-3">
              <div className="d-flex gap-2">
                <FaRegLightbulb size={15} />
                <h6 className="text-uppercase">Learning experience</h6>
              </div>
              <ul>
                {learningExp.map((learn, i) => (
                  <li key={i}>{learn}</li>
                ))}
              </ul>
              <hr />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Resume;
