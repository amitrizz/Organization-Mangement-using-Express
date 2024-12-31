import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { SetTeamId } from '../../features/dashbaordSlice'
import { useNavigate } from "react-router-dom"
import './AllTeams.css'

function AllTeams() {

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [data, setData] = useState([]);
    const RedirectToShowTeam = (id) => {
        dispatch(SetTeamId(id));
        navigate("/showteam")
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Send the request with the configured headers
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/team/getallteam`);
                setData(response.data.data)
                console.log(response.data.data);
                // if (response.data.data[0].id == 1) {
                //     dispatch(PreviousButtonState(true));
                // }
                // setFileContent(true);
                //   setAllemployee(response)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();

    }, [])

    return (
        <div className='DashBoard'>
            <div className='allteambody'>
                <table>
                    <thead>
                        <tr>
                            <th> Team Id </th>
                            <th> Team Name </th>
                            <th>View Team</th>
                        </tr>
                    </thead>
                    <tbody>


                        {
                            data.map((team) => {
                                return (
                                    <tr>
                                        <td> {team.id} </td>
                                        <td> {team.team_name} </td>
                                        <td className="link">
                                            <button onClick={() => RedirectToShowTeam(team.id)}>View Team</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AllTeams
