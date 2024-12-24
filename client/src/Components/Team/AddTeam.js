import React, { useState } from 'react'
import axios from "axios"
// import './DashBoard.css'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { ChangeData, PreviousButtonState } from '../../features/dashbaordSlice'

function AddTeam() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [id, setid] = useState("")
    const [teamname, setteamname] = useState("")
    const [teamid, setteamid] = useState("")
    const [teamUser, setteamUser] = useState([])
    const SearchById = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/dashboard/userbyid/${id}`);
            // dispatch(ChangeData(response.data.data))
            console.log(response.data.data[0]);
            const obj = response.data.data[0];
            if (obj && obj.available === 'true') {
                // variable to check domain exist in team or not
                let foundObject = teamUser.find(user => user.domain === obj.domain);
                if (!foundObject) {
                    const newobj = {
                        id: obj.id,
                        domain: obj.domain
                    }
                    setteamUser(teamUser => [...teamUser, newobj]);
                    alert("User Added To Team Sucessfully");
                } else {
                    alert(`Same Domain ${obj.domain} user Exist in Team`);
                }

            } else {
                alert("You can not add this into Your Team Not available OR Not Exist")
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    const DeleteUserFromTeam = (id) => {
        const updateUser = teamUser.filter(obj => obj.id != id)
        setteamUser(updateUser)
    }

    const handleSubmitData = async () => {
        try {
            // Send the request with the configured headers
            if (!teamname || !teamid || teamUser.length == 0) {
                alert("Enter All Fields");
            } else {
                // console.log(firstname, lastname, email, gender, email, available, domain);
                // console.log();
                const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/team/addteam`, { id: teamid, team_name: teamname, team_member: teamUser });
                console.log(response);
                if (response.status == 200) {
                    alert(`Submit Successfully`)
                    navigate("/")
                } else {
                    console.log(response.status);
                }
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    return (
        <div className='DashBoard'>
            <div className='addteambody'>
                <div><h1>Create Team</h1></div>

                <div className='card' style={{ padding: "20px", width: "50%" }}>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" className="lable">Team Name</label>
                        <input type="text" class="form-control" onChange={e => setteamname(e.target.value)} maxLength={30} />
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" className="lable">Team Id</label>
                        <input type="text" class="form-control" onChange={e => setteamid(e.target.value)} maxLength={30} />
                    </div>
                    <div class="input-group mb-1">
                        <input placeholder='enter userId ...' onChange={(e) => setid(e.target.value)} />
                        <button onClick={SearchById} class="btn btn-outline-secondary">Add User</button>
                    </div>
                    <div>
                        <button onClick={handleSubmitData} class="btn btn-outline-secondary">Submit</button>
                    </div>
                    <div>
                        <label for="exampleInputEmail1" className="lable">Team Member List With Doamin</label>
                        {
                            teamUser.map((obj) => {
                                return (
                                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px", width: "100%" }}>
                                        <span> {obj.id} </span>
                                        <span> {obj.domain} </span>
                                        <button onClick={() => DeleteUserFromTeam(obj.id)}>Delete User</button>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>

        </div>
    )
}

export default AddTeam
