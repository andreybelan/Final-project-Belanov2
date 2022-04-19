import React, { useState, useEffect, useRef } from 'react';
import './dropDown.scss';
import { useSelector } from 'react-redux';
import Button from '../button/button';
import AuthInput from '../authInput/authInput';
import { Link } from 'react-router-dom';
import createFetch from '../fetch/fetch';
import swal from 'sweetalert';

const DropDown = props => {
	const [handleToggle, setHandleToggle] = useState(false);
	const containerRef = useRef(null);
	const auth = useSelector(state => state.authorised);
	const handleButtonClick = () => {
		setHandleToggle(!handleToggle);
	};
	const dropDownItemClick = e => {
		const { innerText } = e.target;
		setHandleToggle(false);
		props.setBtn(innerText);
	};

	const handleClickOutside = event => {
		if (containerRef.current && !containerRef.current.contains(event.target)) {
			setHandleToggle(false);
			return;
		}
	};
	const handleClick = e => {
		e.target.className = 'button dropdown-button';
		setTimeout(() => {
			e.target.className = 'button';
		}, 1000);
	};
	const handleSignIn = async e => {
		const data = {
			email: e.target[0].value,
			password: e.target[1].value,
		};
		e.preventDefault();

		await createFetch('auth/sign_in', 'POST', false, data)
			.then(res => {
				return res.json();
			})
			.then(data => {
				if (data.data) {
					localStorage.setItem('token', `${data.data.token}`);
					window.location.reload();
				} else swal('Неверный логин/пароль');
			})
			.catch(error => {
				console.error(error);
				swal('Что-то пошло не так');
			});
	};
	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [handleToggle]);

	return (
		<div className="dropdown-wrapper" ref={containerRef}>
			<Button
				onClick={handleButtonClick}
				title={props.title}
				className={auth ? 'button profile-button' : undefined}></Button>
			{auth
				? handleToggle && (
						<>
							<div className="dropdown__item-corner"></div>
							<div className="dropdown__item dropdown__item-auth">
								<ul>
									{props.data.map(str => {
										return str.name === 'Выйти' ? (
											<li
												className="dropdown__item-text"
												key={str.id}
												onClick={dropDownItemClick}>
												{str.name}
											</li>
										) : (
											<Link
												to={str.link ? str.link : '/'}
												key={str.id}
												onClick={() => setHandleToggle(false)}>
												<li className="dropdown__item-text">{str.name}</li>
											</Link>
										);
									})}
								</ul>
								{props.children}
							</div>
						</>
				  )
				: handleToggle && (
						<>
							<div className="dropdown__item-corner"></div>
							<form className="dropdown__item" onSubmit={handleSignIn}>
								<AuthInput title="Логин" for="h1" />
								<AuthInput title="Пароль" for="h2" type="password" />
								<div className="auth-wrap">
									<Button
										title="Подтвердить"
										className="button signup-button"
										type="submit"
									/>
									<Button
										type="button"
										title="Забыл пароль?"
										className="button signup-button"
										onClick={handleClick}
									/>
								</div>
							</form>
						</>
				  )}
		</div>
	);
};
DropDown.defaultProps = { className: '' };
export default DropDown;
