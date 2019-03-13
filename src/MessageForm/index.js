import React from 'react';
import './index.css';

const MessageForm = (props) => {
	return (
		<div className="message-form-wrap">
			<h1 className="new-message-h1">New Message</h1>
			<div>
				<form className="message-form" onSubmit={props.sendMessage}>
					<label>Content: <br />
						<textarea name='content' 
						value={props.newMessage.content} 
						placeholder='What do you want to say?' 
						onChange={props.handleChange}
						cols="50" rows="25" wrap="soft"></textarea>
					</label> <br />
					<input type='submit' />	
				</form>
			</div>
		</div>
	)
}

export default MessageForm;