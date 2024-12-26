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
        <div className="create-team-container">
            <div className="create-team-header">
                <h1>Create Team</h1>
            </div>

            <div className="create-team-card">
                <div className="form-group">
                    <label htmlFor="teamName" className="form-label">Team Name</label>
                    <input
                        type="text"
                        id="teamName"
                        className="form-input"
                        onChange={(e) => setteamname(e.target.value)}
                        maxLength={30}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="teamId" className="form-label">Team ID</label>
                    <input
                        type="text"
                        id="teamId"
                        className="form-input"
                        onChange={(e) => setteamid(e.target.value)}
                        maxLength={30}
                    />
                </div>

                <div className="form-group form-inline">
                    <input
                        type="text"
                        placeholder="Enter User ID..."
                        className="form-input-inline"
                        onChange={(e) => setid(e.target.value)}
                    />
                    <button onClick={SearchById} className="form-button-inline">Add User</button>
                </div>

                <button onClick={handleSubmitData} className="form-button">Submit</button>

                <div className="team-member-list">
                    <label htmlFor="teamMembers" className="form-label">Team Member List with Domain</label>
                    {teamUser.map((obj) => (
                        <div key={obj.id} className="team-member-item">
                            <span className="team-member-id">{obj.id}</span>
                            <span className="team-member-domain">{obj.domain}</span>
                            <button onClick={() => DeleteUserFromTeam(obj.id)} className="delete-button">Delete User</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    )
}

export default AddTeam
