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
        const unlisten = history.listen(() => {
            window.scrollTo(0, 0);
        });
        return () => {
            unlisten();
        };
    }, [history]);


	useEffect(() => {
		let qty = Object.values(cartItems).reduce((a, b) => a + b.quantity, 0);
		setCartQty(qty)
	}, [cartItems, dispatch])

	const manageLink = () => {
		if (sessionUser) history.push('/current/products')
		else history.push('/login')
	}

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

					<div onClick={() => history.push('/store')}>
						<img src='https://media.discordapp.net/attachments/1128785113287753760/1132048179433582674/image.png'/>
						My Twintendo Store
					</div>
					<div onClick={() => history.push('/store/games')}>
						<img src='https://media.discordapp.net/attachments/1128785113287753760/1132101349547450469/image.png'/>
						Games
					</div>
					<div onClick={() => history.push('/store/hardware')}>
						<img src='https://media.discordapp.net/attachments/1128785113287753760/1132108317494354060/image.png'/>
						Hardware
					</div>
					<div onClick={() => history.push('/store/merchandise')}>
						<img src='https://media.discordapp.net/attachments/1128785113287753760/1132108770428846110/image.png'/>
						Merchandise
					</div>
					<div onClick={manageLink}>
						<i class="fa-solid fa-list-check"></i>
						Manage Products
					</div>
					{/* <div>Twintendo Switch</div>
					<div>News & Events</div>
					<div>Play Twintendo</div> */}

				</div>
			}
		</div>
	);
}

export default Navigation;
