import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { delOfficer } from '../../../store/actions';
import ErrorPage from './errorPage';
import createFetch from '../../fetch/fetch';
import swal from 'sweetalert';

const OfficersPage = () => {
	const dispatch = useDispatch();
	const officers = useSelector(state => state.officers);
	const handleDeleteOfficer = async id => {
		await createFetch(`officers/${id}`, 'DELETE', true)
			.then(res => res.json())
			.then(data => {
				swal('Сотрудник удален из базы данных!');
				dispatch(delOfficer(id));
			})
			.catch(error => {
				swal('Что-то пошло не так');
				console.error(error);
			});
	};

	return localStorage.getItem('token') ? (
		<article className="officers-page">
			<table border="1px" className="table officers-table">
				<thead>
					<tr>
						<th>Email</th>
						<th>ФИО</th>
						<th>Статус</th>
					</tr>
				</thead>
				<tbody>
					{officers.length ? (
						<>
							{officers.map(item => {
								return (
									<tr key={item._id}>
										<td>
											<Link to={`/officers/${item._id}`}>{item.email}</Link>
										</td>
										<td>
											<Link to={`/officers/${item._id}`}>
												{item.firstName + ' ' + item.lastName}
											</Link>
										</td>
										<td>
											<Link to={`/officers/${item._id}`}>
												{item.approved ? 'Одобрен' : 'Не подтвержден'}
											</Link>
										</td>
										<td
											className="delete-icon"
											onClick={() => handleDeleteOfficer(item._id)}></td>
									</tr>
								);
							})}
							{officers.length < 3 ? (
								<>
									<tr>
										<td></td>
										<td></td>
										<td></td>
										<td></td>
									</tr>
									<tr>
										<td></td>
										<td></td>
										<td></td>
										<td></td>
									</tr>
									<tr>
										<td></td>
										<td></td>
										<td></td>
										<td></td>
									</tr>
								</>
							) : null}
						</>
					) : (
						<tr>
							<td>Загрузка...</td>
							<td>Загрузка...</td>
							<td>Загрузка...</td>
							<td>Загрузка...</td>
						</tr>
					)}
				</tbody>
			</table>
		</article>
	) : (
		ErrorPage()
	);
};

export default OfficersPage;
