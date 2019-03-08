import React, { Component } from 'react';
import './App.css';
import Dash from './Dashboard';
import Login from './Login';

class App extends Component {
	constructor() {
		super();
		this.state = {
			loggedIn: false
		}
	}
	handleLogin = () => {
		this.setState({
			loggedIn: true
		})
	}
	handeLogout = () => {
		this.setState({
			loggedIn: false
		})
	}
	render() {
		return (
			<div className="App">
				{
					this.state.loggedIn 
					? 
					<Dash handleLogout={this.handleLogout} />
					: 
					<Login handleLogin={this.handleLogin} />
				}
			</div>
		);
	}
}

export default App;
