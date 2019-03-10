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
					<label>Location: <br />
						<input type='text' name='location' 
						value={props.account.location} 
						placeholder='Location' 
						onChange={props.handleChange} />
					</label>
					<br />
					<label>Facebook: <br />
						<input type='text' name='facebook' 
						value={props.account.facebook} 
						placeholder='https://www.facebook.com/' 
						onChange={props.handleChange} />
					</label>
					<br />
					<label>Twitter: <br />
						<input type='text' name='twitter' 
						value={props.account.twitter} 
						placeholder='https://www.twitter.com' 
						onChange={props.handleChange} />
					</label>
					<br />
					<label>Youtube: <br />
						<input type='text' name='youtube' 
						value={props.account.youtube} 
						placeholder='https://www.youtube.com' 
						onChange={props.handleChange} />
					</label>
					<br />
					<label>Bio: <br />
						<input type='textarea' name='bio' 
						value={props.account.bio} 
						placeholder='Write something about yourself!' 
						onChange={props.handleChange}
						rows="50" wrap="soft" />
					</label>
					<br />
					<label>Profile Photo: <br />
						<label className="upload-label"
						style={{
							background: "buttonface",
							border: "1px solid rgb(216, 216, 216)",
							padding: "1px 7px 2px",
							cursor: "pointer",
							font: "400 11px system-ui"
						}}>Upload A File<br />
						<input className="image-file" type='file' name='profilePhoto'
						accept=".jpg,.jpeg,.png" style={{display: "none"}}
						value={props.account.profilePhoto}
						onChange={props.handleChange} /></label>
					</label>
					<br />
					<label>Cover Photo: <br />
						<label className="upload-label"
						style={{
							background: "buttonface",
							border: "1px solid rgb(216, 216, 216)",
							padding: "1px 7px 2px",
							cursor: "pointer",
							font: "400 11px system-ui"
						}}>Upload A File<br />
						<input className="image-file" type='file' name='coverPhoto'
						accept=".jpg,.jpeg,.png" style={{display: "none"}}
						value={props.account.coverPhoto}
						onChange={props.handleChange} /></label>
					</label>
					<br />
					<input type='submit' />	
				</form>
			</div>
		</div>
	)
}

export default Settings