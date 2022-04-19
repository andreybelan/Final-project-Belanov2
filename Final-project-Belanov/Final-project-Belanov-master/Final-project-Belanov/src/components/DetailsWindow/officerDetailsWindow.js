import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { editOfficer } from '../../store/actions';
import { Link } from 'react-router-dom';
import AuthInput from '../authInput/authInput';
import Button from '../button/button';
import createFetch from '../fetch/fetch';
import './DetailsWindow.scss';
import swal from 'sweetalert';

const OfficerDetailsWindow = () => {
	const { officerID } = useParams();
	const dispatch = useDispatch();
	const officers = useSelector(state => state.officers);
	const officer = officers.length
		? officers.filter(item => item._id === officerID)
		: null;
	const [toggleButton, setToggleButton] = useState(false);
	const [changedInputs, setChangedInputs] = useState({});

	const renameKeys = key => {
		switch (key) {
			case '_id':
				return 'ID';
			case 'approved':
				return 'Статус';
			case 'firstName':
				return 'Имя';
			case 'lastName':
				return 'Фамилия';
			case 'email':
				return 'Email';
			case 'clientId':
				return key;
			default:
				return '';
		}
	};
	const renameValues = value => {
		if (value === null) return '';
		return value;
	};

	const statusList = value => {
		return value === true
			? ['Одобрен', 'Не подтвержден']
			: ['Не подтвержден', 'Одобрен'];
	};

	const setDisabled = key => {
		if (toggleButton) {
			if (key === 'clientId' || key === 'email' || key === '_id') return true;
			return false;
		}
		return true;
	};
	const onSelectChange = key => {
		return e => {
			setChangedInputs({ ...changedInputs, [key]: e.target.value });
			return e.target.value === ''
				? setChangedInputs({ ...changedInputs, [key]: 'null' })
				: null;
		};
	};
	const onInputChange = key => {
		return e => {
			setChangedInputs({ ...changedInputs, [key]: e.target.value });
		};
	};
	const buttonDisable = () => {
		if (toggleButton) {
			for (let key in changedInputs) {
				switch (key) {
					case 'firstName':
					case 'lastName':
						if (changedInputs[key] !== officer[0][key]) {
							if (changedInputs[key] === '' && officer[0][key] === null) break;
							return false;
						}
						break;
					case 'approved':
						if (changedInputs[key] === officer[0][key]) break;
						return false;

					default:
						return true;
				}
			}
			return true;
		}
	};

	const handleEditOfficer = async e => {
		e.preventDefault();
		const fetchData = {};
		for (let key in changedInputs) {
			if (
				(changedInputs[key] === '' && officer[0][key] === null) ||
				changedInputs[key] === officer[0][key]
			)
				break;
			if (key === 'approved') {
				fetchData[key] = changedInputs[key] === 'Одобрен' ? true : false;
				break;
			}
			fetchData[key] = changedInputs[key];
		}

		await createFetch(`officers/${officerID}`, 'PUT', true, fetchData)
			.then(res => {
				return res.json();
			})
			.then(async data => {
				dispatch(editOfficer(officerID, data));
				await swal('Изменения сохранены!');
				window.location.reload();
			})
			.catch(error => {
				swal('Что-то пошло не так');
				console.error(error);
			});
	};

	return (
		<article>
			<form className="window-container" onSubmit={handleEditOfficer}>
				<h2 className="subtitle">
					{officer ? officer[0].firstName + ' ' + officer[0].lastName : ''} -
					Подробная информация
				</h2>
				{officer
					? Object.keys(officer[0]).map(key =>
							key !== '__v' && key !== 'password' ? (
								<AuthInput
									onSelectChange={
										key === 'approved' ? onSelectChange(key) : null
									}
									onInputChange={onInputChange(key)}
									firstOption={true}
									type="text"
									selectList={
										key === 'approved' ? statusList(officer[0][key]) : null
									}
									disabled={setDisabled(key)}
									key={key}
									title={renameKeys(key)}
									placeholder="Нет данных"
									value={
										[key] in changedInputs
											? changedInputs[key]
											: renameValues(officer[0][key])
									}></AuthInput>
							) : null
					  )
					: null}
				<div className="window-buttons-wrapper">
					<Link to="/officers" className="button signup-button">
						Назад
					</Link>
					<Button
						type={toggleButton ? 'submit' : null}
						disabled={buttonDisable()}
						title={!toggleButton ? 'Редактировать' : 'Сохранить'}
						className="button signup-button"
						onClick={() => setToggleButton(!toggleButton)}
					/>
					{toggleButton ? (
						<Button
							title="Отменить"
							className="button signup-button"
							onClick={() => setToggleButton(!toggleButton)}
						/>
					) : null}
				</div>
			</form>
		</article>
	);
};

export default OfficerDetailsWindow;
