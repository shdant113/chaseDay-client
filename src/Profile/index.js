import React from 'react';
import './index.css';

const Profile = (props) => {
	const logs = props.userLogs.map((log, i) => {
		const renderContent = () => {
			if (log.user.id !== props.account.id) {
				return (
					<a href='' className="a" onClick={props.showMessageForm.bind(null, log.user.id)}>
						Send {log.user.firstName} {log.user.lastName} a message
					</a>
				)
			} else {
				return (
					<a href='' className="a" onClick={props.editLog.bind(null, log)}>
						Edit Log
					</a>
				)
			}
		}
		return (
			<div className="log-card" key={log.id}>
				<div className="log-top">
					<img className="profile-photo" src={log.user.profilePhoto}
						alt={log.user.username} />
					<div className="log-title">
						<h5 className="author">
							Log written by {log.user.firstName} {log.user.lastName}
						</h5>
						{ renderContent() }
						<h1>{log.title}</h1>
						<h3>{log.date}</h3>
					</div>
				</div>
				<div className="content">
					<p>{log.content}</p>
				</div>
				<div className="log-navigator">
					<a className="a" onClick={props.readLog.bind(null, log.id)}>Expand</a>
				</div>
			</div>
		)
	})
	return (
		<div className="profile-wrap">
			<div className="user-profile-static">
				<div className="profile-top">
					<img className="cover-photo" src={props.account.coverPhoto} 
						alt={props.account.username} />
				</div>
				<div className="profile-intro">
					<div>
						<img className="profile-photo-profile" src={props.account.profilePhoto} 
							alt={props.account.username} />
					</div>
					<div className="profile-user-text">
						<h3>{props.account.firstName} {props.account.lastName}</h3>
						<div className="profile-info">
							<h5 className="profile-bio">
								{props.account.bio}
							</h5>
						</div>
					</div>
				</div>
				<div className="profile-video">
					<iframe width="640" height="390" 
					title="profile-video"
					src={props.account.profileVideo} 
					frameBorder="25" 
					allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
					allowFullScreen />
				</div>
			</div>
			<div className="logs">
				<h3 className="profile-logs-intro">
					{props.account.firstName} {props.account.lastName}'s Logs
				</h3>
				{logs}
			</div>
		</div>
	)
}

export default Profile;