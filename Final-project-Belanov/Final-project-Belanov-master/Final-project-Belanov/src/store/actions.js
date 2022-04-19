export const ACTIONS = {
	SET_AUTH_TRUE: 'SET_AUTH_TRUE',
	SET_AUTH_FALSE: 'SET_AUTH_FALSE',
	GET_OFFICERS: 'GET_OFFICERS',
	EDIT_OFFICER: 'EDIT_OFFICER',
	DEL_OFFICER: 'DEL_OFFICER',
	GET_CASES: 'GET_CASES',
	CREATE_CASE: 'CREATE_CASE',
	DEL_CASE: 'DEL_CASE',
	EDIT_CASE: 'EDIT_CASE',
};

export const setAuthTrue = token => {
	return {
		type: ACTIONS.SET_AUTH_TRUE,
		token,
	};
};
export const setAuthFalse = () => {
	return {
		type: ACTIONS.SET_AUTH_FALSE,
	};
};
export const getOfficers = officers => {
	return {
		type: ACTIONS.GET_OFFICERS,
		officers,
	};
};
export const delOfficer = id => {
	return {
		type: ACTIONS.DEL_OFFICER,
		id,
	};
};
export const editOfficer = (id, data) => {
	return {
		type: ACTIONS.EDIT_OFFICER,
		id,
		data,
	};
};

export const getCases = cases => {
	return {
		type: ACTIONS.GET_CASES,
		cases,
	};
};
export const createCase = data => {
	return {
		type: ACTIONS.CREATE_CASE,
		data,
	};
};

export const delCase = id => {
	return {
		type: ACTIONS.DEL_CASE,
		id,
	};
};

export const editCase = (id, data) => {
	return {
		type: ACTIONS.EDIT_CASE,
		id,
		data,
	};
};
