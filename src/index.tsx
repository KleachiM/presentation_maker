import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {store} from './store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
	<Provider store={store}>
		<React.StrictMode>
			<App />
		</React.StrictMode>
	</Provider>

);

reportWebVitals();
function configureStore(mainReducer: (state: import('./models/types').Presentation | undefined, action: any) => import('./models/types').Presentation) {
	throw new Error('Function not implemented.');
}

