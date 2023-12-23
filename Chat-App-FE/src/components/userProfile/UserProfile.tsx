import { useEffect, useState } from 'react';
import { useUserDataStore } from "../../stores/authStore";


const inputsLayout = [
  {
    name: "firstName",
    label: "First Name",
    type: "text",
    placeholder: "First Name",
    id: 'floatingFirstName',
  },
  {
    name: "lastName",
    label: "Last Name",
    type: "text",
    placeholder: "Last Name",
    id: 'floatingLastName',
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Email",
    disabled: true,
  },
  {
    name: "birthDate",
    label: "Birth Date",
    type: "date",
    placeholder: "Birth Date",
    id: 'floatingBirthDate',
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Password",
    id: 'floatingPassword',
  },
];

const UserProfile = () => {
  const { userData } = useUserDataStore(); // Assuming this store holds user data
  const [ userProfileData, setUserProfileData ] = useState({
    firstName: '',
    lastName: '',
    email: '',
    birthDate: '',
    fullName: '',
    password: '',
  });


  useEffect(() => {
    if (userData) {
      setUserProfileData({
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        birthDate: userData.birthDate,
        fullName: userData.fullName,
        password: '',
      });
    }
  }, [userData]);

  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUserProfileData({
      ...userProfileData,
      [name]: value,
    });
    console.log("userProfileData", userProfileData)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("userProfileData", userProfileData)
  }

  return (
    <div className="container component-container mt-5">
      <div className="mb-5">
        <h2 >User Profile</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group d-flex justify-content-center align-items-center flex-column">
          {inputsLayout.map((input) => (
            <div className="mb-3 form-floating" key={input.name}>
              <input
                type={input.type}
                id={input.name}
                name={input.name}
                className="form-control"
                placeholder={userData[input.name || ""]}
                value={userProfileData[input.name || ""]}
                onChange={handleInputChange}
                disabled={input.disabled}
                required
              />
              <label htmlFor={input.name}>{input.label}</label>
            </div>
          ))}
          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-primary">Save</button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default UserProfile;