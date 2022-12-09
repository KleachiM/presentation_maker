import React from 'react';
import './App.css';
import {Presentation} from "./models/types";
import {Program} from "./components/program/Program";
import {HeaderPanel} from "./components/header_panel/HeaderPanel";

type AppProps = {
  presentation: Presentation
}

function App(props: AppProps) {
  return (
    <div className="App">
        <div className="HeaderPanel">
            <HeaderPanel/>
        </div>
      <Program presentation={props.presentation} />
    </div>
  );
}

export default App;

