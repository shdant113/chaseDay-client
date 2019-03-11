import React from 'react';

const Inbox = (props) => {
	const inbox = props.messages.map((message, i) => {
		return <li key={message.id}>
			Sent at {message.createdAt} by {message.author.username}
			<br /><br />
			{message.content}
			<br /><br />
			<button onClick={props.showMessageForm.bind(
				null, message.author.id)}>Reply to this message</button>
			<br />
			<button onClick={props.removeMessage.bind(
				null, message.id)}>Delete this message</button>
		</li>
	})
	return (
		<div className="inbox">
			<h1>Your Inbox</h1>
			<button onClick={props.closeInbox}>Go back to dash!</button>
			<ul>
				{inbox}
			</ul>
		</div>
	)
}

export default Inbox;