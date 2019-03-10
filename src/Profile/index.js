import React from 'react';

const Profile = (props) => {
	const logs = props.userLogs.map((log, i) => {
		// console.log(log)
		return <li key={log.id}>
			{log.author} <br />
			{log.createdAt.toString()} <br />
			<img src={log.thumbnail} alt={log.author}/> <br />
			{log.content} <br /><br />
			<button onClick={props.rateUp.bind(null, log.id)}>Rate Up</button>
			<button onClick={props.rateDown.bind(null, log.id)}>Rate Down</button>
			<br /><br />
		</li>
	})
	return (
		<div className="profile-wrap">
			<h1>Your Profile</h1>
			<button onClick={props.closeProfile}>Go back to dash!</button>
			<div className="user-profile">
				<h3>{props.account.firstName} {props.account.lastName}</h3>
				<h5>{props.account.username}</h5>
				<ul>
					<li>{props.account.facebook}</li>
					<li>{props.account.twitter}</li>
					<li>{props.account.youtube}</li>
				</ul>
				<p>{props.account.firstName} {props.account.lastName} has 
				been a member since {props.account.createdAt}.</p>
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