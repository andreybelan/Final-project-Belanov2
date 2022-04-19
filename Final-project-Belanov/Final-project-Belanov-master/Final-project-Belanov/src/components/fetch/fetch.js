const createFetch = (route, method, auth, bodyData) => {
	return fetch(`https://sf-final-project.herokuapp.com/api/${route}`, {
		method: method,
		body: bodyData && JSON.stringify(bodyData),
		headers: auth
			? {
					'Content-type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem('token')}`,
			  }
			: {
					'Content-type': 'application/json',
			  },
	});
};
export default createFetch;
