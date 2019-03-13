import React from 'react';
import '../App.css';
import './index.css';

const LogForm = (props) => {
	return (
		<div className="log-form-wrap">
			<h1 className="new-log-h1">Add A New Log</h1>
			<div>
				<form className="log-form" onSubmit={props.postNewLog}>
					<label>Date: <br />
						<input type='date' name='date' 
						value={props.newLog.date}
						onChange={props.handleChange} />
					</label>
					<br />
					<label>Title: <br />
						<input type='text' name='title' 
						value={props.newLog.title}
						onChange={props.handleChange} />
					</label>
					<br />
					<label>Begin Your Log Below: <br />
						<textarea name='content' 
						value={props.newLog.content} 
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

export default LogForm