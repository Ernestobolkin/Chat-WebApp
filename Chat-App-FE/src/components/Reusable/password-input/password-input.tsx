import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { InputPasswordProps } from '../../../Interfaces/Reusable';
import './password-input.style.css';

const PasswordInput: React.FC<InputPasswordProps> = ({
    value,
    onChange,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState({
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPassword({
      ...password,
      [name]: value,
    });
    onChange(event);
  }



  const handleMouseDown = () => setShowPassword(true);
  const handleMouseUp = () => setShowPassword(false);

  return (
    <div className="form-group">
      <div className="input-group input-container">
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          name="password"
          className="form-control"
          placeholder="Enter your password"
          value={value}
          onChange={handleInputChange}
          required
        />
        <FontAwesomeIcon
          icon={showPassword ? faEyeSlash : faEye}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className="eye-icon"
        />
      </div>
    </div>
  );
};

export default PasswordInput;