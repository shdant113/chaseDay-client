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
		return (
			<div>
				<p>{this.state.logs}</p>
			</div>
		)
	}
}

export default Dashboard