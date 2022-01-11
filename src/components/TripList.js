import { useState } from 'react';
import { useFetch } from '../hooks/useFetch';
import './TripList.css';

export default function TripList() {
	const [url, setUrl] = useState('http://localhost:3000/trips');
	const { data: trips, isPending,error } = useFetch(url);
	return (
		<div className="trip-list">
			<h2>Trip List</h2>
			{error && <div>{error}</div>}
			{isPending && <div>Loading trips...</div>}
			
			<ul>
				{trips &&
					trips.map((trip) => (
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
