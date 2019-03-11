import React from 'react';

const MessageForm = (props) => {
	return (
		<div className="message-form-wrap">
			<h1>New Message</h1>
			<button onClick={props.closeForm}>Go back to my dash!</button>
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