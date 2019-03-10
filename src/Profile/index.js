import React from 'react';

const Profile = (props) => {
	return (
		<div className="profile-wrap">
			<h1>Your Profile</h1>
			<button onClick={props.closeProfile}>Go back to dash!</button>
			<div></div>
		</div>
	)
}

export default Profile;