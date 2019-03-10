import React from 'react';

const Header = (props) => {
	return (
		<div>
			<header className='header'>
				<div className='header-wrap'>
					<div className='nav'>
						<span className="nav-bar">
							<button onClick={props.getDash}>Home</button>
							<button onClick={props.logout}>Log Out</button>
							<button onClick={props.showUserProfile.bind(null, props.account.id)}>Your Profile</button>
						</span>
					</div>
				</div>
			</header>
		</div>
	)
}

export default Header