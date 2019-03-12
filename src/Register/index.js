import React from 'react';

class Register extends React.Component {
	constructor() {
		super();
		this.state = {
			username: '',
			password: '',
			email: '',
			firstName: '',
			lastName: '',
			location: ''
		}
	}
	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
	}
	onSubmit = (e) => {
		e.preventDefault();
		this.props.handleRegistration(this.state);
	} 
	render() {
		return (
			<div className="register-modal">
				<div className="register-container">
					<form className="login-form" onSubmit={this.onSubmit}>
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
		)
	}
}

export default Register;
