import React from 'react'
import { Link } from 'react-router-dom'
import logoimg  from '..'


function Navbar() {
    return (
        <div className='navbarbody'>
            <nav className='navbody'>
                <div className='logoimg'><img src='logo.jpg'/></div>
                <ul className="nav-link">
                    <li className="link">
                        <Link to="/" className={"link-styles"}>DashBoard</Link>
                    </li>
                    <li className="link">
                        <Link to="/adduser" className={"link-styles"}>Employee</Link>
                    </li>
                    <li className="link">
                        <Link to="/addteam" className={"link-styles"}>Create Team</Link>
                    </li>
                    <li className="link">
                        <Link to="/filter" className={"link-styles"}>FilterBoard</Link>
                    </li>
                    <li className="link">
                        <Link to="/teams" className={"link-styles"}>Show Teams</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar
