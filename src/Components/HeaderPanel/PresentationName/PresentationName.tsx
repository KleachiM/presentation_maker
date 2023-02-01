import React from 'react';
import {Presentation} from '../../../models/types';
import {connect} from 'react-redux';
import './PresentationName.css';
import {AppState, store} from "../../../store";
import {presentationActions} from "../../../store/presentation";

type PresentationNameProps = {
	title: string
}
function PresentationName(props: PresentationNameProps) {
	return <>
		<input type="text" className="title" defaultValue={props.title}
			onKeyPress = {
				(e) => {
					if (e.key === 'Enter') {
						e.currentTarget.value = (e.currentTarget.value == '') ? 'Презентация без названия' : e.currentTarget.value;
						store.dispatch(presentationActions.setTitle(e.currentTarget.value));
						e.currentTarget.blur();}
				}
			}
			onBlur={
				(e) => {
					e.currentTarget.value = (e.currentTarget.value == '') ? 'Презентация без названия' : e.currentTarget.value;
					store.dispatch(presentationActions.setTitle(e.currentTarget.value));
				}
			}
		/>
	</>;
}

const mapStateToProps = (state: AppState) => ({
	title: state.presentation.title,
});

export default connect(mapStateToProps)(PresentationName);