import './header.scss';
import userImage from '../../photo/user-avatar.svg';
import { useSelector, useDispatch } from 'react-redux';
import { setAuthTrue, setAuthFalse } from '../../store/actions';
import Button from '../button/button';
import DropDown from '../dropDown/dropDown';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import createFetch from '../fetch/fetch';
import swal from 'sweetalert';

const Header = () => {
	const auth = useSelector(state => state.authorised);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const data = [
		{ id: 'link1', name: 'Сообщить о краже', link: 'create-case' },
		{ id: 'link2', name: 'Известные случаи', link: 'cases' },
		{ id: 'link3', name: 'Сотрудники', link: 'officers' },
		{ id: 'header1', name: 'Выйти' },
	];

	const checkAuth = () => {
		localStorage.getItem('token') &&
			createFetch('auth', 'GET', true)
				.then(res => res.json())
				.then(data => {
					return data.data.token
						? dispatch(setAuthTrue(data.data.token))
						: () => {
								dispatch(setAuthFalse);
								if (localStorage.getItem('token'))
									localStorage.removeItem('token');
						  };
				})
				.catch(e => swal('Что-то пошло нетак', 'error'));
	};

	const handleLogOut = value => {
		if (value === 'Выйти') {
			dispatch(setAuthFalse());
			localStorage.removeItem('token');
			navigate('/');
			window.location.reload();
		}
	};
	useEffect(checkAuth, [dispatch]);

	return (
		<header className="header">
			<div className="contact-info">
				<div className="coords">
					<span className="coords__item">Москва, ул. Заречная 80</span>
				</div>
				<div className="contacts">
					<a
						className="contacts__item"
						href="mailto:info@renftalbike.ru">
						info@renftalbike.ru
					</a>
					<a className="contacts__item" href="tel:+74955554455">
						+7 (495)-555-44-55
					</a>
				</div>
			</div>
			<div className="container header-container">
				<nav className="header-nav">
					<Link to="/">
						<div className="logo-wrapper"></div>
					</Link>
					<div className="buttons-wrapper">
						<Link to="/" className="header-links">
							<Button title="Главная" />
						</Link>
						<Link to="create-case" className="header-links">
							<Button title="Сообщить о краже" />
						</Link>
						{!auth ? (
							<Link to="/auth" className="header-links">
								<Button title="Регистрация" />
							</Link>
						) : (
							<>
								<Link to="/cases" className="header-links">
									<Button title="Известные случаи" />
								</Link>
								<Link to="/officers" className="header-links">
									<Button title="Ответственные сотрудники" />
								</Link>
							</>
						)}
						<DropDown
							setBtn={handleLogOut}
							title={
								auth ? (
									<img
										className="header-img"
										src={userImage}
										alt="header-img"></img>
								) : (
									'Войти'
								)
							}
							data={auth ? data : null}
						/>
					</div>
				</nav>
			</div>
		</header>
	);
};
export default Header;
