import './HeaderPanel.css';
import React from 'react';
import PresentationName from './PresentationName/PresentationName';

export function HeaderPanel() {
	return <div className="header-panel">
		<PresentationName />
        This is header panel!
		<br/> Сюда надо вставить иконки
	</div>;
}

