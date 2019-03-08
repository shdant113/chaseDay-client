import React from 'react';

const Settings = (props) => {
	return (
		<div className="settings-wrap">
			<h1>Your Account Settings</h1>
			<button onClick={props.closeSettings}>Go back to my dash!</button>
			<div>
				<form className="settings-form" onSubmit={props.updateAccount}>
					<label>Username: <br />
						<input type='text' name='username' 
						value={props.account.username} 
						placeholder='Username' 
						onChange={props.handleChange} />
					</label>
					<br />
					<label>Email: <br />
						<input type='email' name='email' 
						value={props.account.email} 
						placeholder='Email' 
						onChange={props.handleChange} />
					</label>
					<br />
					<label>First Name: <br />
						<input type='text' name='firstName' 
						value={props.account.firstName} 
						placeholder='First Name' 
						onChange={props.handleChange} />
					</label>
					<br />
					<label>Last Name: <br />
						<input type='text' name='lastName' 
						value={props.account.lastName} 
						placeholder='Last Name' 
						onChange={props.handleChange} />
					</label>
					<br />
					<input type='submit' />	
				</form>
			</div>
		</div>
	)
}

export default Settings