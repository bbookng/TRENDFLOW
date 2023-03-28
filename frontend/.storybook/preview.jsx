import GlobalStyle from '../src/styles/GlobalStyle';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import store from '../src/store/store';
import { initialize, mswDecorator } from 'msw-storybook-addon';
import { worker } from '../src/mocks/browser';

initialize();

export const decorators = [
  mswDecorator,
  (Story) => (
    <MemoryRouter initialEntries={['/']}>
      <Provider store={store}>
        <GlobalStyle />
        <Story />
      </Provider>
    </MemoryRouter>
  ),
];

if (typeof global.process === 'undefined') {
  worker.start({
    onUnhandledRequest: 'bypass',
  });
}

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  layout: 'fullscreen',
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
