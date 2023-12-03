import { handleAddToPlaylistToggle } from "../../../src/pages/videos/videos";
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

// First test case
test("Testing handleAddToPlaylistToggle: User is not logged in", async () => {
    var playlistId = "mockPlaylistId";
  const tokenClient = {
    requestAccessToken: () => {},
  };
  vi.spyOn(tokenClient, "requestAccessToken");
  const accessToken = "";
  const videoItem = {
    id: {
      videoId: "mockVideoId",
    },
  };

  // Fetch response when the video is already added to the playlist
  const mockResponse = {
    items: [
      {
        id: "mockSubscriptionId",
      },
    ],
  };

  fetch.mockResolvedValue(createFetchResponse(mockResponse));

  const setAddedToPlaylist = vi.fn();

  await handleAddToPlaylistToggle(
    tokenClient,
    accessToken,
    videoItem,
    setAddedToPlaylist,
    playlistId
  );

  // Assertions
  expect(tokenClient.requestAccessToken).toHaveBeenCalled();
  expect(fetch).not.toHaveBeenCalled();
  vi.clearAllMocks();
});

// Second test case
test("Testing handleAddToPlaylistToggle: Video is in playlist", async () => {
  var playlistId = "mockPlaylistId";
  const tokenClient = {
    requestAccessToken: () => {},
  };
  vi.spyOn(tokenClient, "requestAccessToken");
  const accessToken = "mockAccessToken";
  const videoItem = {
    id: {
      videoId: "mockVideoId",
    },
  };

  // Fetch response when the video is already added to the playlist
  const mockResponse = {
    items: [
      {
        id: "mockSubscriptionId",
      },
    ],
  };

  fetch.mockResolvedValue(createFetchResponse(mockResponse));

  const setAddedToPlaylist = vi.fn();
  const playlistItemId = mockResponse.items[0].id;

  await handleAddToPlaylistToggle(
    tokenClient,
    accessToken,
    videoItem,
    setAddedToPlaylist,
    playlistId
  );

  // Assertions
  expect(tokenClient.requestAccessToken).not.toHaveBeenCalled();
  // Get the playlist status
  expect(fetch).toHaveBeenCalledWith(
    `https://www.googleapis.com/youtube/v3/playlistItems?part=id&playlistId=${playlistId}&videoId=${videoItem.id.videoId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );
  // Delete from playlist
  expect(fetch).toHaveBeenCalledWith(
    `https://www.googleapis.com/youtube/v3/playlistItems?id=${playlistItemId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );
  expect(fetch).toHaveBeenCalledTimes(2);
  expect(setAddedToPlaylist).toHaveBeenCalledWith(false);
  vi.clearAllMocks();
});

// Third test case
test("Testing handleAddToPlaylistToggle: Video is not in playlist", async () => {
    var playlistId = "mockPlaylistId";
    const tokenClient = {
      requestAccessToken: () => {},
    };
    vi.spyOn(tokenClient, "requestAccessToken");
    const accessToken = "mockAccessToken";
    const videoItem = {
      id: {
        videoId: "mockVideoId",
      },
    };
  
    // Fetch response when the video is not in playlist
    const mockResponse = {
    };
  
    fetch.mockResolvedValue(createFetchResponse(mockResponse));
  
    const setAddedToPlaylist = vi.fn();
  
    await handleAddToPlaylistToggle(
      tokenClient,
      accessToken,
      videoItem,
      setAddedToPlaylist,
      playlistId
    );
  
    // Assertions
    expect(tokenClient.requestAccessToken).not.toHaveBeenCalled();
    // Get the playlist status
    expect(fetch).toHaveBeenCalledWith(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=id&playlistId=${playlistId}&videoId=${videoItem.id.videoId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    // Add to playlist
    expect(fetch).toHaveBeenCalledWith(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            snippet: {
              playlistId: playlistId,
              resourceId: {
                kind: "youtube#video",
                videoId: videoItem.id.videoId,
              },
            },
          }),
        }
    );
    expect(fetch).toHaveBeenCalledTimes(2);
    expect(setAddedToPlaylist).toHaveBeenCalledWith(true);
    vi.clearAllMocks();
  });

  // Fourth test case
test("Testing handleAddToPlaylistToggle: YouTube API response error", async () => {
    var playlistId = "mockPlaylistId";
    const tokenClient = {
      requestAccessToken: () => {},
    };
    vi.spyOn(tokenClient, "requestAccessToken");
    const accessToken = "mockAccessToken";
    const videoItem = {
      id: {
        videoId: "mockVideoId",
      },
    };
  
    // Fetch response when the video is not in playlist
    const mockResponse = {
    };
  
    // Mock 404 error
    fetch.mockResolvedValue(createFetchResponse(mockResponse, 404, "Not found"));
    const errorSpy = vi.spyOn(console, "error");
  
    const setAddedToPlaylist = vi.fn();
  
    await handleAddToPlaylistToggle(
      tokenClient,
      accessToken,
      videoItem,
      setAddedToPlaylist,
      playlistId
    );
  
    // Assertions
    expect(tokenClient.requestAccessToken).not.toHaveBeenCalled();
    // Get the playlist status
    expect(fetch).toHaveBeenCalledWith(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=id&playlistId=${playlistId}&videoId=${videoItem.id.videoId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(errorSpy).toHaveBeenCalledWith(
        "Error fetching playlist status:",
        "Not found"
      );
    expect(setAddedToPlaylist).not.toHaveBeenCalled();
    vi.clearAllMocks();
  });
