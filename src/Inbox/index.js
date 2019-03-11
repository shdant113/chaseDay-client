import React from 'react';

const Inbox = (props) => {
	const inbox = props.messages.map((message, i) => {
		return <li key={message.id}>
			Sent at {message.createdAt} by {message.author.username}
			<br /><br />
			{message.content}
			<button>Reply to this message</button>
			<br />
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