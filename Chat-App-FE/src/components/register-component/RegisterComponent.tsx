import React, { useState, FormEvent } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { generalRequest } from '../../service/api-service';
import SuccessButton from '../Reusable/button';
import { RegisterContext, InputTypes } from '../../enums/generalEnum';

interface FormData {
  firstName: string;
  lastName: string;
  birthDate?: string | Date | null;
  email: string;
  password: string;
  confirmPassword: string;
}

const inputLayout = [
  {
    name: RegisterContext._FIRST_NAME,
    label: RegisterContext.FIRST_NAME,
    type: InputTypes.TEXT,
  },
  {
    name: RegisterContext._LAST_NAME,
    label: RegisterContext.LAST_NAME,
    type: InputTypes.TEXT,
  },
  {
    name: RegisterContext.BIRTH_DATE,
    label: RegisterContext._BIRTH_DATE,
    type: InputTypes.DATE,
  }
]

const RegisterComponent: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    birthDate: null,
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await generalRequest('register', 'POST', formData);
  };

  return (
    <div className="container component-container mt-5">
      <h3>Register</h3>
      <form onSubmit={handleSubmit}>
        {inputLayout.map((input, index) => (
          <div key={input.label + index} className="mb-3">
            <label htmlFor={input.name} className="form-label">{input.label}</label>
            <input
              type={input.type}
              className="form-control"
              id={input.name}
              name={input.name}
              value={formData[input.name]}
              onChange={handleChange}
              required
            />
          </div>
        ))  
        }
        <SuccessButton className='btn btn-primary'>Register</SuccessButton>
      </form>
    </div>
  );
};

export default RegisterComponent;