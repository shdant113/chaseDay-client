import React from 'react';
import '../App.css';
import './index.css';
import Settings from '../Settings';
import LogForm from '../LogForm';
import LogView from '../LogView';
import EditLog from '../EditLog';
import Profile from '../Profile';
import Header from '../Header';
import MessageForm from '../MessageForm';
import Inbox from '../Inbox';

class Dashboard extends React.Component {
	constructor() {
		super();
		this.state = {
			logs: [],
			userLogs: [],
			messages: [],
			unread: undefined,
			account: {
				_id: undefined,
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
				createdAt: undefined,
				profilePhoto: '',
				coverPhoto: '',
				profileVideo: ''
			},
			newLog: {
				content: '',
				date: '',
				title: ''
			},
			editLog: {
				id: undefined,
				content: '',
				date: '',
				title: ''
			},
			logToRemove: '',
			openLogView: false,
			viewingLog: '',
			newMessage: {
				content: '',
				recipient: undefined
			},
			// viewingMessage: {
			// 	content: '',
			// 	author: '',
			// 	timestamp: ''
			// }
			dashClassName: 'logs-dash',
			accountSettingsClassName: 'display-none',
			accountProfileClassName: 'display-none',
			newLogClassName: 'display-none',
			editLogClassName: 'display-none',
			newMessageFormClassName: 'display-none',
			// inboxClassName: 'display-none',
			// inboxWrapClassName: 'display-none',
			// readMessage: false,
			// messageViewClassName: 'display-none'
			// rating: ''
			// logPhotos: []
		}
	}
	componentDidMount = async () => {
		this.getDash()
		// this.getLogAuthorPicture()
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
			console.log(logsResponse)
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
			const messages = await fetch(process.env.REACT_APP_CLIENT_APP_URI +
				'/api/v1/chaseDay/messages', {
					method: 'GET',
					credentials: 'include'
				}
			)
			if (!messages.ok) {
				throw Error(messages.statusText)
			}
			const messagesResponse = await messages.json();
			const checkUnread = messagesResponse.data.some(message => message.unread === true);
			if (checkUnread === true) {
				this.setState({
					unread: true
				})
			} else {
				this.setState({
					unread: false
				})
			}
		} catch (err) {
			console.log(err)
			return(err)
		}
	}
	showInbox = async (id, e) => {
		e.preventDefault()
		try {
			const inbox = await fetch(process.env.REACT_APP_CLIENT_APP_URI + 
				'/api/v1/chaseDay/messages/inbox/' + id, {
					method: 'GET',
					credentials: 'include'
				}
			)
			if (!inbox.ok) {
				throw Error(inbox.statusText)
			}
			const response = await inbox.json();
			console.log(response)
			this.setState({
				messages: response.data,
				dashClassName: "display-none",
				openLogView: false,
				inboxWrapClassName: "inbox",
				unread: false,
				accountSettingsClassName: 'display-none',
				newLogClassName: 'display-none',
				editLogClassName: 'display-none',
				newMessageFormClassName: 'display-none',
				inboxClassName: 'display-none',
				accountProfileClassName: "display-none"
			})
		} catch (err) {
			console.log(err)
			return(err)
		}
	}
	// readMessage = (id, e) => {
	// 	e.preventDefault()
	// 	try {
	// 		const message = await fetch(process.env.REACT_APP_CLIENT_APP_URI + 
	// 			'/api/v1/chaseDay/messages/message/' + id, {
	// 				method: 'GET',
	// 				credentials: 'include'
	// 			}
	// 		)
	// 		if (!message.ok) {
	// 			throw Error(message.statusText)
	// 		}
	// 		const response = await message.json();
	// 		this.setState({
	// 			viewingMessage: {
	// 				content: response.data.content,
	// 				author: response.data.author,
	// 				timestamp: response.data.createdAt
	// 			},
	// 			inboxClassName: 'opaque',
	// 			readMessage: true
	// 		})
	// 	} catch (err) {
	// 		console.log(err)
	// 		return(err)
	// 	}
	// }
	showMessageForm = (id, e) => {
		e.preventDefault()
		this.setState({
			dashClassName: "display-none",
			newMessageFormClassName: "message-form",
			inboxWrapClassName: "display-none",
			newMessage: {
				recipient: id
			}
		})
	}
	sendMessage = async (e) => {
		e.preventDefault()
		try {
			const newMessage = await fetch(process.env.REACT_APP_CLIENT_APP_URI + 
				'/api/v1/chaseDay/messages/new_message/' + 
				this.state.newMessage.recipient, {
					method: 'POST',
					credentials: 'include',
					body: JSON.stringify(this.state.newMessage),
					headers: {
						'Content-Type': 'application/json'
					}
				}
			)
			if (!newMessage.ok) {
				throw Error(newMessage.statusText)
			}
			await newMessage.json();
			this.setState({
				newMessage: {
					content: ''
				}
			})
			this.getDash()
		} catch (err) {
			console.log(err)
			return(err)
		}
	}
	removeMessageFromInbox = async (id, e) => {
		e.preventDefault()
		try {
			const eraseMessage = await fetch(process.env.REACT_APP_CLIENT_APP_URI + 
				'/api/v1/chaseDay/messages/update_message_inactive/' + id, {
					method: 'PUT',
					credentials: 'include',
					body: this.state.messages.id,
					headers: {
						'Content-Type': 'application/json'
					}
				}
			)
			if (!eraseMessage.ok) {
				throw Error(eraseMessage.statusText)
			}
			await eraseMessage.json();
			const inbox = await fetch(process.env.REACT_APP_CLIENT_APP_URI + 
				'/api/v1/chaseDay/messages/inbox/' + this.state.account.id, {
					method: 'GET',
					credentials: 'include'
				}
			)
			if (!inbox.ok) {
				throw Error(inbox.statusText)
			}
			const newInbox = await inbox.json();
			this.setState({
				messages: newInbox.data
			})
		} catch (err) {
			console.log(err)
			return(err)
		}
	}
	displayDash = () => {
		this.setState({
			dashClassName: 'logs-dash',
			openLogView: false,
			accountSettingsClassName: 'display-none',
			accountProfileClassName: 'display-none',
			newLogClassName: 'display-none',
			editLogClassName: 'display-none',
			newMessageFormClassName: 'display-none',
			inboxClassName: 'display-none',
			inboxWrapClassName: 'display-none'
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
	handleChangeEditLog = (e) => {
		this.setState({
			editLog: {
				...this.state.editLog,
				[e.target.name]: e.target.value
			}
		})
	}
	handleChangeMessage = (e) => {
		this.setState({
			newMessage: {
				...this.state.newMessage,
				content: e.target.value
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
			await newLog.json();
			this.getDash();
		} catch (err) {
			console.log(err)
			return(err)
		}
	}
	showEditLogForm = (log, e) => {
		e.preventDefault()
		this.setState({
			editLogClassName: "logs-edit",
			openLogView: false,
			editLog: {
				id: log.id,
				date: log.date,
				title: log.title,
				content: log.content
			}
		})
		console.log(this.state.editLog)
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
			// const updatedLogs = this.state.logs.map((log) => {
			// 	if (log.id === this.state.editLog.id) {
			// 		log = response.data
			// 	}
			// 	return log
			// })
			this.setState({
				// logs: updatedLogs,
				editLog: {
					id: '',
					author: '',
					date: '',
					title: '',
					content: ''
				}
			})
			this.getDash()
		} catch (err) {
			console.log(err)
			return(err)
		}
	}
	removeLog = async (id, e) => {
		this.setState({
			logToRemove: id
		})
		e.preventDefault()
		try {
			const removeLog = await fetch(process.env.REACT_APP_CLIENT_APP_URI + 
				'/api/v1/chaseDay/logs/log_remove/' + id, {
					method: 'PUT',
					credentials: 'include',
					body: this.state.logToRemove,
					headers: {
						'Content-Type': 'application/json'
					}
				}
			)
			if (!removeLog.ok) {
				throw Error(removeLog.statusText)
			}
			await removeLog.json();
			this.setState({
				logToRemove: ''
			})
			this.getDash()
		} catch (err) {
			console.log(err)
			return(err)
		}
	}
	readLog = async (id, e) => {
		e.preventDefault();
		try {
			const getLog = await fetch(process.env.REACT_APP_CLIENT_APP_URI + 
				'/api/v1/chaseDay/logs/' + id, {
					method: 'GET',
					credentials: 'include'
				}
			)
			if (!getLog.ok) {
				throw Error(getLog.statusText)
			}
			const response = await getLog.json();
			console.log(response)
			this.setState({
				viewingLog: response.data,
				openLogView: true,
				dashClassName: 'display-none',
				accountProfileClassName: 'display-none'
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
			const response = await userProfile.json();
			console.log(response)
			this.setState({
				account: response.data.user,
				userLogs: response.data.logs,
				openLogView: false,
				dashClassName: 'display-none',
				accountSettingsClassName: 'display-none',
				newLogClassName: 'display-none',
				editLogClassName: 'display-none',
				newMessageFormClassName: 'display-none',
				inboxClassName: 'display-none',
				inboxWrapClassName: 'display-none',
				accountProfileClassName: "account-profile"
			})
		} catch (err) {
			console.log(err)
			return(err)
		}
	}
	closeProfile = (e) => {
		e.preventDefault();
		this.setState({
			userLogs: []
		})
		this.getDash()
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
				openLogView: false,
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
			console.log(response)
			this.setState({
				account: response.data
			})
			this.getDash()
		} catch (err) {
			console.log(err)
			return(err)
		}
	}
	// stopped by cors, or perhaps the body isn't translating?
	// rateUp = async (id, e) => {
	// 	e.preventDefault()
	// 	this.setState({
	// 		rating: 'up'
	// 	})
	// 	try {
	// 		const rating = await fetch(process.env.REACT_APP_CLIENT_APP_URI + 
	// 			'/api/v1/chaseDay/ratings/rate/' + id, {
	// 				method: 'POST',
	// 				credentials: 'include',
	// 				body: this.state.rating,
	// 				headers: {
	// 					'Content-Type': 'application/json'
	// 				}
	// 			}
	// 		)
	// 		console.log('request sent')
	// 		if (!rating.ok) {
	// 			throw Error(rating.statusText)
	// 		}
	// 		await rating.json();
	// 		this.setState({
	// 			rating: ''
	// 		})
	// 	} catch (err) {
	// 		console.log(err)
	// 		return(err)
	// 	}
	// }
	// // ""
	// rateDown = async (id, e) => {
	// 	e.preventDefault()
	// 	this.setState({
	// 		rating: 'down'
	// 	})
	// 	console.log(this.state)
	// 	try {
	// 		const rating = await fetch(process.env.REACT_APP_CLIENT_APP_URI + 
	// 			'/api/v1/chaseDay/ratings/rate/' + id, {
	// 				method: 'POST',
	// 				credentials: 'include',
	// 				body: this.state.rating,
	// 				headers: {
	// 					'Content-Type': 'application/json'
	// 				}
	// 			}
	// 		)
	// 		console.log('request sent')
	// 		if (!rating.ok) {
	// 			throw Error(rating.statusText)
	// 		}
	// 		await rating.json();
	// 		this.setState({
	// 			rating: ''
	// 		})
	// 	} catch (err) {
	// 		console.log(err)
	// 		return(err)
	// 	}
	// }
	onReady = (e) => {
		e.target.pauseVideo();
	}
	// getLogAuthorPicture = async () => {
	// 	try {
	// 		const user = await fetch(process.env.REACT_APP_CLIENT_APP_URI + 
	// 			'/api/v1/chaseDay/logs/log_users', {
	// 				method: 'GET',
	// 				credentials: 'include'
	// 			}
	// 		)
	// 		if (!user.ok) {
	// 			throw Error(user.statusText)
	// 		}
	// 		const response = await user.json();
	// 		console.log(response)
	// 	} catch (err) {
	// 		console.log(err)
	// 		return(err)
	// 	}
	// }
	render() {
		const logs = this.state.logs.map((log, i) => {
			if (log.user_id !== this.state.account.id) {
				return <div className="log-card" key={log.id}>
					<img src={log.user.profilePhoto} alt={log.user.username} /><br />
					<a href='' onClick={this.showUserProfile.bind(null, log.user_id)}>Written by {log.user.firstName} {log.user.lastName}</a> <br />
					{log.title} <br />
					{log.createdAt.toString()} <br /><br />
					{log.content} <br /><br />
					<button onClick={this.showUserProfile.bind(null, log.user_id)}>Go to {log.user.firstName} {log.user.lastName}'s profile</button>
					<button onClick={this.showMessageForm.bind(null, log.user_id)}>Send {log.user.firstName} {log.user.lastName} a message</button>
					<br />
					<button onClick={this.readLog.bind(null, log.id)}>Expand</button>
					<br /><br />
				</div>
			} else {
				return null
			}
		})
		return (
			<div className="dash-wrap">
				<div className="header">
					<Header account={this.state.account}
					unread={this.state.unread}
					getDash={this.getDash} logout={this.handleLogout}
					showUserProfile={this.showUserProfile}
					showInbox={this.showInbox} />
				</div>
				<div className={this.state.dashClassName}>
					<h1>this is your dashboard</h1>
					<button onClick={this.showNewLogForm}>Write a New Log</button>
					<button onClick={this.showUserProfile.bind(null, this.state.account.id)}>Go to Profile</button>
					<div className="logs">
						{logs}
					</div>
					<button onClick={this.showAccountSettings}>click this to show account settings</button>
				</div>
				<div className={this.state.accountProfileClassName}>
					<Profile account={this.state.account}
					userLogs={this.state.userLogs}
					showMessageForm={this.showMessageForm}
					closeProfile={this.closeProfile}
					rateUp={this.rateUp} rateDown={this.rateDown}
					onReady={this.onReady} readLog={this.readLog} />
				</div>
				<div className={this.state.newLogClassName}>
					<LogForm newLog={this.state.newLog}
					closeForm={this.displayDash}
					handleChange={this.handleChangeLog}
					postNewLog={this.postNewLog} />
				</div>
				<div className={this.state.editLogClassName}>
					<EditLog editLog={this.state.editLog}
					removeLog={this.removeLog}
					closeForm={this.displayDash}
					handleChange={this.handleChangeEditLog}
					updateLog={this.updateLog} />
				</div>
				<div className={this.state.accountSettingsClassName}>
					<Settings account={this.state.account} 
					closeSettings={this.displayDash} 
					handleChange={this.handleChangeAccount}
					updateAccount={this.updateAccount} />
				</div>
				<div className={this.state.newMessageFormClassName}>
					<MessageForm newMessage={this.state.newMessage}
					closeForm={this.displayDash}
					handleChange={this.handleChangeMessage}
					sendMessage={this.sendMessage} />
				</div>
				<div className={this.state.inboxWrapClassName}>
					<Inbox messages={this.state.messages}
					inboxClassName={this.state.inboxClassName}
					readMessage={this.state.readMessage}
					closeInbox={this.displayDash}
					viewingMessage={this.state.viewingMessage}
					showMessageForm={this.showMessageForm}
					removeMessage={this.removeMessageFromInbox}/>
				</div>
				{ this.state.openLogView ? 
					<div className="log-view">
						<LogView log={this.state.viewingLog}
						account={this.state.account}
						editLog={this.showEditLogForm}
						open={this.state.openLogView}
						closeLog={this.closeLog} 
						showUserProfile={this.showUserProfile}
						showMessageForm={this.showMessageForm} />
					</div>
				: null }
			</div>
		)
	}
}

export default Dashboard