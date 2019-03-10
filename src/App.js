import React, { Component } from 'react';
import './App.css';
import Dashboard from './Dashboard';
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
	handleLogout = async () => {
		const logout = await fetch(process.env.REACT_APP_CLIENT_APP_URI +
			'/api/v1/chaseDay/auth/logout', {
				method: 'GET',
				credentials: 'include'
			}
		)
		if (!logout.ok) {
			throw Error(logout.statusText)
		}
		await logout.json()
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
					<Dashboard handleLogout={this.handleLogout} />
					: 
					<Login handleLogin={this.handleLogin} />
				}
			</div>
		);
	}
}

export default App;
