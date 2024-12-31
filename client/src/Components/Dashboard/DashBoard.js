import React, { useEffect, useState } from 'react'
import axios from "axios"
import './DashBoard.css'
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { ChangeData, PreviousButtonState, SetUserIdForUpdate } from '../../features/dashbaordSlice'
import Navbar from '../Navbar'
import Header from '../Header'


function DashBoard() {

    const navigate = useNavigate()

    const data = useSelector(state => state.data)
    const isbuttonDisble = useSelector(state => state.currentstate)
    const [fileContent, setFileContent] = useState(false);

    const [skip, setSkip] = useState(1);

    const dispatch = useDispatch();

    const AddMoreDataToTable = async () => {
        try {
            // console.log(skip);
            setFileContent(false);
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/dashboard/loaddata`, { skip: skip + 1 });
            setSkip(skip + 1);
            dispatch(ChangeData(response.data.data))
            dispatch(PreviousButtonState(false));
            setFileContent(true);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    const DeleteUserbyId = async (id) => {
        try {
            // console.log(skip);
            setFileContent(false);
            let response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/dashboard/deleteuser/${id}`);
            console.log(response.data);
            alert(response.data.result)
            response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/dashboard/loaddata`);
            dispatch(ChangeData(response.data.data))
            if (response.data.data[0].id == 1) {
                dispatch(PreviousButtonState(true));
            }
            setFileContent(true);
            // setFileContent(true);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    const RemoveMoreDataToTable = async () => {

        try {
            // console.log(skip);
            setFileContent(false);
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/dashboard/loaddata`, { skip: skip - 1 });
            setSkip(skip - 1);
            dispatch(ChangeData(response.data.data))
            if (response.data.data[0].id == 1) {
                dispatch(PreviousButtonState(true));
            }
            setFileContent(true);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    const RedirectToUpdate = (id) => {
        dispatch(SetUserIdForUpdate(id));
        navigate("/updateuser")
    }

    useEffect(() => {

        const fetchData = async () => {
            try {
                // Send the request with the configured headers
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/dashboard/loaddata`);
                console.log(response.data.data);
                dispatch(ChangeData(response.data.data))
                console.log(response.data.data[0].avatar);
                if (response.data.data[0].id == 1) {
                    dispatch(PreviousButtonState(true));
                }
                setFileContent(true);
                //   setAllemployee(response)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);
    return (
        <div className='DashBoard'>

            <button className='ldbtn' onClick={RemoveMoreDataToTable} disabled={isbuttonDisble}>Pre Page</button>
            <div className='Dashbody'>

                <Header />
                {fileContent ?
                    <div className='dashcontent container'>
                        <div className='row'>

                            {
                                data.map((obj) => {
                                    return (
                                        <div className='col-6'>
                                            <div class="card" style={{ "margin": "5px" }}>
                                                <img src={obj.avatar} width={"50px"} height={"50px"} alt="..." />
                                                <div class="card-body">
                                                    <div>
                                                        <h5 class="card-title">Name : {obj.first_name} {obj.last_name}</h5>
                                                        <h5 class="card-title">Email: {obj.email}</h5>
                                                        <h5 class="card-title">User id: {obj.id}</h5>
                                                        <h5 class="card-title">Gender: {obj.gender}</h5>
                                                        <h5 class="card-title">Domain: {obj.domain}</h5>
                                                    </div>
                                                    <div>

                                                        <button onClick={() => DeleteUserbyId(obj._id)} class="premium-btn">Delete User</button>
                                                        <button style={{ "marginLeft": "10px" }} onClick={() => RedirectToUpdate(obj._id)} class="premium-btn">Update User</button>
                                                    </div>
                                                </div>
                                                {/* <li key={obj.id}> {obj.id} </li> */}
                                            </div>
                                        </div>
                                    )
                                })
                            }

                        </div>
                    </div>
                    : <div className='dashloading'><div className="spinner"></div></div>
                }
            </div>
            <button className='rdbtn' onClick={AddMoreDataToTable}>Next Page</button>
        </div>
    )
}

export default DashBoard
