import './main.scss';
import Button from '../button/button';
import AuthPage from './components/authPage';
import ErrorPage from './components/errorPage';
import CreateCase from './components/createCase';
import Cases from './components/cases';
import CaseDetailsWindow from '../DetailsWindow/caseDetailsWindow';
import { Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import OfficersPage from './components/officers';
import OfficerDetailsWindow from '../DetailsWindow/officerDetailsWindow';

// const user = {
// 	email: 'dronbelan@yandex.ru',
// 	password: '123456',
// 	clientId: '54faba3d-6f20-463b-8b7b-678d1ee84cc2',
// 	firstName: 'Андрей',
// 	lastName: 'Беланов',
// };
const Main = () => {
	const mainPage = (
		<article className="hero-content">
			<h1 className="hero-title">
				
				<span>RENT BIKE</span>
			</h1>
			<p className="hero-text">
			Компания RENT BIKE предлагает выгодную аренду велосипедов. Лучшее предложение для бизнеса.
            Выгодная аренда электровелосипедов для курьеров.
            Услуга совместного пользования техникой пришла к нам из европейский стран и США.
            Удобство аренды электровелосипеда в том, что не нужно платить полную стоимость техники, 
			искать подходящее место для хранения и регулярно следить за его <br/> техническим состоянием.
			Все вопросы обслуживания, хранения и доставки берёт на себя компания RENT BIKE. <br />
			Аренда электровелосипедов – выгодное решение и экономия денежных средств. 
			
			<br /><br />В последнее время участились случаи кражи, для поддержания качества сервиса был введен
			учёт известных случаев пропажи имущества компании. <br />
			Если Вы обладаете какой-либо информацией, связанной с пропажей, просим
			сообщить нам.
				
			</p>
			<Link to="create-case">
				<Button className="button hero-button" title="Сообщить о краже" />
			</Link>
		</article>
	);

	return (
		<main className="container main-container">
			<Routes>
				<Route path="/" exact element={mainPage} />
				<Route path="/auth" element={AuthPage()} />
				<Route path="/create-case" element={CreateCase()} />
				<Route path="/cases" element={Cases()}></Route>
				<Route path="/cases/:caseID" element={<CaseDetailsWindow />} />
				<Route path="/officers" element={OfficersPage()} />
				<Route path="/officers/:officerID" element={<OfficerDetailsWindow />} />

				<Route path="*" element={ErrorPage()} />
			</Routes>
		</main>
	);
};
export default Main;
