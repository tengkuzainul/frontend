import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const deleteUser = async (id, name) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: `Do you want to delete ${name}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await axios.delete(`http://localhost:5000/users/deleted/${id}`);
        fetchUsers();
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "User has been deleted successfully.",
        });
      }
    } catch (error) {
      console.log("Error deleting user:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to delete user. Please try again.",
      });
    }
  };

  return (
    <div className="columns mx-5 my-5 is-centered">
      <div className="column is-full">
        <div className="is-flex is-justify-content-space-between mb-3">
          <h1 className="title">User List</h1>
          <Link
            to={`add`}
            className="button is-small is-warning is-pulled-right"
          >
            <span className="icon is-small">
              <i className="fas fa-plus"></i>
            </span>
            <span>Add Data</span>
          </Link>
        </div>
        <table className="table is-striped is-fullwidth is-hoverable">
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.gender}</td>
                <td className="buttons">
                  <Link
                    to={`edit/${user.id}`}
                    className="button is-small is-info"
                  >
                    <span className="icon is-small">
                      <i className="fas fa-edit"></i>
                    </span>
                    <span>Edit</span>
                  </Link>
                  <button
                    onClick={() => deleteUser(user.id, user.name)}
                    className="button is-small is-danger"
                  >
                    <span className="icon is-small">
                      <i className="fas fa-trash"></i>
                    </span>
                    <span>Delete</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
