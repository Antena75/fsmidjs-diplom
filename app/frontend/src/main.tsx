import 'bootstrap/dist/css/bootstrap.min.css';
import 'izitoast/dist/css/iziToast.min.css';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App.tsx';
import './assets/css/index.css';
import store from './store/store.ts';

ReactDOM.createRoot(document.getElementById('root')!)
.render(
  <Provider store={store}>
    <App />
  </Provider>,
)
