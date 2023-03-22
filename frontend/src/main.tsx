import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from '@/App';
import store from '@/store/store';
import { worker } from '@/mocks/browser';

if (process.env.NODE_ENV === 'development') {
  worker.start({
    onUnhandledRequest: 'bypass',
  });
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <App />
  </Provider>
);
