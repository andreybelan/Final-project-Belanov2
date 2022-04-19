import './DetailsWindow.scss';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { editCase } from '../../store/actions';
import { Link } from 'react-router-dom';
import AuthInput from '../authInput/authInput';
import Button from '../button/button';
import createFetch from '../fetch/fetch';
import swal from 'sweetalert';
const CaseDetailsWindow = () => {
	const { caseID } = useParams();
	const dispatch = useDispatch();
	const caseData = useSelector(state => state.cases);
	const officers = useSelector(state => state.officers);
	let data = caseData
		? caseData.filter(item => item._id === caseID)
		: undefined;
	const officer = caseData
		? officers.filter(officer => officer._id === data[0].officer)
		: '';
	const [toggleButton, setToggleButton] = useState(false);
	const [toggleDisable, setToggleDisable] = useState(true);
	const [changedInputs, setChangedInputs] = useState({});

	const renameKeys = key => {
		switch (key) {
			case '_id':
				return 'ID';
			case 'status':
				return 'Статус';
			case 'licenseNumber':
				return 'Номер Лицензии';
			case 'type':
				return 'Тип';
			case 'ownerFullName':
				return 'ФИО';
			case 'clientId':
				return key;
			case 'createdAt':
				return 'Дата создания';
			case 'updatedAt':
				return 'Обновлено';
			case 'color':
				return 'Цвет';
			case 'date':
				return 'Дата кражи';
			case 'officer':
				return 'Ответственный сотрудник';
			case 'description':
				return 'Описание';
			case 'resolution':
				return 'Решение';
			default:
				return '';
		}
	};
	const renameValues = (key, value) => {
		switch (key) {
			case 'createdAt':
			case 'updatedAt':
				return new Date(value).toISOString().slice(0, 10).replace(/-/g, '-');
			case 'date':
				return value === null
					? ''
					: new Date(value).toISOString().slice(0, 10).replace(/-/g, '-');

			default:
				if (value === null) return '';
				return value;
		}
	};

	const statusList = value => {
		return value === 'new'
			? [value, 'in_progress', 'done']
			: value === 'in_progress'
			? [value, 'new', 'done']
			: value === 'done'
			? [value, 'new', 'in_progress']
			: value === 'general'
			? ['Обычный', 'Спортивный']
			: ['Спортивный', 'Обычный'];
	};
	const officerList = () => {
		let list = [];
		!officer.length
			? officers.map(value => {
					if (value.approved)
						return list.push(value.firstName + ' ' + value.lastName);
					return null;
			  })
			: officers.map(value => {
					if (value) {
						if (value._id !== officer[0]._id && value.approved === true)
							return list.push(value.firstName + ' ' + value.lastName);
					}
					return null;
			  });

		if (officer) {
			return !officer.length
				? ['', ...list]
				: [officer[0].firstName + ' ' + officer[0].lastName, ...list, ''];
		}
	};

	const setDisabled = key => {
		if (toggleButton) {
			if (key === 'resolution') {
				return toggleDisable;
			}
			if (key === 'createdAt' || key === 'updatedAt' || key === 'clientId')
				return true;
			return false;
		}
		return true;
	};
	const onSelectChange = key => {
		return e => {
			setChangedInputs({ ...changedInputs, [key]: e.target.value });
			if (key === 'status') {
				return e.target.value === 'done'
					? setToggleDisable(false)
					: setToggleDisable(true);
			}
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
					case 'status':
						if (
							changedInputs[key] === 'done' &&
							(changedInputs.resolution === undefined ||
								changedInputs.resolution === '')
						)
							return true;
						if (changedInputs[key] === data[0][key]) break;
						return false;

					case 'officer':
						if (changedInputs.officer) {
							if (officer.length) {
								if (
									changedInputs.officer !==
									officer[0].firstName + ' ' + officer[0].lastName
								)
									return false;
							} else {
								if (changedInputs.officer !== '') return false;
							}
						}
						break;
					case 'description':
					case 'date':
					case 'color':
					case 'ownerFullName':
					case 'licenseNumber':
						if (changedInputs[key] !== data[0][key]) {
							if (changedInputs[key] === '' && data[0][key] === null) break;
							return false;
						}
						break;
					case 'type':
						if (changedInputs[key] === 'Обычный') {
							if (data[0][key] === 'general') break;
						} else {
							if (data[0][key] === 'sport') break;
						}
						return false;

					default:
						console.log('key', key);
						return true;
				}
			}
			return true;
		}
	};

	const handleEditCase = async e => {
		e.preventDefault();
		const fetchData = {};
		for (let key in changedInputs) {
			if (
				(changedInputs[key] === '' && data[0][key] === null) ||
				changedInputs[key] === data[0][key]
			)
				break;
			if (key === 'officer') {
				debugger;
				const data = officers.filter(
					item => item.firstName + ' ' + item.lastName === changedInputs[key]
				);
				fetchData[key] = data[0] ? data[0]._id : null;
				break;
			}
			fetchData[key] = changedInputs[key];
		}

		await createFetch(`cases/${caseID}`, 'PUT', true, fetchData)
			.then(res => {
				return res.json();
			})
			.then(async data => {
				dispatch(editCase(caseID, data));
				await swal('Изменения сохранены!');
				window.location.reload();
			})
			.catch(error => {
				console.error(error);
				swal('Что-то пошло не так');
			});
	};
	return (
		<article>
			<form className="window-container" onSubmit={handleEditCase}>
				<h2 className="subtitle">
					Подробная информация о {data ? data[0].ownerFullName : ''}
				</h2>
				{caseData
					? Object.keys(data[0]).map(key =>
							key !== '__v' ? (
								<AuthInput
									onSelectChange={
										key === 'status' || 'type' || 'officer'
											? onSelectChange(key)
											: null
									}
									onInputChange={onInputChange(key)}
									firstOption={true}
									type={
										key === 'createdAt' || key === 'date' || key === 'updatedAt'
											? 'date'
											: 'text'
									}
									selectList={
										key === 'officer'
											? officerList()
											: key === 'status' || key === 'type'
											? statusList(data[0][key])
											: null
									}
									disabled={setDisabled(key)}
									key={key}
									title={renameKeys(key)}
									placeholder="Нет данных"
									value={
										[key] in changedInputs
											? changedInputs[key]
											: renameValues(key, data[0][key])
									}></AuthInput>
							) : null
					  )
					: null}
				<div className="window-buttons-wrapper">
					<Link to="/cases" className="button signup-button">
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

export default CaseDetailsWindow;
