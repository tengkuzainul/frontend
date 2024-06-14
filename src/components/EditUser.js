import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const EditUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("Male");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { id } = useParams(); // Mengambil id dengan benar

  useEffect(() => {
    getUserById();
  }, []);

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/users/updated/${id}`, {
        name,
        email,
        gender,
      });
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "User has been updated successfully.",
      }).then(() => {
        navigate("/");
      });
    } catch (error) {
      setError("Failed to update user. Please try again.");
      console.log("User Update Error: ", error);
    }
  };

  const getUserById = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/users/${id}`);
      if (response.data) {
        setName(response.data.name);
        setEmail(response.data.email);
        setGender(response.data.gender);
      } else {
        setError("User not found.");
      }
    } catch (error) {
      setError("Failed to fetch user data. Please try again.");
      console.log("Fetch User Error: ", error);
    }
  };

  return (
    <div className="columns mt-5 is-centered">
      <div className="column is-half">
        {error && <p className="error">{error}</p>}
        <form onSubmit={updateUser}>
          <div className="field">
            <label className="label">Name</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Gender</label>
            <div className="control">
              <div className="select is-fullwidth">
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>
          </div>
          <div className="field">
            <button type="submit" className="button is-success">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
