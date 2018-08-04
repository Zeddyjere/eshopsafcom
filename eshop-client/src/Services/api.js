import axios from 'axios'; 

export function apiCall(method, path, data) {
	// We are going to resolve a Promise 
	return new Promise((resolve, reject) => {
		// We are going to make a generic API call 
		return axios[method](path, data)
			// We are going to handle the response
			.then(res => {
				return resolve(res.data);
			}).catch(err => {
				return reject(err.response.data.error); 
			})
	})
}