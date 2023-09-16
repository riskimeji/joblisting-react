import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Admin/Dashboard";
import Login from "./components/Auth/Login";
import Users from "./pages/Admin/User/Users";
import Jobs from "./pages/Admin/Job/Jobs";
import Register from "./components/Auth/Register";
import Jobcreate from "./pages/Admin/Job/Jobcreate";
import IndexHome from "./pages/Public/IndexHome";
import JobPage from "./pages/Public/Job/JobPage";
import JobEdit from "./pages/Admin/Job/JobEdit";
import UserEdit from "./pages/Admin/User/UserEdit";
import UserAdd from "./pages/Admin/User/UserAdd";

//Admin

import Career from "./pages/Admin/Career/Career";
import CareerCreate from "./pages/Admin/Career/CareerCreate";
import CareerEdit from "./pages/Admin/Career/CareerEdit";

import Category from "./pages/Admin/Category/Category";
import CategoryCreate from "./pages/Admin/Category/CategoryCreate";
import CategoryEdit from "./pages/Admin/Category/CategoryEdit";

import Subscription from "./pages/Admin/Subscription/Subscription";

import JobType from "./pages/Admin/JobType/JobType";
import JobTypeCreate from "./pages/Admin/JobType/JobTypeCreate";
import JobTypeEdit from "./pages/Admin/JobType/JobTypeEdit";

//User
import UserPage from "./pages/User/UserPage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* Admin */}
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/career" element={<Career />} />
          <Route path="/career/create" element={<CareerCreate />} />
          <Route path="/career/edit/:uuid" element={<CareerEdit />} />

          <Route path="/category" element={<Category />} />
          <Route path="/category/create" element={<CategoryCreate />} />
          <Route path="/category/edit/:uuid" element={<CategoryEdit />} />

          <Route path="/jobs/edit/:uuid" element={<JobEdit />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/jobs/create" element={<Jobcreate />} />

          <Route path="/users/edit/:uuid" element={<UserEdit />} />
          <Route path="/users/create" element={<UserAdd />} />
          <Route path="/users" element={<Users />} />

          <Route path="/subscription" element={<Subscription />} />

          <Route path="/jobtype" element={<JobType />} />
          <Route path="/jobtype/create" element={<JobTypeCreate />} />
          <Route path="/jobtype/edit/:uuid" element={<JobTypeEdit />} />

          {/* Public */}
          <Route path="/" element={<IndexHome />} />
          <Route path="/job/detail" element={<JobPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* User */}

          <Route path="/user" element={<UserPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
