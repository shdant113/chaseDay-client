import React from 'react';
import './index.css';

const Inbox = (props) => {
	const inbox = props.messages.map((message, i) => {
		return <div className="message-card" key={message.id}>
			<div className="message-top">
				<img className="profile-photo" src={message.author.profilePhoto}
					alt={message.author.username} />
				<div className="message">
					<h5 className="author"><a className="a" href=''
					 onClick={props.showUserProfile.bind(null, message.author.id)}>
					 {message.author.firstName} {message.author.lastName}</a></h5>
				</div>
			</div>
			<div className="content">
				<p>{message.content}</p>
			</div>
			<a className="a" href='' onClick={props.showMessageForm.bind(
				null, message.author.id)}>Reply to this message</a>
			<a className="a" href='' onClick={props.removeMessage.bind(
				null, message.id)}>Delete this message</a>
		</div>
	})
	return (
		<div className="inbox">
			<h1>Your Inbox</h1>
			<div className="inbox-wrap">
				{inbox}
			</div>
		</div>
	)
}

export default Inbox;