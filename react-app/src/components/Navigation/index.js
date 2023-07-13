import React from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);
	const location = useLocation();
	const simpleNav = location.pathname === '/login' || location.pathname === '/signup'

	return (
		<div id='nav-bar-wrapper'>
			<div id='nav-bar-top'>
				<div id='nav-bar-top-left'>
					<img id='logo' src='/logo.png'/>
					{simpleNav ? null : <div>Search Bar</div>}
				</div>
				{simpleNav? <div id='nav-middle'>Nintendo Account</div> : null}
				{simpleNav ? <div></div> :
					<div id='nav-bar-top-right'>
						<div>Support</div>
						<div>Wish List</div>
						<div>Cart</div>
						<div>
							{isLoaded && <ProfileButton user={sessionUser}/>}
						</div>
						<div>Flag</div>
					</div>
				}
			</div>
			{simpleNav ? null :
				<div id='nav-bar-bottom'>

					<div>My Nintendo Store</div>
					<div>Games</div>
					<div>Nintendo Switch</div>
					<div>News & Events</div>
					<div>Play Nintendo</div>

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
