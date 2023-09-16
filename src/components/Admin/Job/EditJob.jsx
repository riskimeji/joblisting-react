import React, { useState, useEffect } from "react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditJob = () => {
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [est_gaji, setGaji] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { uuid } = useParams();
  const [categories, setCategories] = useState([]);
  const [careers, setCareers] = useState([]);
  const [jobtypes, setJobtypes] = useState([]);
  const [categoryId, setCategory] = useState("");
  const [careerId, setCareer] = useState("");
  const [jobtypeId, setJobtype] = useState("");
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/category");
        setCategories(response.data);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    const fetchJobType = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/jobtype");
        setJobtypes(response.data);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };

    const fetchCareers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/career");
        setCareers(response.data);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    const getJobById = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/admin/job/${uuid}`
        );
        setTitle(response.data.title);
        setCategory(response.data.category.id);
        setCareer(response.data.career.id);
        setAddress(response.data.address);
        setGaji(response.data.est_gaji);
        setJobtype(response.data.jobtype.id);
        setDescription(response.data.description);
        setStatus(response.data.status);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    fetchCategories();
    fetchCareers();
    getJobById();
    fetchJobType();
  }, [uuid]);
  const handleJobtypeChange = (e) => {
    setJobtype(e.target.value);
  };

  const updateJob = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/api/admin/job/${uuid}`, {
        title: title,
        categoryId: categoryId,
        careerId: careerId,
        address: address,
        est_gaji: est_gaji,
        jobtypeId: jobtypeId,
        description: description,
        status: status,
      });
      navigate("/jobs");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };
  return (
    <div>
      <h1 className="title">Job</h1>
      <h2 className="subtitle">Edit Job</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={updateJob}>
              <p className="has-text-centered">{msg}</p>
              <div className="field">
                <label className="label">Title</label>
                <div className="control">
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="input"
                    placeholder="title"
                  />
                </div>
              </div>
              <div className="field-body">
                <div className="field">
                  <p className="control is-expanded">
                    <label className="label">Industry</label>
                    <div className="select is-rounded">
                      <select
                        value={categoryId}
                        onChange={(e) => setCategory(e.target.value)}
                      >
                        <option>Pilih Industri</option>
                        {categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </p>
                </div>
                <div className="field">
                  <p className="control is-expanded">
                    <label className="label">Career Path</label>
                    <div className="select is-rounded">
                      <select
                        value={careerId}
                        onChange={(e) => setCareer(e.target.value)}
                      >
                        <option>Pilih Jenjang Karir</option>
                        {careers.map((career) => (
                          <option key={career.id} value={career.id}>
                            {career.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </p>
                </div>
              </div>
              <div className="field mt-2">
                <label className="label">Address</label>
                <div className="control">
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="input"
                    placeholder="JL. Durian tarung no 26"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Est Gaji</label>
                <div className="control">
                  <input
                    type="text"
                    value={est_gaji}
                    onChange={(e) => setGaji(e.target.value)}
                    className="input"
                    placeholder="Rp 7.000.000 - Rp 12.000.000"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Type Job</label>
                {jobtypes.map((jobtype) => (
                  <div className="control" key={jobtype.id}>
                    <label>
                      <input
                        type="radio"
                        name="jobtypeId"
                        value={jobtype.id}
                        defaultChecked={jobtype.id === jobtypeId}
                        onChange={handleJobtypeChange}
                      />
                      &nbsp;{jobtype.name}
                    </label>
                  </div>
                ))}
              </div>
              <div className="field">
                <label className="label">Description</label>
                <div className="control">
                  <CKEditor
                    editor={ClassicEditor}
                    data={description} // Menggunakan prop 'data' untuk mengatur nilai awal CKEditor
                    onReady={(editor) => {
                      console.log("Editor is ready to use!", editor);
                      editor.editing.view.change((writer) => {
                        writer.setStyle(
                          "height",
                          "200px",
                          editor.editing.view.document.getRoot()
                        );
                      });
                    }}
                    onChange={(event, editor) => {
                      const newData = editor.getData();
                      setDescription(newData);
                    }}
                  />
                </div>
              </div>
              <div className="field">
                <p className="control is-expanded">
                  <label className="label">Status</label>
                  <div className="select is-rounded">
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option>Pilih Status</option>
                      <option value="Aktif">Aktif</option>
                      <option value="Non-Aktif">Non-Aktif</option>
                    </select>
                  </div>
                </p>
              </div>
              <div className="field mt-5">
                <button
                  type="submit"
                  className="button is-success is-fullwidth"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditJob;
