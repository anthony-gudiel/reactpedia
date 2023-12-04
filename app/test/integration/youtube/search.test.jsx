import { Videos } from "../../../src/pages/videos/videos";
import { test, vi, expect } from "vitest";
import { act, render, fireEvent, waitFor } from "@testing-library/react";
import React from "react";
import youtube from "../../../src/api/youtube";

test("Integration test: Testing the search feature; Search then use the next and previous buttons", async () => {
  // Define global.window and global.window.google
  global.window = global.window || {};
  global.window.google = {
    accounts: {
      oauth2: {
        initTokenClient: vi.fn(),
      },
    },
  };

  // Mock the OAuth client using the useEffect from the Videos component
  global.window.google.accounts.oauth2.initTokenClient.mockImplementation();

  const { getByText, getByPlaceholderText, getByTestId } = render(<Videos />);

  // Constants
  const keyword = "react";
  const mockResponse = {
    ok: true,
    data: {
      items: [
        {
          id: { videoId: "1" },
        },
        {
          id: { videoId: "2" },
        },
      ],
    },
  };

  // Mock the Youtube API call
  vi.spyOn(youtube, "get").mockImplementation(() =>
    Promise.resolve(mockResponse)
  );

  // Assuming your YoutubeEmbed component renders an <iframe>
  const videoPlayer = document.querySelector("iframe");
  // Assert default video
  expect(videoPlayer.src).toBe("https://www.youtube.com/embed/SqcY0GlETPk");

  // Input the search keyword
  const searchBar = getByPlaceholderText("Search");
  fireEvent.change(searchBar, { target: { value: keyword } });
  // Assert correct search keyword
  expect(searchBar.value).toBe(keyword);

  // Click the search button
  const searchButton = getByTestId("search-button");
  await act(async () => {
    fireEvent.click(searchButton);
  });
  await waitFor(() => {
    // Assert that the video player is updated to the first result as returned by the mockResponse
    expect(videoPlayer.src).toBe("https://www.youtube.com/embed/1");
  });

  const nextButton = getByText("Next");
  const previousButton = getByText("Previous");

  // A series of button clicks to test the next and previous buttons
  await act(async () => {
    fireEvent.click(nextButton);
  });
  await waitFor(() => {
    // Assert that the video url is updated to 2
    expect(videoPlayer.src).toBe("https://www.youtube.com/embed/2");
  });

  await act(async () => {
    fireEvent.click(previousButton);
  });
  await waitFor(() => {
    // Assert that the url is returned to 1
    expect(videoPlayer.src).toBe("https://www.youtube.com/embed/1");
  });

  await act(async () => {
    fireEvent.click(previousButton);
  });
  await waitFor(() => {
    // Assert that the url overflows to the last video
    expect(videoPlayer.src).toBe("https://www.youtube.com/embed/2");
  });

  await act(async () => {
    fireEvent.click(nextButton);
  });
  await waitFor(() => {
    // Assert that the url overflows to the first video
    expect(videoPlayer.src).toBe("https://www.youtube.com/embed/1");
  });

  // Mock an error response for 403 error
  vi.spyOn(youtube, "get").mockImplementation(() =>
    Promise.resolve({ status: 403 })
  );

  // New keyword
  const newKeyword = "react hooks";
  // Input the new search keyword
  fireEvent.change(searchBar, { target: { value: newKeyword } });
  // Assert correct search keyword
  expect(searchBar.value).toBe(newKeyword);

  const alertSpy = vi.spyOn(window, "alert").mockImplementation();
  // Click the search button
  await act(async () => {
    fireEvent.click(searchButton);
  });

  // Assert that the error message is handled
  expect(alertSpy).toHaveBeenCalledWith(
    "Error fetching videos: 403 Forbidden\n You might have exceeded the YouTube API quota."
  );

  // Mock an error response for 404 error
  vi.spyOn(youtube, "get").mockImplementation(() =>
    Promise.resolve({ status: 404 })
  );

  // Click the search button
  await act(async () => {
    fireEvent.click(searchButton);
  });

  // Assert that the error message is handled
  expect(alertSpy).toHaveBeenCalledWith("Error fetching videos:", 404);

  // Restore all mocks
  vi.restoreAllMocks();
});
