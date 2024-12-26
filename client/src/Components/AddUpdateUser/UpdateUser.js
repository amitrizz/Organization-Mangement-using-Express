import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"

function UpdateUser() {
    const navigate = useNavigate();


    // const token = localStorage.getItem('token');
    const avatar = "https://robohash.org/sintessequaerat.png?size=50x50&set=set1";
    const [firstname, setfirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");
    const [available, setAvailable] = useState("");
    const [domain, setDomain] = useState("");
    const id = useSelector(state => state.userid)
    const HandleSubmit = async () => {
        // console.log("working");
        try {
            // Send the request with the configured headers
            if (!firstname || !lastname || !gender || !email || !available || !domain) {
                alert("Enter All Fields");
            } else {
                console.log(firstname, lastname, email, gender, email, available, domain);
                // console.log();
                const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/api/dashboard/updateuser/${id}`, { first_name: firstname, last_name: lastname, email, gender, available, avatar, domain });
                console.log(response);
                if (response.status == 200) {
                    alert(`Submit Successfully`)
                    navigate("/")
                } else {
                    console.log(response.status);
                }
            }

            // const {fullname,age, dob, salary, department}=response.data.Employee;
            // setAllemployee(response.data.employees)
            // setName(response.data.user.name); 
            // setEmail(response.data.user.email)
        } catch (error) {
            console.error('Error fetching data:', error);
        }

    }
    const handleAvailableChange = (event) => {
        setAvailable(event.target.value);
    }
    const handleGenderChange = (event) => {
        setGender(event.target.value);
    }
    const handleDomainChange = (event) => {
        setDomain(event.target.value);
    }

    return (
        <div className="add-employee-container card">
            <div className="add-employee-sidebar">
                <h1>Update Employee</h1>
                <div className="add-employee-form">
                    <div className="form-group">
                        <label htmlFor="firstName" className="form-label">First Name</label>
                        <input
                            type="text"
                            className="form-input"
                            id="firstName"
                            onChange={(e) => setfirstName(e.target.value)}
                            maxLength={30}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName" className="form-label">Last Name</label>
                        <input
                            type="text"
                            className="form-input"
                            id="lastName"
                            onChange={(e) => setLastName(e.target.value)}
                            maxLength={30}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-input"
                            id="email"
                            onChange={(e) => setEmail(e.target.value)}
                            maxLength={30}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="gender" className="form-label">Gender</label>
                        <select
                            value={gender}
                            id="gender"
                            onChange={handleGenderChange}
                            className="form-select"
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="availability" className="form-label">Availability</label>
                        <select
                            value={available}
                            id="availability"
                            onChange={handleAvailableChange}
                            className="form-select"
                        >
                            <option value="">Select Availability</option>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="domain" className="form-label">Domain</label>
                        <select
                            value={domain}
                            id="domain"
                            onChange={handleDomainChange}
                            className="form-select"
                        >
                            <option value="">Select Domain</option>
                            <option value="Marketing">Marketing</option>
                            <option value="Finance">Finance</option>
                            <option value="Accounts">Accounts</option>
                            <option value="IT">IT</option>
                            <option value="Software">Software</option>
                            <option value="Sales">Sales</option>
                        </select>
                    </div>
                    <button onClick={HandleSubmit} className="form-button">
                        Submit
                    </button>
                </div>
            </div>
        </div>
    )
}

export default UpdateUser
