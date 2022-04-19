import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCases, delCase } from '../../../store/actions';
import ErrorPage from './errorPage';
import createFetch from '../../fetch/fetch';
import swal from 'sweetalert';

const Cases = () => {
	const dispatch = useDispatch();
	const cases = useSelector(state => state.cases);
	const handleDeleteCase = async id => {
		await createFetch(`cases/${id}`, 'DELETE', true)
			.then(res => res.json())
			.then(() => {
				swal('Случай о краже удален из базы данных!');
				dispatch(delCase(id));
			})
			.catch(error => {
				swal('Что-то пошло не так');
				console.error(error);
			});
	};

	useEffect(() => {
		const fetchData = async () => {
			await createFetch('cases', 'GET', true)
				.then(res => res.json())
				.then(data => {
					dispatch(getCases(data.data));
				})
				.catch(error => {
					swal('Что-то пошло не так');
					console.error(error);
				});
		};
		if (localStorage.getItem('token')) fetchData();
	}, [dispatch]);
	return localStorage.getItem('token') ? (
		<article className="cases-page">
			<table border="1px" className="table">
				<thead>
					<tr>
						<th className="table-title__licence">№ Лицензии</th>
						<th className="table-title__fullname">ФИО</th>
						<th className="table-title__type">Тип</th>
						<th className="table-title__color">Цвет</th>
						<th className="table-title__date">Дата кражи</th>
						<th className="table-title__status">Статус</th>
					</tr>
				</thead>
				<tbody>
					{cases ? (
						cases.map(item => {
							return (
								<tr key={item._id}>
									<td className="table-item__licence">
										<Link to={`/cases/${item._id}`}>{item.licenseNumber}</Link>
									</td>
									<td className="table-item__fullname">
										<Link to={`/cases/${item._id}`}>{item.ownerFullName}</Link>
									</td>
									<td className="table-item__type">
										<Link to={`/cases/${item._id}`}>
											{item.type === 'general' ? 'Обычный' : 'Спорт'}
										</Link>
									</td>

									<td className="table-item__color">
										<Link to={`/cases/${item._id}`}>{item.color}</Link>
									</td>
									<td className="table-item__date">
										<Link to={`/cases/${item._id}`}>
											{item.date
												? new Date(item.date).toLocaleDateString()
												: null}
										</Link>
									</td>

									<td className="table-item__status">
										<Link to={`/cases/${item._id}`}>{item.status}</Link>
									</td>
									<td
										className="delete-icon"
										onClick={() => handleDeleteCase(item._id)}></td>
								</tr>
							);
						})
					) : (
						<tr>
							<td>Загрузка...</td>
							<td>Загрузка...</td>
							<td>Загрузка...</td>
							<td className="table-item__load">Загрузка...</td>
							<td className="table-item__load">Загрузка...</td>
							<td className="table-item__load">Загрузка...</td>
							<td className="table-item__load">Загрузка...</td>
						</tr>
					)}
				</tbody>
			</table>
		</article>
	) : (
		ErrorPage()
	);
};

export default Cases;
