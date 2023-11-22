import React, { useState, FormEvent } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { RegisterErrors, generalErrors } from '../../assets/i18n';
import SuccessButton from '../Reusable/button';
import { RegisterContext, InputTypes } from '../../enums/generalEnum';
import { validateEmail, validatePassword, validateNameAndlastName } from '../Reusable/validations';
import { generalRequest } from '../../service/api-service';
import { useAuthStore, useUserDataStore } from '../../stores/authStore';

interface FormData {
  firstName: string;
  lastName: string;
  birthDate: string | Date;
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
    name: RegisterContext._BIRTH_DATE,
    label: RegisterContext.BIRTH_DATE,
    type: InputTypes.DATE,
  },
  {
    name: RegisterContext._EMAIL,
    label: RegisterContext.EMAIL,
    type: InputTypes.EMAIL,
  },
  {
    name: RegisterContext._PASSWORD,
    label: RegisterContext.PASSWORD,
    type: InputTypes.PASSWORD,
  },
  {
    name: RegisterContext._CONFIRM_PASSWORD,
    label: RegisterContext.CONFIRM_PASSWORD,
    type: InputTypes.PASSWORD,
  }
]



const RegisterComponent: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    birthDate: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  const [error, setError] = useState<string>('');

  const { signIn } = useAuthStore();
  const { setUserData } = useUserDataStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onblur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    handleValidation(name, value)
  }

  const handleValidation = (name: string, value: string) => {
    const minLengthError = (minLength: number) => value?.length < minLength ? generalErrors.EMPTY_FIELD : '';

    // Early return for general length error
    if (minLengthError(2)) {
      setError(minLengthError(2));
      setIsFormValid(false);
      return;
    }
    let error = '';

    switch (name) {
      case RegisterContext._FIRST_NAME:
        error = minLengthError(2) || (!validateNameAndlastName(value) ? RegisterErrors.NAME_REGEX_ERROR : '');
        break;
      case RegisterContext._LAST_NAME:
        error = minLengthError(2) || (!validateNameAndlastName(value) ? RegisterErrors.LAST_NAME_REGEX_ERROR : '');
        break;
      case RegisterContext._BIRTH_DATE:
        error = minLengthError(2);
        break;
      case RegisterContext._EMAIL:
        error = !validateEmail(value) ? RegisterErrors.EMAIL_ERROR : '';
        break;
      case RegisterContext._PASSWORD:
        error = !validatePassword(value) ? RegisterErrors.PASSWORD_ERROR : '';
        if(!error.length && formData.confirmPassword.length){
          error = formData.password !== formData.confirmPassword ? RegisterErrors.CONFIRM_PASSWORD_ERROR : '';
        }
        break;
      case RegisterContext._CONFIRM_PASSWORD:
        error = formData.password !== value ? RegisterErrors.CONFIRM_PASSWORD_ERROR : '';
        break;
    }

    setIsFormValid(!error);
    setError(error);
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormValid) {
      setError(generalErrors.FORM_ERROR);
      return;
    }
    const res = await generalRequest('register', 'POST', formData);
    if(res && res?.error){
      setError(res.error);
      return;
    }
    signIn();
    setUserData({
      email: res.email,
      username: res.username,
    });
    //navigate to home
    
  };



  return (
    <div className="container component-container mt-2">
      <div className="mb-3">
        <h3>Register</h3>
      </div>
      {error && <div className="alert alert-danger d-flex " role="alert">
        <span className="error-message">{error}</span>
      </div>}
      <form onSubmit={handleSubmit}>
        {inputLayout.map((input, index) => (
          <div key={input.label + index} className="mb-3">
            <label htmlFor={input.name} className="form-label">{input.label}</label>
            <input
              type={input.type}
              className="form-control"
              id={input.name}
              name={input.name}
              value={formData[input.label]}
              onChange={handleChange}
              required
              onBlur={onblur}
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