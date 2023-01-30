import React from 'react';
import {Presentation} from '../../../Models/types';
import {connect} from 'react-redux';
import { changePresentationTitle } from '../../../Actions/Actions';
import './PresentationName.css';
import {store} from '../../../index';

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
						store.dispatch(changePresentationTitle(e.currentTarget.value));
						e.currentTarget.blur();}
				}
			}
			onBlur={
				(e) => {
					e.currentTarget.value = (e.currentTarget.value == '') ? 'Презентация без названия' : e.currentTarget.value;
					store.dispatch(changePresentationTitle(e.currentTarget.value));
				}
			}
		/>
	</>;
}

const mapStateToProps = (state: Presentation) => ({
	title: state.title,
});

export default connect(mapStateToProps)(PresentationName);