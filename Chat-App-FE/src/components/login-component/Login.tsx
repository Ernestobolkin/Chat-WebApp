import React, { FormEvent, useState } from "react";
import SuccessButton from "../Reusable/button";

const Login: React.FC = () => {
  // Define state to store user input
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  // Handle form input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Perform authentication logic here (e.g., sending data to a server)
    console.log("Form data submitted:", formData);
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            className="form-control"
            placeholder="Enter your username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-control"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <SuccessButton className="login">
          Login
        </SuccessButton>
      </form>
    </div>
  );
};

export default Login;