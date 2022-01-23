import {render, screen} from "@testing-library/react";
import DataProvider from "../contexts/data.context";
import FilterForm from "./FilterForm";

test('filter form is rendered', () => {
  render(
      <DataProvider>
        <FilterForm onChange={jest.fn()}/>
      </DataProvider>
  );
  const ffElm = screen.getByTestId("filter-form");
  expect(ffElm).toBeInTheDocument();

  const trendInput = screen.getByTestId("trend-input");
  expect(trendInput).toBeInTheDocument()
  expect(trendInput).toHaveValue("");
});