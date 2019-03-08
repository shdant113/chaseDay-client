import React from 'react';
import Register from '../Register';

class Login extends React.Component {
	constructor() {
		super();
		this.state = {
			username: '',
			password: '',
			showIncorrectCredentials: false,
			showRegistrationPage: false,
			registrationMessage: '',
			loginClass: null,
			registrationClass: null
		}
	} 
	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}
	handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = process.env.REACT_APP_CLIENT_APP_URI + '/api/v1/chaseDay/auth/login'
			const body = JSON.stringify({
				username: this.state.username,
				password: this.state.password
			})
			const loginResponse = await fetch(url, {
					method: 'POST',
					credentials: 'include',
					body: body,
					headers: {
						'Content-Type': 'application/json'
					}
				}
			)
			console.log('past the fetch call')
			if (!loginResponse.ok) {
				throw Error(loginResponse.statusText)
			}
			const response = await loginResponse.json();
			console.log(response)
			if (response.data.message === 'Login information correct') {
				this.props.handleLogin();
			} else {
				this.setState({
					username: '',
					password: '',
					showIncorrectCredentials: true
				})
			}
		} catch (err) {
			console.error(err)
			return (err)
		}
	}
	showRegistrationPage = () => {
		this.setState({
			showRegistrationPage: true
		})
	}
	handleRegistration = async (state) => {
		try {
			const registrationResponse = await fetch(
				process.env.REACT_APP_CLIENT_APP_URI + 
				'/api/v1/chaseDay/auth/register', {
					method: 'POST',
					credentials: 'include',
					body: JSON.stringify(this.state),
					headers: {
						'Content-Type': 'application/json'
					}
				}
			)
			if (!registrationResponse.ok) {
				throw Error(registrationResponse.statusText)
			}
			const response = await registrationResponse.json();
			if (response.data.user) {
				this.setState({
					username: state.username,
					password: state.password,
					showRegistrationPage: false
				})
				this.props.handleLogin()
			} else {
				this.setState({
					registrationMessage: 'Something went wrong.'
				})
			}
		} catch (err) {
			console.log(err)
			return(err)
		}
	}
	render() {
		return (
			<div className="login-modal">
				<div className="login-modal-header">
					<h1>(put something here, make it look nice)</h1>
				</div>
				<div className="login-state-will-go-here">
					{this.state.showIncorrectCredentials ? 
						<h3 className="login-screen-message">
							Incorrect login credentials. Please enter your information again.
						</h3>
						:
						<h3 className="login-screen-message">
							Welcome! Log in below.
						</h3>
					}
					<form className="login-form" onSubmit={this.handleSubmit}>
						<label>Username: <br />
						<input type="text" name="username" value={this.state.username}
							placeholder="Username" onChange={this.handleChange} />
						</label> <br />
						<label>Password: <br />
						<input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
						</label> <br />
						<input type="submit" />
					</form>
				</div>
				<div className="register-state-will-go-here">
					{ !this.state.showRegistration ? 
						<h2>Don't have an account? Click 
						<button className="login-a" onClick={this.registrationOpen}>here</button>.
						</h2> 
						:
						<h2>Register your account below.</h2> 
					}
					{ this.state.showRegistration ? 
						<Register handleRegistration={this.handleRegistration} 
						showRegistration={this.state.showRegistration} /> 
						: null
					}
				</div>
			</div>
		)
	}
}

export default Login