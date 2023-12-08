import {
  Videos,
  handleAddToPlaylistToggle,
} from "../../../src/pages/videos/videos";
import { test, vi, expect } from "vitest";
import { act, render, fireEvent } from "@testing-library/react";
import React from "react";

global.fetch = vi.fn();

const createFetchResponse = (
  data,
  status = 200,
  statusText = "Successful"
) => ({
  ok: status >= 200 && status < 300,
  status,
  statusText,
  json: () => new Promise((resolve) => resolve(data)),
});

test("Playlist Integration test: Testing the OAuth Client, then search and create new playlist, lastly add to playlist and remove from playlist", async () => {
  let mockOAuthToken = "";
  let inPlaylist = { value: false };
  let playlistId = "";
  const mockRequestAccessToken = vi.fn(() => {
    mockOAuthToken = "mockToken";
  });

  const mockTokenClient = {
    requestAccessToken: mockRequestAccessToken,
  };

  // Define global.window and global.window.google
  global.window = global.window || {};
  global.window.google = {
    accounts: {
      oauth2: {
        initTokenClient: vi.fn().mockResolvedValue(mockTokenClient),
      },
    },
  };

  // Constants
  const mockVideoItem = {
    id: {
      videoId: "mockVideoId",
    },
    snippet: {
      channelId: "mockChannelId",
    },
  };

  // Mock fetch playlist response, returns a list of playlists but none of the playlists
  // match the target playlist name
  const mockPlaylistIds = Array.from({ length: 25 }, (_, index) => ({
    id: `mockPlaylistId${index + 1}`,
    snippet: {
        localized: {
        title: `mockPlaylistTitle${index + 1}`,
        },
    },
  }));
  
  const mockFetchPlaylistResponse = {
    items: mockPlaylistIds,
  };

  // Mock response when a new playlist is created
    const mockCreatePlaylistResponse = {
        id: "mockPlaylistId",
    };

  // Mock in playlist response
  const mockInPlaylistResponse = {
    items: [
      {
        id: "mockPlaylistId",
      },
    ],
  };

  // Mock not in playlist response
  const mockNotInPlaylistResponse = {
    items: [],
  };

  // Mock added to playlist response
    const mockAddedToPlaylistResponse = {
        items: [
            {
                id: "mockPlaylistId",
            },
        ],
    };

    // Mock removed from playlist response
    const mockRemovedFromPlaylistResponse = {
        items: [],
    };

  const { getByTestId } = render(
    <Videos tokenClient={mockTokenClient} accessToken={mockOAuthToken} />
  );

  // Assert initial state
  const addToPlaylistButton = getByTestId("add-to-playlist-button");
  expect(addToPlaylistButton.textContent).toBe("Add to Playlist");
  expect(mockOAuthToken).toBe("");
  expect(playlistId).toBe("");

  // Mock the user clicking the add to playlist button without logging in
  await act(async () => {
    fireEvent.click(addToPlaylistButton);
  });
  expect(mockTokenClient.requestAccessToken).toHaveBeenCalled();
  expect(mockOAuthToken).toBe("mockToken");
  // Clear mocks
  mockTokenClient.requestAccessToken.mockClear();
  fetch.mockClear();
  expect(mockTokenClient.requestAccessToken).not.toHaveBeenCalled();

  // Spy on setInPlaylist
  const setAddedToPlaylist = vi.fn((value) => (inPlaylist.value = value));
  // Spy on setPlaylistId
    const setPlaylistId = vi.fn((value) => (playlistId = value));
  // Assert that the video is not in the playlist
  expect(inPlaylist.value).toBe(false); 
  // Set first fetch response to fetch the user's list of playlists
  fetch.mockResolvedValueOnce(createFetchResponse(mockFetchPlaylistResponse));
  // Set second fetch response to create a new playlist
    fetch.mockResolvedValueOnce(createFetchResponse(mockCreatePlaylistResponse));
    // Set third fetch response to not in playlist response
    fetch.mockResolvedValueOnce(createFetchResponse(mockNotInPlaylistResponse));
// Set fourth fetch response to added to playlist response
    fetch.mockResolvedValueOnce(createFetchResponse(mockAddedToPlaylistResponse));
 
  // Call handleAddToPlaylistToggle, this function should call findPlaylist because playlistId is empty
  await handleAddToPlaylistToggle(
    mockTokenClient,
    mockOAuthToken,
    mockVideoItem, 
    setAddedToPlaylist,
    playlistId,
    setPlaylistId
  );
  expect(mockTokenClient.requestAccessToken).not.toHaveBeenCalled();
  expect(fetch).toHaveBeenCalledTimes(4);
  // Assert that the video is in the playlist and playlistId is set
  expect(inPlaylist.value).toBe(true); 
  expect(playlistId).toBe("mockPlaylistId");

  // Clear mocks
  mockTokenClient.requestAccessToken.mockClear();
  fetch.mockClear();

  // Assert that the video is in the playlist
  expect(inPlaylist.value).toBe(true);
  // Set fetch response to mockInPlaylistResponse
  fetch.mockResolvedValue(createFetchResponse(mockInPlaylistResponse));
  // Call handleAddToPlaylistToggle again
  await handleAddToPlaylistToggle(
    mockTokenClient,
    mockOAuthToken,
    mockVideoItem,
    setAddedToPlaylist,
    playlistId
  );

  // Assert that the video is not in the playlist
  expect(inPlaylist.value).toBe(false);
  expect(fetch).toHaveBeenCalledTimes(2);
  expect(playlistId).toBe("mockPlaylistId");

  // Clear mocks
  mockTokenClient.requestAccessToken.mockClear();
});
