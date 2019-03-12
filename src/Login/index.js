import React from 'react';
import '../App.css';

class Login extends React.Component {
	constructor() {
		super();
		this.state = {
			username: '',
			password: '',
			email: '',
			firstName: '',
			lastName: '',
			showIncorrectCredentials: false,
			showRegistrationPage: false,
			registrationMessage: '',
			loginClass: "login-form",
			registrationClass: "display-none"
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
			if (!loginResponse.ok) {
				throw Error(loginResponse.statusText)
			}
			const response = await loginResponse.json();
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
	showRegistrationPage = (e) => {
		e.preventDefault()
		this.setState({
			showRegistrationPage: true,
			loginClass: "display-none",
			registrationClass: "register-form"
		})
	}
	handleRegistration = async (e) => {
		e.preventDefault()
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
					username: this.state.username,
					firstName: this.state.firstName,
					lastName: this.state.lastName,
					showRegistrationPage: false,
					loginClass: "login-form",
					registrationClass: "display-none"
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
				<div className={this.state.loginClass}>
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
					{ !this.state.showRegistrationPage ? 
						<h2>Don't have an account? Click 
						<button className="login-a" onClick={this.showRegistrationPage}>here</button>.
						</h2> 
						:
						<div className={this.state.registerClass}>
							<h2>Register your account below.</h2>
							<div className="register-container">
								<form className="login-form" onSubmit={this.handleRegistration}>
									<label>Username: <br />
										<input type='text' name='username' 
										value={this.state.username} 
										placeholder='Username' 
										onChange={this.handleChange} />
									</label>
									<br />
									<label>Password: <br />
										<input type='password' name='password' 
										value={this.state.password}
										onChange={this.handleChange} />
									</label>
									<br />
									<label>Email: <br />
										<input type='email' name='email' 
										value={this.state.email} 
										placeholder='Email' 
										onChange={this.handleChange} />
									</label>
									<br />
									<label>First Name: <br />
										<input type='text' name='firstName' 
										value={this.state.firstName} 
										placeholder='First Name' 
										onChange={this.handleChange} />
									</label>
									<br />
									<label>Last Name: <br />
										<input type='text' name='lastName' 
										value={this.state.lastName} 
										placeholder='Last Name' 
										onChange={this.handleChange} />
									</label>
									<br />
									<label>Location: <br />
										<input type='text' name='location' 
										value={this.state.location} 
										placeholder='Chicago, IL' 
										onChange={this.handleChange} />
									</label>
									<br />
									<input type='submit' />
								</form>
							</div>
						</div>
					}
				</div>
			</div>
		)
	}
}

export default Login