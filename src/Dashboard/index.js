import React from 'react';
import '../App.css';
import './index.css';
import Settings from '../Settings';
import LogForm from '../LogForm';

class Dashboard extends React.Component {
	constructor() {
		super();
		this.state = {
			logs: [],
			account: {
				_id: null,
				username: '',
				email: '',
				firstName: '',
				lastName: ''
			},
			newLog: {
				content: '',
				date: '',
				thumbnail: ''
			},
			accountSettingsClassName: 'display-none',
			dashClassName: 'logs-dash',
			newLogClassName: 'display-none'
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
	setSettingsClassDisplayNone = () => {
		this.setState({
			accountSettingsClassName: "display-none",
			dashClassName: "logs-dash"
		})
	}
	setNewLogClassDisplayNone = () => {
		this.setState({
			newLogClassName: "display-none",
			dashClassName: "logs-dash"
		})
	}
	handleChangeAccount = (e) => {
		this.setState({
			account: {
				...this.state.account,
				[e.target.name]: e.target.value
			}
		});
	}
	handleChangeLog = (e) => {
		this.setState({
			newLog: {
				...this.state.newLog,
				[e.target.name]: e.target.value
			}
		})
	}
	showNewLogForm = () => {
		this.setState({
			newLogClassName: "logs-new",
			dashClassName: "display-none"
		})
	}
	postNewLog = async (e) => {
		e.preventDefault();
		const newLog = await fetch(process.env.REACT_APP_CLIENT_APP_URI + 
			'/api/v1/chaseDay/logs/new_log', {
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify(this.state.newLog),
				headers: {
					'Content-Type': 'application/json'
				}
			}
		)
		if (!newLog.ok) {
			throw Error(newLog.statusText)
		}
		const response = await newLog.json();
		this.setState({
			logs: [this.state.saved, response.data.log]
		})
		this.setNewLogClassDisplayNone();
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
				_id: response.data.id,
				username: response.data.username,
				email: response.data.email,
				firstName: response.data.firstName,
				lastName: response.data.lastName
			},
			accountSettingsClassName: "account-settings",
			dashClassName: "display-none"
		})
	}
	updateAccount = async (e) => {
		e.preventDefault();
		const updateAccount = await fetch(process.env.REACT_APP_CLIENT_APP_URI +
			'/api/v1/chaseDay/user/update_settings/' + this.state.account._id, {
				method: 'PUT',
				credentials: 'include',
				body: JSON.stringify(this.state.account),
				headers: {
					'Content-Type': 'application/json'
				}
		})
		if (!updateAccount.ok) {
			throw Error(updateAccount.statusText)
		}
		const response = await updateAccount.json();
		this.setState({
			account: {
				_id: null,
				username: '',
				email: '',
				firstName: '',
				lastName: ''
			}
		})
		this.setSettingsClassDisplayNone();
	}
	render() {
		console.log(this.state)
		const logs = this.state.logs.map((log, i) => {
			return <li key={i}>
				{log.author} <br />
				{log.createdAt.toString()} <br />
				{log.thumbnail} <br />
				{log.content} <br /><br />
			</li>
		})
		return (
			<div className="dash-wrap">
				<div className={this.state.dashClassName}>
					<h1>this is your dashboard</h1>
					<button onClick={this.showNewLogForm}>Write a New Log</button>
					<div className="logs">
						<ul>
							{logs}
						</ul>
					</div>
					<button onClick={this.showAccountSettings}>click this to show account settings</button>
				</div>
				<div className={this.state.newLogClassName}>
					<LogForm newLog={this.state.newLog}
					// needs security for file upload prior to launch
					closeForm={this.setNewLogClassDisplayNone}
					handleChange={this.handleChangeLog}
					postNewLog={this.postNewLog}/>
				</div>
				<div className={this.state.accountSettingsClassName}>
					<Settings account={this.state.account} 
					closeSettings={this.setSettingsClassDisplayNone} 
					handleChange={this.handleChangeAccount}
					updateAccount={this.updateAccount}/>
				</div>
			</div>
		)
	}
}

export default Dashboard