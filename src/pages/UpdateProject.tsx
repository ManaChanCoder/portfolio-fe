import { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";

// store
import { themeStore } from "../store/themeStore";
import { projectStore } from "../store/projectStore";

// icons
import { MdClose } from "react-icons/md";

type TFormUpdate = {
  _id?: string;
  title: string;
  description: string;
  demoCode: string;
  liveLink: string;
  urlImg: string;
};

const UpdateProject = () => {
  const isDark = themeStore((state) => state.isDark);
  const { projects, fetchProj, editProject, loading } = projectStore();
  const [selectedProj, setSelectedProj] = useState<TFormUpdate>({
    title: "",
    description: "",
    demoCode: "",
    liveLink: "",
    urlImg: "",
  });

  useEffect(() => {
    fetchProj();
  }, [fetchProj, editProject]);

  const updateSelectedProj = (selecForm: TFormUpdate) => {
    setSelectedProj(selecForm);
  };

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setSelectedProj((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const formUpdateSubmit = async () => {
    try {
      if (!selectedProj._id) {
        console.log("ID not found!");
        return;
      } else if (!selectedProj) {
        console.log("Filled required!");
      } else {
        await editProject(selectedProj._id, selectedProj);

        setSelectedProj({
          title: "",
          description: "",
          demoCode: "",
          liveLink: "",
          urlImg: "",
        });
      }
    } catch (error) {
      console.log("failed: ", (error as Error).message);
    }
  };

  return (
    <div
      className={`w-100 p-3 overflow-y-scroll ${
        isDark ? "dark-bg" : "light-bg"
      }`}
      style={{ minHeight: "100vh" }}
    >
      {/* Modal */}
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className={`modal-content ${isDark ? "dark-bg" : "light-bg"}`}>
            <div className="modal-header justify-content-between">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Update Modal
              </h1>

              <MdClose
                data-bs-dismiss="modal"
                aria-label="Close"
                size={25}
                className="cursor-pointer"
              />
            </div>
            <div className="modal-body">
              {/* form update */}
              <form
                action=""
                id="formUpdate"
                onSubmit={formUpdateSubmit}
                className="d-flex flex-column gap-2"
              >
                <div className="d-flex gap-2 w-100">
                  <input
                    type="text"
                    name="title"
                    value={selectedProj.title}
                    onChange={handleOnChange}
                    placeholder="Project title..."
                    className="w-50 outline-none border-0 px-2 py-1 rounded-1"
                  />
                  <input
                    type="text"
                    name="urlImg"
                    value={selectedProj.urlImg}
                    onChange={handleOnChange}
                    placeholder="Url image..."
                    className="w-50 outline-none border-0 px-2 py-1 rounded-1"
                  />
                </div>

                <div className="d-flex gap-2 w-100">
                  <input
                    type="text"
                    name="demoCode"
                    value={selectedProj.demoCode}
                    onChange={handleOnChange}
                    placeholder="Demo code..."
                    className="w-50 outline-none border-0 px-2 py-1 rounded-1"
                  />
                  <input
                    type="text"
                    name="liveLink"
                    value={selectedProj.liveLink}
                    onChange={handleOnChange}
                    placeholder="Live link..."
                    className="w-50 outline-none border-0 px-2 py-1 rounded-1"
                  />
                </div>

                <textarea
                  name="description"
                  value={selectedProj.description}
                  onChange={handleOnChange}
                  id=""
                  rows={6}
                  className="w-100 rounded-1 border-0 outline-none px-2 py-1"
                  placeholder="Project Description"
                ></textarea>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                aria-label="Close"
                data-bs-dismiss="modal"
                className="btn btn-primary"
              >
                Close
              </button>

              <button
                type="submit"
                aria-label="Close"
                data-bs-dismiss="modal"
                className="btn btn-primary"
                form="formUpdate"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
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
                    className="card-text overflow-y-scroll"
                    style={{ maxHeight: "150px" }}
                  >
                    {v?.description}
                  </p>

                  <button
                    type="button"
                    className="btn btn-primary mt-2 view-del-btn"
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
                    onClick={() => updateSelectedProj(v)}
                  >
                    Update
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

export default UpdateProject;
