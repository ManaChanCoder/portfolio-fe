import { create } from "zustand";
import { persist } from "zustand/middleware";

const apiUrl = import.meta.env.DEV
  ? import.meta.env.VITE_LOCAL_API
  : import.meta.env.VITE_PRODUCTION_API;

type TAccountState = {
  username: string;
  isLoggedIn: boolean;
  loading: boolean;
  login: (username: string, password: string) => Promise<{ success: boolean }>;
  logout: () => void;
  checkAuth: () => Promise<boolean>;

  contactError: string | null;
  contactSuccess: boolean;
  sendContact: (payload: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }) => Promise<void>;
  resetContactStatus: () => void;
};

export const accountStore = create<TAccountState>()(
  persist(
    (set) => ({
      username: "",
      isLoggedIn: false,
      loading: false,

      contactError: null,
      contactSuccess: false,
      sendContact: async (payload: {
        name: string;
        email: string;
        subject: string;
        message: string;
      }) => {
        set({
          loading: true,
          contactError: null,
          contactSuccess: false,
        });
        try {
          const res = await fetch(`${apiUrl}/account/contact`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
          if (!res.ok) {
            const data = await res.json();
            throw new Error(data.message || "Failed to send message");
          }
          set({ loading: false, contactSuccess: true });
        } catch (error) {
          console.log((error as Error).message);
          set({
            loading: false,
            contactError: (error as Error).message,
            contactSuccess: false,
          });
        }
      },

      resetContactStatus: () =>
        set({ contactSuccess: false, contactError: null }),

      login: async (
        username: string,
        password: string,
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
          localStorage.setItem("token", data.token);

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
      logout: () => {
        localStorage.removeItem("token");
        console.log("it clicked");
        set({ username: "", isLoggedIn: false });
      },

      checkAuth: async () => {
        const token = localStorage.getItem("token");
        if (!token) return false;

        try {
          const res = await fetch(`${apiUrl}/account/dashboard`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (!res.ok) {
            localStorage.removeItem("token");
            set({ isLoggedIn: false, username: "" });
            return false;
          }

          const data = await res.json();
          set({ isLoggedIn: true, username: data.username });
          return true;
        } catch (error) {
          console.log(`Internal Error: ${error}`);
          localStorage.removeItem("token");
          set({ isLoggedIn: false, username: "" });
          return false;
        }
      },
    }),
    {
      name: "account-storage",
    },
  ),
);
