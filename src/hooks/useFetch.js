import { useEffect, useState } from 'react';

export const useFetch = (url) => {
	const [data, setData] = useState(null);
	const [isPending, setIsPending] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		const controller = new AbortController();

		const fetchData = async () => {
			setIsPending(true);
			try {
				const res = await fetch(url, { signal: controller.signal });
				if (!res.ok) throw new Error(res.statusText);
				const json = await res.json();
				setData(json);
				setIsPending(false);
				setError(null);
			} catch (err) {
				if (err.name === 'AbortError') {
					console.log('fetch was aborted');
				} else {
					setIsPending(false);
					setError(`Data can't be fetched as status is ${err.message}`);
				}
			}
		};
		fetchData();

		return () => {
			controller.abort();
		};
	}, [url]);
	return { data, isPending, error };
};
