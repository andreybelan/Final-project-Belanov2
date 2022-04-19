import './button.scss';
const Button = props => {
	return (
		<button
			disabled={props.disabled}
			className={props.className ? props.className : 'button'}
			onClick={props.onClick}
			type={props.type}>
			{props.title}
		</button>
	);
};
export default Button;
