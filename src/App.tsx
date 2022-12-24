import React from 'react';
import './App.css';
import {Presentation} from "./models/types";
import {Miniatures} from "./components/miniatures/Miniatures";
import {HeaderPanel} from "./components/header_panel/HeaderPanel";
import {MainSlide} from "./components/mainslide/MainSlide";

type AppProps = {
  presentation: Presentation
}

function App(props: AppProps) {
  return (
    <div className="App">
        <div className="App-header">
            <HeaderPanel/>
        </div>
        <div className="App-body">
            <Miniatures presentation={props.presentation} />
            <MainSlide presentation={props.presentation}/>
        </div>
    </div>
  );
}

export default App;

