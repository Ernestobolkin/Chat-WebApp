import React, { FormEvent, useState } from "react";
import { generalRequest, loginRequest } from "../../service/api-service";
import SuccessButton from "../Reusable/button";

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
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await loginRequest(formData);
  };

  const testUrl = async()=>{
    const response = await generalRequest('test', 'GET')
    const data = await response.json();
    console.log(data);
  }

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
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
        <SuccessButton className="btn btn-success login">
          Login
        </SuccessButton>
      </form>
      <SuccessButton onClick={testUrl} className="btn btn-success login">
          test
        </SuccessButton>
    </div>
  );
};

export default Login;