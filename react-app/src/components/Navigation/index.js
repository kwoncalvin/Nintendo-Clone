import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

import { getCurrentCartItems } from "../../store/cart_items";

const Navigation = ({ isLoaded }) => {
	const history = useHistory();
	const dispatch = useDispatch();
	const sessionUser = useSelector(state => state.session.user);
	const cartItems = useSelector((state) => state.cartItems.currentItems)
	const location = useLocation();
	const simpleNav = location.pathname === '/login' || location.pathname === '/signup';
	const clearNav = location.pathname === '/';

	const [cartQty, setCartQty] = useState(0);

	useEffect(() => {
		dispatch(getCurrentCartItems());
    }, [dispatch])


	useEffect(() => {
		let qty = Object.values(cartItems).reduce((a, b) => a + b.quantity, 0);
		setCartQty(qty)
	}, [cartItems, dispatch])


	return (
		<div id={clearNav ? 'nav-bar-wrapper-clear' : 'nav-bar-wrapper'}>
			<div id='nav-bar-top'>
				<div id='nav-bar-top-left'>
					<img id='logo' src='/logo.png' onClick={() => history.push('/')}/>
					{/* {simpleNav ? null : <div>Search Bar</div>} */}
				</div>
				{simpleNav? <div id='nav-middle'>Twintendo Account</div> : null}
				{simpleNav ? <div></div> :
					<div id='nav-bar-top-right'>
						{/* <div>Support</div>
						<div>Wish List</div> */}
						<div id='cart-button' onClick={() => history.push('/cart')}>
							<div id='cart-icon'>
								{sessionUser ?
									<div id='cart-qty'>{cartQty}</div> :
									null
								}
								<i class="fa-solid fa-cart-shopping"></i>
							</div>
							<div>Cart</div>
						</div>
						<div>
							{isLoaded && <ProfileButton user={sessionUser}/>}
						</div>
						<img src='https://cdn.discordapp.com/attachments/1128785113287753760/1131736348471079063/FlagUsaIconRegionSelect.png'/>
					</div>
				}
			</div>
			{simpleNav ? null :
				<div id='nav-bar-bottom'>

					<div onClick={() => history.push('/store')}>My Twintendo Store</div>
					<div onClick={() => history.push('/store/games')}>Games</div>
					<div onClick={() => history.push('/store/hardware')}>Hardware</div>
					<div onClick={() => history.push('/store/merchandise')}>Merchandise</div>
					<div onClick={() => history.push('/current/products')}>Manage Products</div>
					{/* <div>Twintendo Switch</div>
					<div>News & Events</div>
					<div>Play Twintendo</div> */}

				</div>
			}
		</div>
	);
}

export default Navigation;
