import React from 'react';
import './index.css'

const Header = (props) => {
	if (props.unread) {
		return (
			<div>
				<header className='header'>
					<div className='header-wrap'>
						<div className='nav'>
							<span className="nav-bar">
								<button onClick={props.getDash}>Home</button>
								<button onClick={props.logout}>Log Out</button>
								<button onClick={props.showUserProfile.bind(null, props.account.id)}>Your Profile</button>
								<button className="unread" onClick={props.showInbox.bind(null, props.account.id)}>Your Inbox</button>
							</span>
						</div>
					</div>
				</header>
			</div>
		)
	} else {
		return (
			<div>
				<header className='header'>
					<div className='header-wrap'>
						<div className='nav'>
							<span className="nav-bar">
								<button onClick={props.getDash}>Home</button>
								<button onClick={props.logout}>Log Out</button>
								<button onClick={props.showUserProfile.bind(null, props.account.id)}>Your Profile</button>
								<button onClick={props.showInbox.bind(null, props.account.id)}>Your Inbox</button>
							</span>
						</div>
					</div>
				</header>
			</div>
		)
	}
	
}

export default Header