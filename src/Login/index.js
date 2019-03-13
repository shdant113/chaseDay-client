import React from 'react';
import '../App.css';
import './index.css';
import '../Header/index.css';

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
	showLoginPage = (e) => {
		e.preventDefault()
		this.setState({
			showRegistrationPage: false,
			registrationClass: "display-none",
			loginClass: "login-form"
		})
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
					<span className='head'>
						<div className='head-title1'>Chase</div>
						<div className='head-title2'>Day</div>
					</span>
				</div>
				<div className={this.state.loginClass}>
					{this.state.showIncorrectCredentials ? 
						<h2 className="login-screen-message">
							Incorrect login credentials. Please enter your information again.
						</h2>
						:
						<h2 className="login-screen-message">
							Welcome! Log in below.
						</h2>
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
				<div className="register-container">
					{ !this.state.showRegistrationPage ? 
						<h2 className="login-screen-message">Don't have an account? Click <a 
						href='' className="login-a" onClick={this.showRegistrationPage}>here</a>.
						</h2> 
						:
						<div className={this.state.registerClass}>
							<h2 className="login-screen-message">
								Register your account below, or click <a 
									href='' className="login-a" 
									onClick={this.showLoginPage}>here</a> to 
									return to the login screen.</h2>
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
				<div className="footer">
					<h5 className="login-screen-message">
						ChaseDay is a site built by a storm chaser for storm chasers. 
						ChaseDay is a place for chasers to log and discuss their chases, 
						celebrate their achievements, and do so in a community of other chasers.<br /><br />
						ChaseDay was built and designed by <a className="login-a" 
						href='https://www.facebook.com/spencer.dant.9'>Spencer Dant</a>. 
						ChaseDay is currently in development.
					</h5>
				</div>
			</div>
		)
	}
}

export default Login