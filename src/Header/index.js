import React from 'react';
import './index.css'

const Header = (props) => {
	const renderContent = () => {
		if (props.unread) {
			return (
				<div>
					<h7 className="unread" 
					onClick={props.showInbox.bind(null, props.account.id)}>
					You have unread messages.</h7>
				</div>
			)
		}
	}
	const renderLogo = () => {
		if (props.header === 'header-wrap') {
			return (
				<span className='head'>
					<div className='head-title1'>Chase</div>
					<div className='head-title2'>Day</div>
				</span>
			)
		}
	}
	return (
		<div className={props.header}>
			<header className='header'>
				<div className='nav-wrap'>
					<div className='nav'>
						<button className="nav-button" onClick={props.getDash}>Home</button>
						<button className="nav-button" onClick={props.logout}>Log Out</button>
						<button className="nav-button" onClick={props.showInbox.bind(null, props.account.id)}>Your Inbox</button>
					</div>
					<div>
						<div className='welcome'>
							<h5 className='welcome-text'>Welcome, <a href='' onClick={props.showUserProfile.bind(null, props.account.id)}>
							 {props.account.firstName} {props.account.lastName}</a>.</h5>
						</div>
						{ renderContent() }
					</div>
				</div>
				{ renderLogo() }
			</header>
		</div>
	)
} 

export default Header