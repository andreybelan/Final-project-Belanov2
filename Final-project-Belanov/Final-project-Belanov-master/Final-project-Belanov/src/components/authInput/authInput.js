import './authInput.scss';
import React from 'react';
const AuthInput = props => {
	return (
		<div className="auth-wrap">
			<label htmlFor={props.for}>{props.title}</label>
			{props.selectList ? (
				<select
					required={props.required}
					disabled={props.disabled}
					onChange={props.onSelectChange}>
					{!props.firstOption ? <option> </option> : null}
					{props.selectList.map(value => {
						return value._id ? (
							value.approved ? (
								<option key={value._id} id={value._id}>
									{`${value.firstName} ${value.lastName}`}
								</option>
							) : null
						) : (
							<option key={value}>{value}</option>
						);
					})}
				</select>
			) : (
				<input
					onChange={props.onInputChange}
					disabled={props.disabled}
					value={props.value}
					name={props.for}
					type={props.type}
					list={props.list}
					min={props.min}
					max={props.max}
					placeholder={
						props.type === 'email'
							? 'example@mail.ru'
							: props.title === 'Логин'
							? 'Логин'
							: props.type === 'password'
							? '*******'
							: props.placeholder
					}
					minLength={props.type === 'password' ? '6' : undefined}
					required={props.required}></input>
			)}
		</div>
	);
};
export default AuthInput;
