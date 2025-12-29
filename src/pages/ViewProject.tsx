import { useEffect } from "react";
import { Oval } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
// store
import { projectStore } from "../store/projectStore";
import { themeStore } from "../store/themeStore";

const ViewProject = () => {
  const { projects, fetchProj, loading, deleteProject } = projectStore();
  const isDark = themeStore((state) => state.isDark);

  useEffect(() => {
    fetchProj();
  }, [fetchProj]);

  const delProj = async (id: string) => {
    const result = await deleteProject(id);
    if (result.success) toast.success(result.message);
    else toast.error(result.message);
  };

  return (
    <div
      className={`w-100 p-3 overflow-y-scroll ${
        isDark ? "dark-bg" : "light-bg"
      }`}
    >
      <ToastContainer />
      {loading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          {/* <span className="fs-5">Loading...</span> */}
          <Oval
            height={80}
            width={80}
            color="#4fa94d"
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#4fa94d"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        </div>
      ) : projects.length > 0 ? (
        <div className="row g-4">
          {projects.map((v) => (
            <div key={v._id} className="col-12 col-md-6 col-xl-4">
              <div className="h-100 card position-relative">
                <img
                  src={v?.urlImg}
                  className="card-img-top"
                  alt="Project Image"
                  style={{ height: "230px" }}
                />
                <div className="card-body mb-5">
                  <h5 className="card-title mb-3">{v?.title}</h5>
                  <p
                    className="card-text overflow-y-scroll hide-scrollbar"
                    style={{ maxHeight: "150px" }}
                  >
                    {v?.description}
                  </p>
                  <button
                    onClick={() => v._id && delProj(v._id)}
                    className="btn btn-danger mt-2 view-del-btn"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <span className="fs-5">No Data Found</span>
        </div>
      )}
    </div>
  );
};

export default ViewProject;
