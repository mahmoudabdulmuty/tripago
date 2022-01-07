import { useCallback, useEffect, useState } from 'react';
import './TripList.css';

export default function TripList() {
	const [trips, setTrips] = useState([]);
	const [url, setUrl] = useState('http://localhost:3000/trips');

	const fetchedFunc = useCallback(async () => {
		const response = await fetch(url);
		const data = await response.json();
		setTrips(data);
	}, [url]);

	useEffect(() => {
		fetchedFunc();
	}, [fetchedFunc]);

	return (
		<div className="trip-list">
			<h2>Trip List</h2>
			<ul>
				{trips.map((trip) => (
					<li key={trip.id}>
						<h3>{trip.title}</h3>
						<p>{trip.price}</p>
					</li>
				))}
			</ul>
			<div className="filters">
				<button
					onClick={() => setUrl('http://localhost:3000/trips?loc=europe')}
				>
					European Countries
				</button>
				<button onClick={() => setUrl('http://localhost:3000/trips')}>
					All Countries
				</button>
			</div>
		</div>
	);
}
