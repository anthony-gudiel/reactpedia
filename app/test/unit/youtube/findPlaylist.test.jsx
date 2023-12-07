import { findPlaylist } from "../../../src/pages/videos/videos";
import { test, vi, expect } from "vitest";

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

test("Testing findPlaylist: Playlist already exists", async () => {
  let ResultPlaylistId = "mockPlaylistId";
  const accessToken = "mockAccessToken";
  const playlistName = "mockPlaylistName";

  // Fetch response for the playlists, where the target is at index3
  const mockResponse = {
    items: [
      {
        id: "1",
        snippet: {
          localized: {
            title: "title1",
          },
        },
      },
      {
        id: "2",
        snippet: {
          localized: {
            title: "title2",
          },
        },
      },
      {
        id: "3",
        snippet: {
          localized: {
            title: "title3",
          },
        },
      },
      {
        id: "mockPlaylistId",
        snippet: {
          localized: {
            title: "mockPlaylistName",
          },
        },
      },
      {
        id: "5",
        snippet: {
          localized: {
            title: "title5",
          },
        },
      },
    ],
  };
  fetch.mockResolvedValue(createFetchResponse(mockResponse));
  let playlistId = await findPlaylist(accessToken, playlistName);

  // Assertions
  expect(playlistId).toBe(ResultPlaylistId);
  expect(fetch).toHaveBeenCalledWith(
    "https://www.googleapis.com/youtube/v3/playlists?part=snippet&mine=true&maxResults=50",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    expect(fetch).toHaveBeenCalledTimes(1);
  vi.clearAllMocks();
});

test("Testing findPlaylist: Playlist does not exist", async () => {
  let ResultPlaylistId = "";
  const accessToken = "mockAccessToken";
  const playlistName = "mockPlaylistName";

  // Fetch response for the playlists, where the target is not in the response
  const mockResponse = {
    items: [
      {
        id: "1",
        snippet: {
          localized: {
            title: "title1",
          },
        },
      },
      {
        id: "2",
        snippet: {
          localized: {
            title: "title2",
          },
        },
      },
    ],
  };
  fetch.mockResolvedValue(createFetchResponse(mockResponse));
  let playlistId = await findPlaylist(accessToken, playlistName);

  // Assertions
  expect(playlistId).toBe(ResultPlaylistId);
  expect(fetch).toHaveBeenCalledWith(
    "https://www.googleapis.com/youtube/v3/playlists?part=snippet&mine=true&maxResults=50",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    expect(fetch).toHaveBeenCalledTimes(1);
  vi.clearAllMocks();
});

test("Testing findPlaylist: Error occurred while fetching playlists", async () => {
  let ResultPlaylistId = "";
  const accessToken = "mockAccessToken";
  const playlistName = "mockPlaylistName";
  alert = vi.fn();

  // Fetch response for the playlists, where the target is not in the response
  const mockResponse = {
    items: [
      {
        id: "mockPlaylistId",
        snippet: {
          localized: {
            title: "mockPlaylistName",
          },
        },
      },
      {
        id: "2",
        snippet: {
          localized: {
            title: "title2",
          },
        },
      },
    ],
  };
  fetch.mockResolvedValue(createFetchResponse(mockResponse, 404, "Not found"));
  let playlistId = await findPlaylist(accessToken, playlistName);

  // Assertions
  expect(playlistId).toBe(ResultPlaylistId);
  expect(fetch).toHaveBeenCalledWith(
    "https://www.googleapis.com/youtube/v3/playlists?part=snippet&mine=true&maxResults=50",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    expect(fetch).toHaveBeenCalledTimes(1);
  vi.clearAllMocks();
});
