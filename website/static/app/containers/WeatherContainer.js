import React from 'react';
import {HashRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Switch, Route, withRouter} from 'react-router-dom';

import Weather from '../components/Weather';

import {fetchWeatherData} from '../actions/dataPointsActionCreators.js';
import AboutPage from "../components/AboutPage";
import Navigation from "../components/Navigation";


export class WeatherContainer extends React.Component {
    componentDidMount() {
        this.props.fetchWeatherData();
    }
    render () {
        const {
            currentConditions,
            dailyForecast,
            fetchWeatherData,
            hourlyForecast,
            isLoading,
            navigationItems,
        } = this.props;

        return (
            <HashRouter>
                <div className="page-content">
                    <Navigation
                        onRefreshClick={fetchWeatherData}
                        navigationItems={navigationItems}
                    />
                    <Switch>
                        <Route exact path="/">
                            <Weather
                                currentConditions={currentConditions}
                                hourlyForecast={hourlyForecast}
                                dailyForecast={dailyForecast}
                                isLoading={isLoading}
                            />
                        </Route>
                        <Route exact path="/about">
                            <AboutPage/>
                        </Route>
                    </Switch>
                </div>
            </HashRouter>
        );
    }
}

const mapStateToProps = (state) => ({
    isLoading: state.data.isLoading,
    currentConditions: state.data.currentConditions,
    hourlyForecast: state.data.hourlyForecast,
    dailyForecast: state.data.dailyForecast,
    navigationItems: state.navigationItems,
});

const mapDispatchToProps = (dispatch) => ({
    fetchWeatherData: bindActionCreators(fetchWeatherData, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(WeatherContainer);
