import {render, screen} from '@testing-library/react';
import App from './App';
import DataProvider from "./contexts/data.context";

test('app is rendered without crash', () => {
  render(
      <DataProvider>
        <App/>
      </DataProvider>
  );
  const appElm = screen.getByTestId("app");
  expect(appElm).toBeInTheDocument();
});

