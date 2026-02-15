import React, { useState, useEffect } from "react";
import { accountStore } from "../store/accountStore";
import { themeStore, scrollBehavior } from "../store/themeStore";
import { ToastContainer, toast } from "react-toastify";
import { Oval } from "react-loader-spinner";
import Navbar from "../shared/components/Navbar";
import ShowCase from "../components/ShowCase";

import { AnimatePresence, motion } from "framer-motion";
import { IoArrowUp } from "react-icons/io5";

const useScrollBehavior = scrollBehavior;

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const {
    loading,
    contactError,
    contactSuccess,
    sendContact,
    resetContactStatus,
  } = accountStore();
  const isDark = themeStore((state) => state.isDark);
  const isVisible = useScrollBehavior((state) => state.isVisible);
  const setVisible = useScrollBehavior((state) => state.setVisible);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendContact(form);
  };

  useEffect(() => {
    if (contactSuccess) {
      toast.success("Message sent!");
      setForm({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => resetContactStatus(), 500);
    }
    if (contactError) {
      toast.error(contactError);
      setTimeout(() => resetContactStatus(), 500);
    }
  }, [contactSuccess, contactError, resetContactStatus]);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, [setVisible]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      // shift+Enter → to make new line
      e.preventDefault(); // i-prevent default line break
      handleSubmit(e);
    }
  };

  return (
    <div className={isDark ? "dark-bg text-white" : "light-bg text-black"}>
      <Navbar />
      <div className="container mt-5 pb-5">
        <div
          className="d-flex flex-column flex-md-row gap-4 align-items-stretch"
          style={{ minHeight: 400 }}
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, type: "spring", stiffness: 50 }}
            className="col-12 col-md-5 mb-4 mb-md-0"
          >
            <ShowCase />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, type: "spring", stiffness: 50 }}
            className="col-12 col-md-7"
          >
            <h2>Contact Us</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Subject</label>
                <input
                  type="text"
                  className="form-control"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Message</label>
                <textarea
                  className="form-control"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  required
                  rows={4}
                />
              </div>
              <div className="d-flex justify-content-center w-100">
                <button
                  type="submit"
                  className="btn btn-primary w-50 d-flex justify-content-center"
                  disabled={loading}
                >
                  {loading ? (
                    <Oval
                      visible={true}
                      height="30"
                      width="30"
                      color="#08f838"
                      ariaLabel="oval-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                      strokeWidth={4}
                      strokeWidthSecondary={2}
                    />
                  ) : (
                    <span>Send</span>
                  )}
                </button>
              </div>
              <ToastContainer position="top-center" autoClose={3000} />
            </form>
          </motion.div>
        </div>
        {/* Map at the bottom */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 0.5,
            type: "spring",
            stiffness: 50,
          }}
          className="mt-5 w-100"
          style={{ minHeight: 300 }}
        >
          <iframe
            title="Google Map"
            width="100%"
            height="400"
            style={{ border: 0, borderRadius: 12 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://maps.google.com/maps?q=14.7446693,121.1317302&hl=es;z=14&output=embed&t=k`}
          ></iframe>
        </motion.div>
        <AnimatePresence>
          {isVisible && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 12,
                mass: 1,
              }}
              onClick={scrollToTop}
              style={{ bottom: "100px", right: "10px" }}
              className="position-fixed btn btn-primary text-white rounded-cirle py-2 px-3 rounded-circle"
            >
              <IoArrowUp size={25} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Contact;
