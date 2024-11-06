import React, {useState} from "react";
import '../Forgotpassword/Forgotpassword.css';
import { Link} from "react-router-dom";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useAuth} from "../contexts/AuthContext";

function Forgotpassword () {

const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const {resetPassword} = useAuth();
  const [message, setMessage] = useState();

  const onSubmit = async (data) => {
    try {
      setMessage('')
      setLoading(true)
      await resetPassword(data.email);
      setMessage('check your inbox for further instructions')
    } catch (error) {
      console.error("Signup failed", error); 
      throw error;
    }
    setLoading(false)
  }

  return (
    <div className="user">
      <h2>Password Reset</h2>
      <form className="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="username">
          {message}
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
          <button disabled={loading} type="submit" className="btn btn-primary">
            {loading ? 'Reset Password...' : 'Reset Password'}
          </button>
          {loading && <div className="spinner"></div> }
        </div>
      </form>
      <DevTool control={control} />
      <div className="login">
        <p>Don't have an account?</p>
        <Link to="/login" className="btn btn-success">
          Login
        </Link>
      </div>
    </div>
  );
};


export default Forgotpassword;