import React, { useState } from "react";
import "./signUp.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

const Signup = () => {
  const { register, handleSubmit, control, formState: { errors } } = useForm();
  const { signup, currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await signup(data.email, data.password);
      console.log("User signed up:", data);

      navigate('/login')
    } catch (error) {
      console.error("Signup failed", error);
      throw error;
    }
    setLoading(false);
  };

  return (
    <div className="user">
      <h2>Sign Up</h2>
      <form className="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="username">
          <label htmlFor="username">Username:</label>
          <input
            autoComplete="off"
            type="text"
            id="username"
            placeholder="Enter Your Username"
            {...register("username", { required: "Username is required" })}
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
                value:
                  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email",
              },
            })}
          />
          <p style={{ color: "red" }}>{errors.email?.message}</p>

          <label htmlFor="password">Password:</label>
          <input
            autoComplete="off"
            type="password"
            id="password"
            placeholder="Enter Your Password"
            {...register("password", {
              required: "Password is required",
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

          <button
            disabled={loading}
            type="submit"
            className="btn btn-primary"
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
          {loading && <div className="spinner"></div>}
        </div>
      </form>
      <DevTool control={control} />
      <div className="login">
        <p>Already have an account?</p>
        <Link to="/login" className="btn btn-success">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Signup;
