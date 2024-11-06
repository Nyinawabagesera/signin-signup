import React, {useState} from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useAuth } from "../contexts/AuthContext"

const Login = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {login} = useAuth();

  const onSubmit = async (data) => {
    try {
      setLoading(true)
      await login(data.email, data.password);
      console.log('User signed up:', data);
      
      navigate('/Logout')
    } catch (error) {
      console.error("Signup failed", error); 
      throw error;
    }
    setLoading(false)
  }

  return (
    <div className="user">
      <h2>Sign In</h2>
      <form className="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="username">
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
                message: "Invalid email format",
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
                message: "Password must be at least 6 characters",
              },
              maxLength: {
                value: 10,
                message: "Password must be at most 10 characters",
              },
            })}
          />
          <p style={{ color: "red" }}>{errors.password?.message}</p>
          <button disabled={loading} type="submit" className="btn btn-primary">
            {loading ? 'Sign In...' : 'Sign In'}
          </button>
          {loading && <div className="spinner"></div> }
        </div>
      </form>
      <div>
      <Link to="/ForgotPassword">
          Forgot Password
        </Link>
      </div>
      <DevTool control={control} />
      <div className="login">
        <p>Don't have an account?</p>
        <Link to="/" className="btn btn-success">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Login;
