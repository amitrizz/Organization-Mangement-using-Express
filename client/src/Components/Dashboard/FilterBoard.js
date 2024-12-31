import React, { useEffect, useState } from 'react'
import axios from "axios"
// import './DashBoard.css'
import { useDispatch, useSelector } from "react-redux"
import { ChangeData, PreviousButtonState } from '../../features/dashbaordSlice'
import './FilterBoard.css'

function FilterBoard() {
    const data = useSelector(state => state.data)
    const [fileContent, setFileContent] = useState(false);
    const [fieldtype, setfilterType] = useState("domain");
    const [id, setid] = useState('');
    const dispatch = useDispatch();

    const SearchByName = async (name) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/dashboard/getuser`, { name: name });
            dispatch(ChangeData(response.data.data))

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const SearchById = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/dashboard/userbyid/${id}`);
            dispatch(ChangeData(response.data.data))

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    useEffect(() => {

        const fetchData = async () => {
            try {
                // Send the request with the configured headers
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/dashboard/loaddata`);

                dispatch(ChangeData(response.data.data))
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

    const handleFieldCheckButtonClick = async () => {
        // Here, you can perform any action you want to do when the button is clicked
        // console.log('Selected department:', department);
        // setLoad(false);
        try {
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/dashboard/filter`, { fieldtype: fieldtype })

            dispatch(ChangeData(response.data.data))

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const handleSelectChangeField = (event) => {
        setfilterType(event.target.value);
    };

    return (
        <div className='DashBoard'>
            <div className='filterbody'>
                    <div class="input-group mb-1">
                        <select value={fieldtype} onChange={handleSelectChangeField}>
                            <option value="gender">Gender</option>
                            <option value="domain">Domain</option>
                            <option value="available">Available</option>
                        </select>
                        <button onClick={handleFieldCheckButtonClick} class="btn btn-outline-secondary">Sort By</button>
                    </div>

                    <div class="input-group mb-1">
                        <input placeholder='Enter userId ...' onChange={(e) => setid(e.target.value)} />
                        <button onClick={SearchById} class="btn btn-outline-secondary">Button</button>
                    </div>
                    <div class="input-group mb-1">
                        <input placeholder='Enter user name to search ...' onChange={(e) => SearchByName(e.target.value)} />
                    </div>
            </div>
            <div className='Dashbody'>
                {fileContent ?
                    <div className='dashcontent container'>
                        <div className='row'>

                            {
                                data.map((obj, index) => {
                                    return (
                                        <div className='col-6' key={index}>
                                            <div class="card" style={{ "margin": "5px" }}>
                                                <img src={obj.avatar} width={"50px"} height={"50px"} alt="..." />
                                                <div class="card-body">
                                                    <div>
                                                        <h5 class="card-title">Name : {obj.first_name} {obj.last_name}</h5>
                                                        <h5 class="card-title">Email: {obj.email}</h5>
                                                        <h5 class="card-title">User id: {obj.id}</h5>
                                                        <h5 class="card-title">Gender: {obj.gender}</h5>
                                                        <h5 class="card-title">Domain: {obj.domain}</h5>
                                                        <h5 class="card-title">
                                                            Availability: {obj.available}</h5>
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
        </div>
    )
}

export default FilterBoard
