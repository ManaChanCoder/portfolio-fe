import { Route, Routes } from "react-router-dom";

// components
import Home from "./pages/Home";
import Login from "./components/Login";

import AdminLayout from "./layout/AdminLayout";
import Dashboard from "./pages/Dashboard";
import CreateProject from "./pages/CreateProject";
import ViewProject from "./pages/ViewProject";
import UpdateProject from "./pages/UpdateProject";
import Project from "./pages/Project";
import Resume from "./pages/Resume";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projects" element={<Project />} />
      <Route path="/resume" element={<Resume />} />
      <Route path="/login" element={<Login />} />

      <Route path="/admin" element={<AdminLayout />}>
        <Route path="welcome" element={<Dashboard />} />
        {/* project route */}
        <Route path="create/project" element={<CreateProject />} />
        <Route path="update/project" element={<UpdateProject />} />
        <Route path="view/project" element={<ViewProject />} />
      </Route>
    </Routes>
  );
};

export default App;
