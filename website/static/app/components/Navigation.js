import React from 'react';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';


const Navigation = ({navigationItems, onRefreshClick}) =>
    <div className="row weather-nav">
        <div className="col">
            <ul className="nav">
                {navigationItems.map((item, idx) =>
                    <li key={idx} className="nav-item">
                        <Link className="nav-link" to={item.path}>{item.title}</Link>
                    </li>
                )}
            </ul>
        </div>
        <div className="col-auto">
            <a className="nav-link weather-nav__refresh" onClick={onRefreshClick}><FontAwesomeIcon icon="sync"/></a>
        </div>
    </div>;

Navigation.propTypes = {
    onRefreshClick: PropTypes.func.isRequired,
    navigationItems: PropTypes.array.isRequired,
};

export default Navigation;
