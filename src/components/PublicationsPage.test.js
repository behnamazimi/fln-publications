import {act, fireEvent, render, screen, waitFor} from "@testing-library/react";
import DataProvider from "../contexts/data.context";
import axios from "axios";
import App from "../App";
import {mockAuthResponse, mockEditionsResponse} from "../consts/mock-data";
import PublicationsPage from "./PublicationsPage";

jest.mock("axios")

describe('Publications page renders and behavior', function () {
  test("page title is rendered", () => {
    render(
        <DataProvider>
          <PublicationsPage/>
        </DataProvider>
    )

    expect(screen.getByText("Publications")).toBeInTheDocument()
  })

  test('filter form is rendered', async () => {

    axios.get.mockImplementation(() => Promise.resolve({data: mockEditionsResponse}))
    axios.post.mockImplementation(() => Promise.resolve({data: mockAuthResponse}))

    await act(async () => {
      render(
          <DataProvider>
            <App/>
          </DataProvider>
      );
    })

    // check if load more button exists
    await waitFor(async () => {
      let button = screen.getByText("Load More")
      expect(button).toBeInTheDocument()
    })

    // check if all dummy items rendered
    await waitFor(async () => {
      let publicationTitles = screen.queryAllByRole("heading", {level: 3})
      expect(publicationTitles).toHaveLength(4)
    })
  });

  test('when search result is empty', async () => {
    axios.get.mockImplementation(() => Promise.resolve({
      data: {
        ...mockEditionsResponse,
        _embedded: {edition: []}
      }
    }))

    axios.post.mockImplementation(() => Promise.resolve({data: mockAuthResponse}))

    await act(async () => {
      render(
          <DataProvider>
            <App/>
          </DataProvider>
      );
    })

    await waitFor(() => {
      let searchInput = screen.getByPlaceholderText("Search by name")
      // call next page
      // eslint-disable-next-line testing-library/no-wait-for-side-effects
      fireEvent.change(searchInput, {target: {value: "blabla"}})
      expect(screen.getByText("Items not found.")).toBeInTheDocument()
    })
  });

  test('load more works', async () => {
    axios.get.mockImplementation(() => Promise.resolve({data: mockEditionsResponse}))
    axios.post.mockImplementation(() => Promise.resolve({data: mockAuthResponse}))

    await act(async () => {
      render(
          <DataProvider>
            <App/>
          </DataProvider>
      );
    })

    await waitFor(() => {
      let loadMoreBtn = screen.getByText("Load More")
      // call next page
      // eslint-disable-next-line testing-library/no-wait-for-side-effects
      fireEvent.click(loadMoreBtn)
      expect(axios.get.mock.calls).toHaveLength(2)
    })
  });
});