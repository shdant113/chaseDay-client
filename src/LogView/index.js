import React from 'react';
import './index.css';

const LogView = (props) => {
	const renderContent = () => {
		if (props.log.user_id !== props.account.id) {
			return (
				<div>
					<a href='' className="a" onClick={props.showUserProfile.bind(null, props.log.user_id)}>
						Go to {props.log.user.firstName} {props.log.user.lastName}'s profile</a>
					<a href='' className="a" onClick={props.showMessageForm.bind(null, props.log.user_id)}>
						Send {props.log.user.firstName} {props.log.user.lastName} a message</a>
				</div>
			)
		} else {
			return (
				<div>
					<a href='' className="a" onClick={props.editLog.bind(null, props.log)}>Edit Log</a>
				</div>
			)
		}
	}
	if (!props.open) {
		return null
	} else {
		return (
			<div className="log-viewer">
				<div className="log-viewer-top">
					<img className="profile-photo" src={props.log.user.profilePhoto}
					 alt={props.log.user.username} /><br />
					<h5 className="log-viewer-author"><a href='' className="a" onClick={props.showUserProfile.bind(null, props.log.user_id)}>
						Log written by {props.log.user.firstName} {props.log.user.lastName}
					</a></h5>
					<h5 className="log-viewer-title">{props.log.title}<br />
						{props.log.date}</h5>
					<div className="log-viewer-navigation">
						{ renderContent() }
					</div>
				</div>
				<div className="log-viewer-content">
					<p>{props.log.content}</p>
				</div>
			</div>
		)
	}
}	

export default LogView