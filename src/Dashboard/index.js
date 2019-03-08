import React from 'react';
import '../App.css';
import './index.css';
import Settings from '../Settings';

class Dashboard extends React.Component {
	constructor() {
		super();
		this.state = {
			logs: [],
			account: {
				username: '',
				email: '',
				firstName: '',
				lastName: ''
			},
			accountSettingsClassName: 'display-none',
			dashClassName: 'logs-dash'
		}
	}
	componentDidMount = async () => {
		const logs = await fetch(process.env.REACT_APP_CLIENT_APP_URI + 
			'/api/v1/chaseDay/logs/dashboard', {
				method: 'GET',
				credentials: 'include'
			}
		)
		if (!logs.ok) {
			throw Error(logs.statusText)
		}
		const response = await logs.json();
		this.setState({
			logs: response.data
		})
	}
	showAccountSettings = async () => {
		const account = await fetch(process.env.REACT_APP_CLIENT_APP_URI + 
			'/api/v1/chaseDay/user/account_settings', {
				method: 'GET',
				credentials: 'include'
			}
		)
		if (!account.ok) {
			throw Error(account.statusText)
		}
		const response = await account.json();
		this.setState({
			account: {
				username: response.data.username,
				email: response.data.email,
				firstName: response.data.firstName,
				lastName: response.data.lastName
			},
			accountSettingsClassName: "account-settings",
			dashClassName: "display-none"
		})
	}
	setSettingsClassDisplayNone = () => {
		this.setState({
			accountSettingsClassName: "display-none",
			dashClassName: "logs-dash"
		})
	}
	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
	}
	render() {
		console.log(this.state)
		const logs = this.state.logs.map((log, i) => {
			return <li key={i}>
				{log.author} <br />
				{log.createdAt.toString()} <br />
				{log.content} <br /><br />
			</li>
		})
		return (
			<div className="dash-wrap">
				<div className={this.state.dashClassName}>
					<h1>this is your dashboard</h1>
					<div className="logs">
						<ul>
							{logs}
						</ul>
					</div>
					<button onClick={this.showAccountSettings}>click this to show account settings</button>
				</div>
				<div className={this.state.accountSettingsClassName}>
					<Settings account={this.state.account} 
					closeSettings={this.setSettingsClassDisplayNone} 
					handleChange={this.handleChange}
					updateAccount={this.updateAccount}/>
				</div>
			</div>
		)
	}
}

export default Dashboard