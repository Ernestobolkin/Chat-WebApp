import React, { FormEvent, useState } from "react";
import { loginRequest } from "../../service/api-service";
import SuccessButton from "../Reusable/button";
import PasswordInput from "../Reusable/password-input/password-input";
import "./Login.style.css";


const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log(formData)
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await loginRequest(formData);
  };

  return (
    <div className="container component-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group input-container">
          <div>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            className="form-control"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <PasswordInput
            name="login"
            value={formData.password}
            onChange={handleInputChange}
          ></PasswordInput>
        </div>
        <SuccessButton className="btn btn-success login">
          Login
        </SuccessButton>
      </form>
    </div>
  );
};

export default Login;