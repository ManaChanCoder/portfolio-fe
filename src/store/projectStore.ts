import { create } from "zustand";

const apiUrl =
  import.meta.env.VITE_PRODUCTION_API || import.meta.env.VITE_LOCAL_API;

type TProjectState = {
  _id?: string;
  title: string;
  description: string;
  demoCode: string;
  liveLink: string;
  urlImg: string;
};
type TProjectStore = {
  projects: TProjectState[];
  computedProj: number;
  loading: boolean;
  fetchProj: () => Promise<void>;
  addProject: (
    project: TProjectState
  ) => Promise<{ message: string; success: boolean | undefined }>;
  deleteProject: (id: string) => Promise<{ message: string; success: boolean }>;
  editProject: (id: string, updatedProject: TProjectState) => Promise<void>;
};

export const projectStore = create<TProjectStore>((set) => ({
  // get projects
  projects: [],
  computedProj: 0,
  loading: true,

  // fetching project
  fetchProj: async () => {
    set({ loading: true });
    try {
      const res = await fetch(`${apiUrl}/project/get-projects`);
      if (!res.ok) {
        throw new Error("Fecthing error");
      }
      const data = await res.json();
      set({
        projects: data.data,
        computedProj: (data.data || []).length,
        loading: false,
      });
    } catch (error) {
      console.log("Fetching Internal error: ", (error as Error).message);
    }
  },

  //   add project
  addProject: async (project: TProjectState) => {
    set({ loading: true });
    try {
      const res = await fetch(`${apiUrl}/project/create-project`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(project),
      });
      const data = await res.json();
      if (!res.ok) {
        // throw new Error(`Failed to Add project: ${data.message}`);
        throw new Error(data.message || "Failed to add project");
      }

      set((state) => ({
        projects: [...state.projects, data.data],
        computedProj: state.projects.length + 1,
        loading: false,
      }));
      return {
        message: data.message || "Project added successfully",
        success: true,
      };
    } catch (error) {
      const err = error as Error;
      set({ loading: false });
      return { message: err.message, success: false };
    }
  },

  // delete project by id
  deleteProject: async (id: string) => {
    set({ loading: true });
    try {
      const res = await fetch(`${apiUrl}/project/delete-project/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.success) {
        set((state) => ({
          projects: state.projects.filter((proj) => proj._id !== id),
          computedProj: state.projects.length - 1,
          loading: false,
        }));
      } else {
        throw new Error(data.message || "Delete failed");
      }
      return { message: data.message || "Delete successfully", success: true };
    } catch (error) {
      const err = error as Error;
      return { message: err.message, success: false };
    }
  },
  // edit project by id
  editProject: async (id: string, updatedProject: TProjectState) => {
    set({ loading: true });
    try {
      const res = await fetch(`${apiUrl}/project/edit-project/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProject),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to edit project");
      }

      set((state) => ({
        projects: state.projects.map((proj) =>
          proj._id === id ? data.data : proj
        ),
        loading: false,
      }));
    } catch (error) {
      const err = error as Error;
      console.log("Edit failed: ", err.message);
    }
  },
}));
