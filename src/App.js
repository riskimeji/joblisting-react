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

//Admin

import Career from "./pages/Admin/Career/Career";

import Category from "./pages/Admin/Category/Category";

import Subscription from "./pages/Admin/Subscription/Subscription";

import JobType from "./pages/Admin/JobType/JobType";
import JobTypeCreate from "./pages/Admin/JobType/JobTypeCreate";
import JobTypeEdit from "./pages/Admin/JobType/JobTypeEdit";

import JobAppliedAdminPage from "./pages/Admin/JobApplied/JobAppliedPage";

//User
import UserPage from "./pages/User/UserPage";
import JobAppliedPage from "./pages/User/JobAppliedPage";

import Error from "./components/Error";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* Admin */}
          <Route path='/dashboard' element={<Dashboard />} />

          <Route path='/career' element={<Career />} />

          <Route path='/category' element={<Category />} />

          <Route path='/jobs/edit/:uuid' element={<JobEdit />} />
          <Route path='/jobs' element={<Jobs />} />
          <Route path='/jobs/create' element={<Jobcreate />} />

          <Route path='/users' element={<Users />} />

          <Route path='/subscription' element={<Subscription />} />

          <Route path='/jobtype' element={<JobType />} />
          <Route path='/jobtype/create' element={<JobTypeCreate />} />
          <Route path='/jobtype/edit/:uuid' element={<JobTypeEdit />} />

          <Route path='/jobs/applied' element={<JobAppliedAdminPage />} />

          {/* Public */}
          <Route path='/' element={<IndexHome />} />
          <Route path='/job/detail' element={<JobPage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />

          {/* User */}

          <Route path='/user' element={<UserPage />} />
          <Route path='/user/job-applied' element={<JobAppliedPage />} />

          <Route path='*' element={<Error />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
