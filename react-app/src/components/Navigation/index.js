import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

const Navigation = ({ isLoaded }) => {
	const history = useHistory();
	const sessionUser = useSelector(state => state.session.user);
	const location = useLocation();
	const simpleNav = location.pathname === '/login' || location.pathname === '/signup'

	return (
		<div id='nav-bar-wrapper'>
			<div id='nav-bar-top'>
				<div id='nav-bar-top-left'>
					<img id='logo' src='/logo.png' onClick={() => history.push('/')}/>
					{simpleNav ? null : <div>Search Bar</div>}
				</div>
				{simpleNav? <div id='nav-middle'>Twintendo Account</div> : null}
				{simpleNav ? <div></div> :
					<div id='nav-bar-top-right'>
						<div>Support</div>
						<div>Wish List</div>
						<button onClick={() => history.push('/cart')}>Cart</button>
						<div>
							{isLoaded && <ProfileButton user={sessionUser}/>}
						</div>
						<div>Flag</div>
					</div>
				}
			</div>
			{simpleNav ? null :
				<div id='nav-bar-bottom'>

					<button onClick={() => history.push('/store')}>My Twintendo Store</button>
					<div>Games</div>
					<div>Twintendo Switch</div>
					<div>News & Events</div>
					<div>Play Twintendo</div>

				</div>
			}
		</div>
		// <ul>
		// 	<li>
		// 		<NavLink exact to="/">Home</NavLink>
		// 	</li>
		// 	{isLoaded && (
		// 		<li>
		// 			<ProfileButton user={sessionUser} />
		// 		</li>
		// 	)}
		// </ul>
	);
}

export default Navigation;
