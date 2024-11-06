import React, { useState } from "react";
import "./Updateprofile.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

const Updateprofile = () => {
  const { register, handleSubmit, control, formState: { errors } } = useForm();
  const { currentUser, updateEmail, updatePassword } = useAuth(); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const promises = [];
    setError("");
    setLoading(true);

    if (data.email !== currentUser.email) {
      promises.push(updateEmail(data.email));
    }

    if (data.password) {
      promises.push(updatePassword(data.password));
    }

    Promise.all(promises)
      .then(() => {
        navigate("/Logout");
      })
      .catch((error) => {
        console.error("Update failed", error);
        setError("Failed to update profile");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="user">
      <h2>Update Profile</h2>
      {currentUser ? `Logged in as: ${currentUser.email}` : "No user logged in"}
      
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form className="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="username">
          <label htmlFor="username">Username:</label>
          <input
            autoComplete="off"
            type="text"
            id="username"
            placeholder="Enter Your Username"
            {...register("username", { required: "Username is required" })}
            defaultValue={currentUser.username}
          />
          <p style={{ color: "red" }}>{errors.username?.message}</p>

          <label htmlFor="email">Email:</label>
          <input
            autoComplete="off"
            type="email"
            id="email"
            placeholder="Enter Your Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email",
              },
            })}
            defaultValue={currentUser.email} 
          />
          <p style={{ color: "red" }}>{errors.email?.message}</p>

          <label htmlFor="password">Password:</label>
          <input
            autoComplete="off"
            type="password"
            id="password"
            placeholder="Leave Blank To Keep The Same"
            {...register("password", {
              minLength: {
                value: 6,
                message: "Password must have a minimum of 6 characters",
              },
              maxLength: {
                value: 10,
                message: "Password must have a maximum of 10 characters",
              },
            })}
          />
          <p style={{ color: "red" }}>{errors.password?.message}</p>

          <button disabled={loading} type="submit" className="btn btn-primary">
            {loading ? "Updating..." : "Update"}
          </button>
          {loading && <div className="spinner"></div>}
        </div>
      </form>
      <DevTool control={control} />
      <div className="login">
        <Link to="/Logout" className="btn btn-success">
          Cancel
        </Link>
      </div>
    </div>
  );
};

export default Updateprofile;