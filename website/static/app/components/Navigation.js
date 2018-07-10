import React from 'react';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {PropTypes} from "prop-types";


const Navigation = ({onRefreshClick}) => {
    return (
        <div className="row weather-nav">
            <div className="col">
                <ul className="nav">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Weather</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/about">About</Link>
                    </li>
                </ul>
            </div>
            <div className="col-auto">
                <a className="nav-link weather-nav__refresh" onClick={onRefreshClick}><FontAwesomeIcon icon="sync"/></a>
            </div>
        </div>
    );
};

Navigation.propTypes = {
    onRefreshClick: PropTypes.func.isRequired,
};

export default Navigation;
