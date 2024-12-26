// import logo from './logo.svg';
import './App.css';
import DashBoard from './Components/Dashboard/DashBoard.js';
import FilterBoard from './Components/Dashboard/FilterBoard.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar.js';
import { Provider } from "react-redux"
import Header from './Components/Header.js';
import { store } from "../src/stores/store.js"
import AddUser from './Components/AddUpdateUser/AddUser.js';
import UpdateUser from './Components/AddUpdateUser/UpdateUser.js';
import AddTeam from './Components/Team/AddTeam.js';
import ShowTeam from './Components/Team/ShowTeam.js';
import AllTeams from './Components/Team/AllTeams.js';

function App() {
  return (
    <Provider store={store}>

      <BrowserRouter>
        {/* <Header /> */}
        <div className='body'>
          <Navbar className='navbar' />
          <div className='app'>
            <Routes>
              <Route path="/" element={<DashBoard />} ></Route>
              <Route path="/filter" element={<FilterBoard />} />
              <Route path="/adduser" element={<AddUser />} />
              <Route path="/updateuser" element={<UpdateUser />} />
              <Route path="/addteam" element={<AddTeam />} />
              <Route path="/teams" element={<AllTeams />} />
              <Route path="/showteam" element={<ShowTeam />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
