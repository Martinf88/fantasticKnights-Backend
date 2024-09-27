async function getData() {
	const url = "http://localhost:9876"

	try {
		const response = await fetch(`${url}/users`)
		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`)
		}
		const data = await response.json()
		console.log(data);
		const result = data.result
	} catch (error) {
		console.error(error.message);
		
	}
}

export default getData

getData()
