import React from 'react';

class Dashboard extends React.Component {
	constructor() {
		super();
		this.state = {
			logs: []
		}
	}
	componentDidMount = async () => {
		const logs = await fetch(process.env.REACT_APP_CLIENT_APP_URI + '/api/v1/chaseDay/logs/dashboard', {
				method: 'GET',
				credentials: 'include'
			}
		)
		if (!logs.ok) {
			throw Error(logs.statusText)
		}
		const response = await logs.json();
		this.setState({
			logs: response.data
		})
	}
	render() {
		console.log(this.state.logs)
		const logs = this.state.logs.map((log, i) => {
			return <li key={i}>
				{log.author} <br />
				{log.createdAt.toString()} <br />
				{log.content} <br />
			</li>
		})
		return (
			<div className="logs-dash">
				<ul>
					{logs}
				</ul>
			</div>
		)
	}
}

export default Dashboard