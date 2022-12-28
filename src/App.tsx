import React from 'react';
import './App.css';
import {Presentation} from "./models/types";
import {Miniatures} from "./components/miniatures/Miniatures";
import {HeaderPanel} from "./components/header_panel/HeaderPanel";
import {MainSlide} from "./components/mainslide/MainSlide";
import {connect} from "react-redux";

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
            <Miniatures presentation={props.presentation}/>
            <MainSlide presentation={props.presentation}/>
        </div>
    </div>
  );
}


const mapStateToProps = (state: Presentation) => ({
    presentation: state
})

export default connect(mapStateToProps)(App)