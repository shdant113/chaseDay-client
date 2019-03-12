import React from 'react';

const LogView = (props) => {
	if (!props.open) {
		return null
	} else {
		if (props.log.user_id !== props.account.id) {
			return (
				<div className="log-viewer">
					<a href='' onClick={props.showUserProfile.bind(null, props.log.user_id)}>Log written by {props.log.user.firstName} {props.log.user.lastName}</a> <br />
					<img src={props.log.user.profilePhoto} alt={props.log.user.username} /><br />
					{props.log.createdAt.toString()} <br />
					{props.log.content} <br /><br />
					<button onClick={props.showUserProfile.bind(null, props.log.user_id)}>Go to {props.log.user.firstName} {props.log.user.lastName}'s profile</button>
					<button onClick={props.showMessageForm.bind(null, props.log.user_id)}>Send {props.log.user.firstName} {props.log.user.lastName} a message</button>
					<br /><br />
				</div>
			)
		} else {
			return (
				<div className="log-viewer">
					<a href='' onClick={props.showUserProfile.bind(null, props.log.user_id)}>Log written by {props.log.user.firstName} {props.log.user.lastName}</a> <br />
					<img src={props.log.user.profilePhoto} alt={props.log.user.username} /><br />
					{props.log.createdAt.toString()} <br />
					{props.log.content} <br /><br />
				</div>
			)
		}
	}
	
}	

export default LogView