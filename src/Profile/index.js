import React from 'react';

const Profile = (props) => {
	const logs = props.userLogs.map((log, i) => {
		if (log.user.id !== props.account.id) {
			return <div key={log.id}>
				<img src={log.user.profilePhoto} alt={log.user.username} /><br />
				Log written by {log.user.firstName} {log.user.lastName} <br />
				{log.title} <br />
				{log.createdAt.toString()} <br />
				{log.content} <br /><br />
				<button onClick={props.readLog.bind(null, log.id)}>Expand</button>
				<button onClick={props.showMessageForm.bind(null, log.user_id)}>
				Send {log.user.firstName} {log.user.lastName} a messaage</button>
				<br /><br />
			</div>
		} else {
			return <div key={log.id}>
				<img src={log.user.profilePhoto} alt={log.user.username} /><br />
				Log written by {log.user.firstName} {log.user.lastName} <br />
				{log.title} <br />
				{log.createdAt.toString()} <br />
				{log.content} <br /><br />
				<button onClick={props.readLog.bind(null, log.id)}>Expand</button>
				<br /> <br />
			</div>
		}
	})
	return (
		<div className="profile-wrap">
			<h1>{props.account.firstName} {props.account.lastName}'s Profile</h1>
			<button onClick={props.closeProfile}>Go back to dash!</button>
			<div className="user-profile">
				<div className="profile-photo">
					<img src={props.account.profilePhoto} alt={props.account.username} />
				</div>
				<br />
				<div className="cover-photo">
					<img src={props.account.coverPhoto} alt={props.account.username} />
				</div>
				<br /><br />
				<h3>{props.account.firstName} {props.account.lastName}</h3>
				<h5>{props.account.username}</h5>
				<ul>
					<li>{props.account.facebook}</li>
					<li>{props.account.twitter}</li>
					<li>{props.account.youtube}</li>
				</ul>
				<p>{props.account.firstName} {props.account.lastName} has 
				been a member since {props.account.createdAt}.</p>
				<br />
				<div className="profile-video">
					<iframe width="640" height="390" 
					title="profile-video"
					src={props.account.profileVideo} 
					frameBorder="25" 
					allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
					allowFullScreen />
				</div>
				<br />
				<p>A little about {props.account.firstName} {props.account.lastName}:
				<br /> 
				{props.account.bio}</p>
			</div>
			<div className="user-logs">
				<ul>
					{logs}
				</ul>
			</div>
			<div></div>
		</div>
	)
}

export default Profile;