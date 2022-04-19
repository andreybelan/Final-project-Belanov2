import './footer.scss';
import Button from '../button/button';
import { Link } from 'react-router-dom';

const Footer = () => {
	return (
		<footer className="footer-wrapper">
			<div className="footer-blocks">
				<div className="footer-block">
					<h2>О нас</h2>
					<p>
						С 1996 года мы не только 
						предоставляем услуги аренды, а так же занимаемся
						продажей велотранспорта по всей России.
						
					</p>
				</div>
				<div className="footer-block">
					<h2>Контактная информация</h2>
					<span className="coords__item">г.Москва, ул.Заречная 80</span>
					<a
						className="contacts__item"
						href="mailto:info@renftalbike.ru">
						Email: info@renftalbike.ru
					</a>
					<a className="contacts__item" href="tel:+74955554455">
						tel: +7 (495)-555-44-55
					</a>
				</div>
			</div>
			<div className="footer-ending">
				<span className="footer-copyright">
					Copyright &#169; <b>Renta Bike</b>. All rights reserved.
				</span>
				<nav className="footer-nav">
					<div className="footer-buttons-wrapper">
						<Link to="/">
							<Button title="Главная" className="button footer-button" />
						</Link>
						<Link to="/create-case">
							<Button
								title="Сообщить о краже"
								className="button footer-button"
							/>
						</Link>
						<Link to="/auth">
							<Button title="Регистрация" className="button footer-button" />
						</Link>
					</div>
				</nav>
			</div>
		</footer>
	);
};
export default Footer;
