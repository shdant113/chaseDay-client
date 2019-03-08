import React from 'react';

class Dashboard extends React.Component {
	constructor() {
		super();
		this.state = {
			logs: [],
			account: [],
			accountSettingsOpen: false,
			dashClassName: ''
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
			account: response.data,
			accountSettingsOpen: true
		})
	}
	hideAccountSettings = () => {
		this.setState({
			account: '',
			accountSettingsOpen: false
		})
	}
	render() {
		console.log(this.state.logs)
		const logs = this.state.logs.map((log, i) => {
			return <li key={i}>
				{log.author} <br />
				{log.createdAt.toString()} <br />
				{log.content} <br /><br />
			</li>
		})
		return (
			<div className="logs-dash" {this.state.dashClassName}>
				<h1>this is your dashboard</h1>
				<div className="logs">
					<ul>
						{logs}
					</ul>
				</div>
			</div>
			{ this.state.accountSettingsOpen ? 
				<Settings account={this.state.account} 
				closeSettings={this.hideAccountSettings}/>
				: null
			}
		)
	}
}

export default Dashboard