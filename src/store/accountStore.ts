import { create } from "zustand";
import { persist } from "zustand/middleware";
const apiUrl =
  import.meta.env.VITE_LOCAL_API || import.meta.env.VITE_PRODUCTION_API;

type TAccountState = {
  username: string;
  isLoggedIn: boolean;
  loading: boolean;
  login: (username: string, password: string) => Promise<{ success: boolean }>;
  logout: () => void;
};

export const accountStore = create<TAccountState>()(
  persist(
    (set) => ({
      username: "",
      isLoggedIn: false,
      loading: false,

      login: async (
        username: string,
        password: string
      ): Promise<{ success: boolean }> => {
        set({ loading: true, isLoggedIn: false });
        try {
          const res = await fetch(`${apiUrl}/account/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
          });
          const data = await res.json();
          if (!res.ok) {
            throw new Error(data.message || "login failed");
          }

          set({ username: data.username, isLoggedIn: true, loading: false });
          return { success: true };
        } catch (error) {
          console.log("Login failed: ", (error as Error).message);
          set({ loading: false, isLoggedIn: false });
          return { success: false };
        }
      },
      logout: () => set({ username: "", isLoggedIn: false }),
    }),
    {
      name: "account-storage",
    }
  )
);
