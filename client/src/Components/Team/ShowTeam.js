import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import './ShowTeam.css'

function ShowTeam() {
  const teamid = useSelector(state => state.teamid)
  const [team, setTeam] = useState({})
  const [userList, setUserlist] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        // Send the request with the configured headers
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/team/teambyid/${teamid}`);
        // setData(response.data.data)
        console.log(response.data);
        setTeam(response.data.data)
        setUserlist(response.data.userList)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();

  }, [])
  return (
    <div className='DashBoard'>
      <div className='showteam'>
        <div className='showteamtitle'>
          <h3>Team Name : {team.team_name} And Team ID : {team.id}</h3>
          <h5>User List</h5>
        </div>
        <div className='showteambody'>

          {
            userList.map((obj) => {
              return (
                <div className='showteamcard'>
                  <div class="card" style={{ "margin": "10px" }}>
                    <img src={obj.avatar} width={"50px"} height={"50px"} alt="..." />
                    <div class="card-body">
                      <div>
                        <h5 class="card-title">Name : {obj.first_name} {obj.last_name}</h5>
                        <h5 class="card-title">Email: {obj.email}</h5>
                        <h5 class="card-title">Gender: {obj.gender}</h5>
                        <h5 class="card-title">Domain: {obj.domain}</h5>
                      </div>
                    </div>
                  </div>
                  {/* <li key={obj.id}> {obj.id} </li> */}
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default ShowTeam
