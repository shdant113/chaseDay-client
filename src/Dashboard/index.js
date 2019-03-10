import React from 'react';
import '../App.css';
import './index.css';
import Settings from '../Settings';
import LogForm from '../LogForm';
import Profile from '../Profile';
import Header from '../Header';

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
				lastName: '',
				location: '',
				facebook: '',
				twitter: '',
				youtube: '',
				signature: '',
				bio: '',
				createdAt: null,
				profilePhoto: null,
				coverPhoto: null
			},
			newLog: {
				content: '',
				date: '',
				thumbnail: ''
			},
			editLog: {
				content: '',
				date: '',
				thumbnail: ''
			},
			dashClassName: 'logs-dash',
			accountSettingsClassName: 'display-none',
			accountProfileClassName: 'display-none',
			newLogClassName: 'display-none',
			editLogClassName: 'display-none',
			// profileSettingsClassName: 'display-none',
			rating: '',
			userLogs: [],
			messages: []
		}
	}
	componentDidMount = async () => {
		this.getDash()
	}
	handleLogout = () => {
		this.props.handleLogout()
	}
	getDash = async () => {
		try {
			const logs = await fetch(process.env.REACT_APP_CLIENT_APP_URI + 
				'/api/v1/chaseDay/logs/dashboard', {
					method: 'GET',
					credentials: 'include'
				}
			)
			if (!logs.ok) {
				throw Error(logs.statusText)
			}
			const logsResponse = await logs.json();
			this.setState({
				logs: logsResponse.data
			})
			this.getUser()
			this.displayDash()
		} catch (err) {
			console.log(err)
			return(err)
		}
	}
	getUser = async () => {
		try {
			const account = await fetch(process.env.REACT_APP_CLIENT_APP_URI +
				'/api/v1/chaseDay/user', {
					method: 'GET',
					credentials: 'include'
				}
			)
			if (!account.ok) {
				throw Error(account.statusText)
			}
			const accountResponse = await account.json();
			this.setState({
				account: accountResponse.data
			})
			this.getMessages()
		} catch (err) {
			console.log(err)
			return(err)
		}
	}
	getMessages = async () => {
		try {
			// this route needs to be restructed in the back end prior to launch
			// account for unread messages in models as well
			const messages = await fetch(process.env.REACT_APP_CLIENT_APP_URI +
				'/api/v1/chaseDay/messages/read_messages', {
					method: 'GET',
					credentials: 'include'
				}
			)
			if (!messages.ok) {
				throw Error(messages.statusText)
			}
			const messagesResponse = await messages.json();
			this.setState({
				messages: [...this.state.messages, messagesResponse.data]
			})
		} catch (err) {
			console.log(err)
			return(err)
		}
	}
	displayDash = () => {
		this.setState({
			dashClassName: 'logs-dash',
			accountSettingsClassName: 'display-none',
			accountProfileClassName: 'display-none',
			newLogClassName: 'display-none',
			editLogClassName: 'display-none'
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
	setProfileClassDisplayNone = () => {
		this.setState({
			accountProfileClassName: "display-none",
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
		try {
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
				logs: [...this.state.logs, response.data.log]
			})
			this.setNewLogClassDisplayNone();
		} catch (err) {
			console.log(err)
			return(err)
		}
	}
	showEditLogForm = (log, e) => {
		e.preventDefault()
		this.setState({
			editLogClassName: "logs-edit",
			accountProfileClassName: "display-none",
			editLog: {
				id: log.id,
				author: log.author,
				date: log.date,
				thumbnail: log.thumbnail,
				content: log.content
			}
		})
	}
	updateLog = async (e) => {
		e.preventDefault();
		try {
			const updateLog = await fetch(process.env.REACT_APP_CLIENT_APP_URI + 
				'/api/v1/chaseDay/logs/update_log/' + this.state.editLog.id, {
					method: 'PUT',
					credentials: 'include',
					body: JSON.stringify(this.state.editLog),
					headers: {
						'Content-Type': 'application/json'
					}
				}
			)
			if (!updateLog.ok) {
				throw Error(updateLog.statusText)
			}
			const response = await updateLog.json();
			const updatedLogs = this.state.logs.map((log) => {
				if (log.id === this.state.editLog.id) {
					log = response.data
				}
				return log
			})
			this.setState({
				logs: updatedLogs,
				editLog: {
					id: '',
					author: '',
					date: '',
					thumbnail: '',
					content: ''
				},
				editLogClassName: 'display-none',
				accountProfileClassName: 'account-profile'
			})
		} catch (err) {
			console.log(err)
			return(err)
		}
	}
	showUserProfile = async (id, e) => {
		e.preventDefault();
		try {
			const userProfile = await fetch(process.env.REACT_APP_CLIENT_APP_URI + 
				'/api/v1/chaseDay/user/user_profile/' + id, {
					method: 'GET',
					credentials: 'include'
				}
			)
			if (!userProfile.ok) {
				throw Error(userProfile.statusText)
			}
			const response = await userProfile.json()
			this.setState({
				account: response.data.user,
				userLogs: response.data.logs,
				accountProfileClassName: "account-profile",
				dashClassName: "display-none"
			})
		} catch (err) {
			console.log(err)
			return(err)
		}
	}
	closeProfile = (e) => {
		e.preventDefault();
		this.setState({
			account: {
				id: this.state.account.id,
				firstName: this.state.account.firstName,
				lastName: this.state.account.lastName,
				username: '',
				email: '',
				location: '',
				facebook: '',
				twitter: '',
				youtube: '',
				signature: '',
				bio: '',
				createdAt: null,
				profilePhoto: null,
				coverPhoto: null
			},
			userLogs: [],
			accountProfileClassName: "display-none",
			dashClassName: "logs-dash"
		})
		this.getDash()
		this.getUser()
	}
	// showProfileSettings = (e) => {
	// 	e.preventDefault()
	// 	this.setState({
	// 		accountProfileClassName: "display-none",
	// 		profileSettingsClassName: "profile-settings-form",
	// 		accountSettingsClassName: 'display-none',
	// 		newLogClassName: 'display-none',
	// 		editLogClassName: 'display-none'
	// 	})
	// }
	// updateProfileSettings = async (e) => {
	// 	e.preventDefault()
	// 	try {
	// 		const account = await fetch(process.env.REACT_APP_CLIENT_APP_URI +
	// 			'/api/v1/chaseDay/user/update_profile_settings' + 
	// 			this.state.account.id, {
	// 				method: 'PUT',
	// 				credentials: 'include',
	// 				body: JSON.stringify(this.state.account),
	// 				headers: {
	// 					'Content-Type': 'application/json'
	// 				}
	// 			}
	// 		)
	// 		if (!account.ok) {
	// 			throw Error(account.statusText)
	// 		}
	// 		const response = await account.json();
	// 		this.setState({
	// 			accountProfileClassName: "account-profile",
	// 			profileSettingsClassName: "display-none"
	// 		})
	// 	} catch (err) {
	// 		console.log(err)
	// 		return(err)
	// 	}
	// }
	showAccountSettings = async () => {
		try {
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
				dashClassName: "display-none",
				accountProfileClassName: "display-none"
			})
		} catch (err) {
			console.log(err)
			return(err)
		}
	}
	updateAccount = async (e) => {
		e.preventDefault();
		try {
			const updateAccount = await fetch(process.env.REACT_APP_CLIENT_APP_URI +
					'/api/v1/chaseDay/user/update_settings/' +
					this.state.account._id, {
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
				account: response.data
			})
			this.setSettingsClassDisplayNone();
			this.getDash()
			this.getUser()
		} catch (err) {
			console.log(err)
			return(err)
		}
	}
	// stopped by cors, or perhaps the body isn't translating?
	rateUp = async (id, e) => {
		e.preventDefault()
		const body = 1
		this.setState({
			rating: body
		})
		console.log(this.state)
		try {
			const rating = await fetch(process.env.REACT_APP_CLIENT_APP_URI + 
				'/api/v1/chaseDay/ratings/rate/' + id, {
					method: 'POST',
					credentials: 'include',
					body: JSON.stringify(this.state.rating),
					headers: {
						'Content-Type': 'application/json'
					}
				}
			)
			console.log('request sent')
			if (!rating.ok) {
				throw Error(rating.statusText)
			}
			await rating.json();
			this.setState({
				rating: ''
			})
		} catch (err) {
			console.log(err)
			return(err)
		}
	}
	// ""
	rateDown = async (id, e) => {
		e.preventDefault()
		const body = 2
		this.setState({
			rating: body
		})
		console.log(this.state)
		try {
			const rating = await fetch(process.env.REACT_APP_CLIENT_APP_URI + 
				'/api/v1/chaseDay/ratings/rate/' + id, {
					method: 'POST',
					credentials: 'include',
					body: JSON.stringify(this.state.rating),
					headers: {
						'Content-Type': 'application/json'
					}
				}
			)
			console.log('request sent')
			if (!rating.ok) {
				throw Error(rating.statusText)
			}
			await rating.json();
			this.setState({
				rating: ''
			})
		} catch (err) {
			console.log(err)
			return(err)
		}
	}
	render() {
		console.log(this.state)
		const logs = this.state.logs.map((log, i) => {
			console.log(log)
			return <li key={log.id}>
				{log.author} <br />
				{log.createdAt.toString()} <br />
				<img src={log.thumbnail} alt={log.author}/> <br />
				{log.content} <br /><br />
				<button onClick={this.rateUp.bind(null, log.id)}>Rate Up</button>
				<button onClick={this.rateDown.bind(null, log.id)}>Rate Down</button>
				<button onClick={this.showUserProfile.bind(null, log.user_id)}>Go to {log.author}'s profile</button>
				<br /><br />
			</li>
		})
		return (
			<div className="dash-wrap">
				<div className="header">
					<Header account={this.state.account}
					getDash={this.getDash} logout={this.handleLogout}
					showUserProfile={this.showUserProfile} />
				</div>
				<div className={this.state.dashClassName}>
					<h1>this is your dashboard</h1>
					<button onClick={this.showNewLogForm}>Write a New Log</button>
					<button onClick={this.showUserProfile.bind(null, this.state.account.id)}>Go to Profile</button>
					<div className="logs">
						<ul>
							{logs}
						</ul>
					</div>
					<button onClick={this.showAccountSettings}>click this to show account settings</button>
				</div>
				<div className={this.state.accountProfileClassName}>
					<Profile account={this.state.account}
					userLogs={this.state.userLogs}
					closeProfile={this.closeProfile}
					rateUp={this.rateUp} rateDown={this.rateDown}
					/>
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