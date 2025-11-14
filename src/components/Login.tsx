import "./component.css";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";

import { themeStore } from "../store/themeStore";
import { accountStore } from "../store/accountStore";

// icons
import { FaRegUser } from "react-icons/fa";
import { FiEyeOff, FiEye } from "react-icons/fi";
import { IoArrowBackCircle } from "react-icons/io5";

type TAccountState = {
  username: string;
  password: string;
};
export default function Login() {
  const isDark = themeStore((state) => state.isDark);
  const [showPassword, setShowPassword] = useState(false);
  // const login = accountStore((state) => state.login);
  const { login, isLoggedIn, loading } = accountStore();
  const [user, setUser] = useState<TAccountState>({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/admin/welcome");
    }
  }, [isLoggedIn, navigate]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //   handle login
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await login(user.username, user.password);
      if (!result.success) toast.error("username or password are incorrect!");
    } catch (error) {
      console.log("Login failed: ", error);
    }
  };

  return (
    <div
      style={{ height: "100vh" }}
      className={`d-flex justify-content-center align-items-center ${
        isDark ? "dark-bg" : "light-bg"
      }`}
    >
      <ToastContainer />
      {loading ? (
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
      ) : (
        <div
          className={`login-size px-3 py-4 rounded-2 ${
            isDark ? "form-bg-dark" : "form-bg-light"
          }`}
        >
          <Link to="/" className={`${isDark ? "text-black" : "text-white"}`}>
            <IoArrowBackCircle size={30} className="cursor-pointer" />
          </Link>
          <h4 className="text-center mb-5">Admin Login Form</h4>

          <form onSubmit={handleLogin} className="">
            <div
              className={`mb-1 w-100 bg-white d-flex align-items-center px-1 ${
                isDark ? "input-dark-mode" : "rounded-1"
              }`}
            >
              <input
                type="text"
                className="p-1 border-0 bg-transparent outline-none w-100"
                name="username"
                value={user.username}
                onChange={handleOnChange}
              />
              <FaRegUser className="text-black" size={20} />
            </div>
            <div
              className={`mb-3 w-100 bg-white d-flex align-items-center px-1 ${
                isDark ? "input-dark-mode" : "rounded-1"
              }`}
            >
              <input
                type={showPassword ? "text" : "password"}
                className="p-1 border-0 bg-transparent outline-none w-100"
                name="password"
                value={user.password}
                onChange={handleOnChange}
              />
              {user.password.length > 0 ? (
                showPassword ? (
                  <FiEye
                    onClick={togglePasswordVisibility}
                    className="text-black cursor-pointer"
                    size={20}
                  />
                ) : (
                  <FiEyeOff
                    onClick={togglePasswordVisibility}
                    className="text-black cursor-pointer"
                    size={20}
                  />
                )
              ) : null}
            </div>
            <button
              type="submit"
              className={`w-100 rounded-1 fs-4 login-btn border-0 ${
                isDark ? "login-btn-dark" : "login-btn-light"
              }`}
            >
              Login
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
