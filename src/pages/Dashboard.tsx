// import WelcomeDashboard from "../components/WelcomeDashboard";
import "./pages.css";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";

// store
import { themeStore } from "../store/themeStore";
import { projectStore } from "../store/projectStore";

const Dashboard = () => {
  const isDark = themeStore((state) => state.isDark);
  const { computedProj, fetchProj, loading } = projectStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProj();
  }, [fetchProj]);
  return (
    <div className={`w-100 p-3 ${isDark ? "dark-bg" : "light-bg"}`}>
      <h2 className="text-center">Administration Dashboard</h2>
      <hr />

      <div className="mt-3">
        <h4 className="dash-letter-spacing">Dashboard</h4>
        <p>
          Manage your portfolio efficiently everything you need is right here.
          Keep your projects up to date, refine your resume, and ensure your
          portfolio reflects your latest skills and achievements.
        </p>
        <p>
          This dashboard gives you full control to create, update, and organize
          your content with ease. When you’re done, you can safely log out
          knowing your work is saved and ready to shine on your portfolio site.
        </p>
      </div>

      <div className="row mt-2">
        <div className="col-6">
          <div
            className="card-shad rounded-3 p-3 position-relative"
            style={{ height: "260px" }}
          >
            <h5 className="">Projects</h5>
            <hr />
            <span className="d-block">
              View and manage your projects that reflect creativity, skills, and
              growth. Update or organize them anytime to keep your portfolio
              current and professional. Click below to explore all your works
              and see your total project progress.
            </span>

            <div className="d-flex gap-2 align-items-center mt-2">
              <span>Total:</span>
              {loading && (
                <ThreeDots
                  height="20"
                  width="20"
                  radius="9"
                  color="#4fa94d"
                  ariaLabel="three-dots-loading"
                  // wrapperStyle={{ margin: "" }}
                  wrapperClass="custom-loader"
                  visible={true}
                />
              )}
              {computedProj < 0 ? (
                <span className="d-block">No data found</span>
              ) : (
                <span className="d-block">{!loading && computedProj}</span>
              )}
            </div>
            <Link to="../view/project">
              <button className="btn btn-primary card-shad-btn">
                View All
              </button>
            </Link>
          </div>
        </div>
        <div className="col-6">
          <div
            className="card-shad rounded-3 p-3 position-relative"
            style={{ height: "260px" }}
          >
            <h5>Resume - CV</h5>
            <hr />

            <span className="d-block">
              Manage and update your professional journey through your resume.
              Add new experiences, education, and skills to keep it current.
              Click below to review or edit your CV and ensure your portfolio
              always reflects your latest achievements and expertise.
            </span>

            <div className="d-flex justify-content-end">
              <button
                onClick={() => navigate("/resume")}
                className="btn btn-primary card-shad-btn"
              >
                View CV
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
