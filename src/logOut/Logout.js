import React, { useState, useEffect } from "react";
import './logout.css';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Logout = () => {
  const [loading, setLoading] = useState(false);
  const { logout, currentUser } = useAuth();
  const [newPicture, setNewPicture] = useState(null);
  const [cropValue, setCropValue] = useState(100); 
  const navigate = useNavigate();

 
  useEffect(() => {
    return () => {
      setNewPicture(null); 
    };
  }, []);

  const handleLogout = async () => {
    try {
      setLoading(true);
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
    setLoading(false);
  };

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewPicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCrop = () => {
    console.log("New profile picture set:", newPicture);
  };

  return (
    <div className="user">
      <h2>Profile</h2>
      {currentUser ? `Email: ${currentUser.email}` : "No user logged in"}
      
      <div>
        <h3>Upload New Profile Picture</h3>
        <input type="file" accept="image/*" onChange={handlePictureChange} />
      </div>

      {newPicture && (
        <div>
          <img 
            src={newPicture} 
            alt="New Profile" 
            style={{ width: `${cropValue}%`, height: `${cropValue}%`, borderRadius: '50%' }}
          />
          <input
            type="range"
            min="50"
            max="100"
            value={cropValue}
            onChange={(e) => setCropValue(e.target.value)} 
            style={{ width: '100%', marginTop: '10px' }} 
          />
          <button onClick={handleCrop} className="btn btn-primary mt-2">Crop & Set as Profile Picture</button>
        </div>
      )}

      <Link to='/UpdateProfile' className="btn btn-primary width:100 mt-3">Update Profile</Link>
      <form className="form" onSubmit={(e) => e.preventDefault()}>
        <div className="username">
          <button
            disabled={loading}
            onClick={handleLogout}
            className="btn btn-primary"
          >
            {loading ? "Logging Out..." : "Log Out"}
          </button>
          {loading && <div className="spinner"></div>}
        </div>
      </form>
    </div>
  );
};

export default Logout;
