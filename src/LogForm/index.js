import React from 'react';

const LogForm = (props) => {
	return (
		<div className="log-form-wrap">
			<h1>Your New Log</h1>
			<button onClick={props.closeForm}>Go back to my dash!</button>
			<div>
				<form className="log-form" onSubmit={props.postNewLog}>
					<label>Date: <br />
						<input type='date' name='date' 
						value={props.newLog.date}
						onChange={props.handleChange} />
					</label>
					<br />
					<label>Thumbnail: <br />
						<label className="upload-label"
						style={{
							background: "buttonface",
							border: "1px solid rgb(216, 216, 216)",
							padding: "1px 7px 2px",
							cursor: "pointer",
							font: "400 11px system-ui"
						}}>Upload A File<br />
						<input className="image-file" type='file' name='thumbnail'
						accept=".jpg,.jpeg,.png" style={{display: "none"}}
						value={props.newLog.thumbnail}
						onChange={props.handleChange} /></label>
					</label>
					<br />
					<label>Begin Your Log Below: <br />
						<textarea name='content' 
						value={props.newLog.content} 
						onChange={props.handleChange}
						cols="50" rows="100" wrap="soft"></textarea>
					</label>
					<br />
					<input type='submit' />	
				</form>
			</div>
		</div>
	)
}

export default LogForm