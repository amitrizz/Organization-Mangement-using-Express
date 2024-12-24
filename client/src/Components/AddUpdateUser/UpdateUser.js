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
                const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/api/dashboard/updateuser/${id}`, { first_name:firstname, last_name:lastname, email, gender, available, avatar, domain });
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
        <div className='User'>
            <div className='sidebar'>
                <h1>Update EMPLOYEE</h1>
                <div className='form'>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" className="lable">First Name</label>
                        <input type="text" class="form-control" onChange={e => setfirstName(e.target.value)} maxLength={30} />
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" className="lable">Last Name</label>
                        <input type="text" class="form-control" onChange={e => setLastName(e.target.value)} maxLength={30} />
                    </div>

                    <div class="mb-3">
                        <label for="exampleInputEmail1" className="lable">Email</label>
                        <input type="email" class="form-control" onChange={e => setEmail(e.target.value)} maxLength={30} />
                    </div>
                    <select value={gender} onChange={handleGenderChange} className='selectStyle' >
                        <option value="">Select an Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>

                    <select value={available} onChange={handleAvailableChange} className='selectStyle' >
                        <option value="">Select an Available</option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>

                    <select value={domain} onChange={handleDomainChange} className='selectStyle' >
                        <option value="">Select an Domain</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Finance">Finance</option>
                        <option value="Accounts">Accounts</option>
                        <option value="It">It</option>
                        <option value="Software">Software</option>
                        <option value="Sales">Sales</option>

                    </select>



                    <button onClick={HandleSubmit} class="btn btn-outline-secondary">Submit</button>
                </div>
            </div>
        </div>
    )
}

export default UpdateUser
