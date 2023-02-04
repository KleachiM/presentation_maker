import React from 'react';
import './App.css';
import Miniatures from './Components/Miniatures/Miniatures';
import {HeaderPanel} from './Components/HeaderPanel/HeaderPanel';
import MainSlide from './Components/MainSlide/MainSlide';
import {useMouseDownDocumentHandler} from './customHooks/DocumentMouseEvents';
import {useDocumentKeyHandler} from "./customHooks/DocumentKeyEvents";

export default function App() {
	useDocumentKeyHandler();
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
