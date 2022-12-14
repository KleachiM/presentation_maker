import React from 'react';
import './App.css';
import Miniatures from './Components/Miniatures/Miniatures';
import {HeaderPanel} from './Components/HeaderPanel/HeaderPanel';
import MainSlide from './Components/MainSlide/MainSlide';

export default function App() {
	return (
		<div className="App">
			<div className="App-header">
				<HeaderPanel />
			</div>
			<div className="App-body">
				<Miniatures />
				<MainSlide />
			</div>
		</div>
	);
}
