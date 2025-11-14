import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "./pages.css";

// store
import { themeStore } from "../store/themeStore";
import { projectStore } from "../store/projectStore";

// icons
import { CgAddR } from "react-icons/cg";

type TFormState = {
  title: string;
  description: string;
  demoCode: string;
  liveLink: string;
  urlImg: string;
};
const CreateProject = () => {
  const isDark = themeStore((state) => state.isDark);
  const addProject = projectStore((state) => state.addProject);
  const [formProj, setFormProj] = useState<TFormState>({
    title: "",
    description: "",
    demoCode: "",
    liveLink: "",
    urlImg: "",
  });

  const submitProj = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await addProject(formProj);

      if (result.success) {
        toast.success(result.message);
        setFormProj({
          title: "",
          description: "",
          demoCode: "",
          liveLink: "",
          urlImg: "",
        });
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.log("failed submittion: ", (error as Error).message);
    }
  };

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormProj((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className={`w-100 p-3 ${isDark ? "dark-bg" : "light-bg"}`}>
      <h2 className="">Add Project</h2>
      <hr />
      <ToastContainer />
      <form
        onSubmit={submitProj}
        className="mt-3 d-flex flex-column align-items-center gap-3 py-2 w-100"
      >
        <h4 className="">Form</h4>

        <div className="d-flex gap-2 w-75">
          <div className="w-50">
            <label htmlFor="title" className="d-block">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formProj.title}
              onChange={handleOnChange}
              className={`w-100 outline-none border-0 px-2 py-1 rounded-1 ${
                isDark ? "" : "bg-body-secondary"
              }`}
            />
          </div>
          <div className="w-50">
            <label htmlFor="urlImg" className="d-block">
              Image link address
            </label>
            <input
              type="text"
              name="urlImg"
              value={formProj.urlImg}
              onChange={handleOnChange}
              className={`w-100 outline-none border-0 px-2 py-1 rounded-1 ${
                isDark ? "" : "bg-body-secondary"
              }`}
            />
          </div>
        </div>

        <div className="d-flex gap-2 w-75">
          <div className="w-50">
            <label htmlFor="demoCode" className="d-block">
              Code repo link
            </label>
            <input
              type="text"
              name="demoCode"
              value={formProj.demoCode}
              onChange={handleOnChange}
              className={`w-100 outline-none border-0 px-2 py-1 rounded-1 ${
                isDark ? "" : "bg-body-secondary"
              }`}
            />
          </div>
          <div className="w-50">
            <label htmlFor="liveLink" className="d-block">
              Domain link
            </label>
            <input
              type="text"
              name="liveLink"
              value={formProj.liveLink}
              onChange={handleOnChange}
              className={`w-100 outline-none border-0 px-2 py-1 rounded-1 ${
                isDark ? "" : "bg-body-secondary"
              }`}
            />
          </div>
        </div>

        <div className="w-75">
          <label htmlFor="description" className="d-block">
            Project description
          </label>
          <textarea
            name="description"
            value={formProj.description}
            onChange={handleOnChange}
            id=""
            rows={6}
            className={`w-100 rounded-1 border-0 outline-none px-2 py-1 ${
              isDark ? "" : "bg-body-secondary"
            }`}
          ></textarea>
        </div>

        <button type="submit" className="py-2 px-3 rounded-1 btn btn-success">
          <CgAddR size={25} />
        </button>
      </form>
    </div>
  );
};

export default CreateProject;
