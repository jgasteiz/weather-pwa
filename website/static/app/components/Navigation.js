import React from 'react';
import {Link} from 'react-router-dom';


const Navigation = () => {
    return (
        <ul className="nav row weather-nav">
            <li className="nav-item">
                <Link className="nav-link" to="/">Weather</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/about">About</Link>
            </li>
        </ul>
    );
};

export default Navigation;
