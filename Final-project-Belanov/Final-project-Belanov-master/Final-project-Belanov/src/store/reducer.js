import { ACTIONS } from './actions';

const initialState = {
	authorised: false,
	token: '',
	officers: [],
};

const reducer = (state = initialState, action) => {
	const { data } = action;
	switch (action.type) {
		case ACTIONS.SET_AUTH_TRUE:
			return { ...state, authorised: true, token: action.token };
		case ACTIONS.SET_AUTH_FALSE:
			return { ...state, authorised: false, token: '' };
		case ACTIONS.GET_OFFICERS:
			return { ...state, officers: action.officers };
		case ACTIONS.EDIT_OFFICER:
			const newOfficersList = state.officers.map(obj => {
				if (obj._id === action.id) return data.data;
				return obj;
			});
			return {
				...state,
				officers: newOfficersList,
			};
		case ACTIONS.DEL_OFFICER:
			return {
				...state,
				officers: state.officers.filter(item => item._id !== action.id),
			};
		case ACTIONS.GET_CASES:
			return { ...state, cases: action.cases };
		case ACTIONS.CREATE_CASE:
			return { ...state, cases: [...state.cases, data] };
		case ACTIONS.DEL_CASE:
			return {
				...state,
				cases: state.cases.filter(item => item._id !== action.id),
			};
		case ACTIONS.EDIT_CASE:
			const newCases = state.cases.map(obj => {
				if (obj._id === action.id) return data.data;
				return obj;
			});
			return {
				...state,
				cases: newCases,
			};
		default:
			return state;
	}
};

export default reducer;
