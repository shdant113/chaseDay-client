import React from 'react';

const EditLog = (props) => {
	return (
		<div className="log-form-wrap">
			<h1>Editing Your Log</h1>
			<button onClick={props.closeForm}>Go back to my dash!</button>
			<button onClick={props.removeLog.bind(null, props.editLog.id)}>Erase Log</button>
			<div>
				<form className="log-form" onSubmit={props.updateLog}>
					<label>Date: <br />
						<input type='date' name='date' 
						value={props.editLog.date}
						onChange={props.handleChange} />
					</label>
					<br />
					<label>Title: <br />
						<input type='text' name='title' 
						value={props.editLog.title}
						onChange={props.handleChange} />
					</label>
					<br />
					<label>Begin Your Log Below: <br />
						<textarea name='content' 
						value={props.editLog.content}
						placeholder={props.editLog.content}
						onChange={props.handleChange}
						rows="20" cols="50" wrap="soft"></textarea>
					</label>
					<br />
					<input type='submit' />	
				</form>
			</div>
		</div>
	)
}

export default EditLog;