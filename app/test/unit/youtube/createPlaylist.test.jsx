import { createPlaylist } from "../../../src/pages/videos/videos";
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

test("Testing createPlaylist: Creation successful", async () => {
  let ResultPlaylistId = "mockPlaylistId";
  const accessToken = "mockAccessToken";
  const playlistName = "mockPlaylistName";

  // POST response containing the id of the created playlist
  const mockResponse = {
    id: "mockPlaylistId",
  };
  fetch.mockResolvedValue(createFetchResponse(mockResponse));
  let playlistId = await createPlaylist(accessToken, playlistName);

  // Assertions
  expect(playlistId).toBe(ResultPlaylistId);
  expect(fetch).toHaveBeenCalledWith(
    "https://www.googleapis.com/youtube/v3/playlists?part=id,snippet",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        snippet: {
          title: playlistName,
          description: "This is a generated playlist from ReactPedia.",
          tags: ["ReactPedia"],
        },
      }),
    });
    expect(fetch).toHaveBeenCalledTimes(1);
  vi.clearAllMocks();
});

test("Testing createPlaylist: Error occurred while creating playlists", async () => {
  let ResultPlaylistId = "";
  const accessToken = "mockAccessToken";
  const playlistName = "mockPlaylistName";
  alert = vi.fn();

  // Empty POST response
  const mockResponse = {
  };
  fetch.mockResolvedValue(createFetchResponse(mockResponse, 404, "Not found"));
  let playlistId = await createPlaylist(accessToken, playlistName);

  // Assertions
  expect(playlistId).toBe(ResultPlaylistId);
  expect(fetch).toHaveBeenCalledWith(
    "https://www.googleapis.com/youtube/v3/playlists?part=id,snippet",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        snippet: {
          title: playlistName,
          description: "This is a generated playlist from ReactPedia.",
          tags: ["ReactPedia"],
        },
      }),
    });
    expect(fetch).toHaveBeenCalledTimes(1);
  vi.clearAllMocks();
});
