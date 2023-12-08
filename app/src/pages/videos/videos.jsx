// Videos.js

import React, { useState, useEffect } from "react";
import youtube from "../../api/youtube";
import YoutubeEmbed from "../../components/YouTubeEmbedVideo";
import "./videos.css";

const defaultVideoId = "SqcY0GlETPk";
const defaultChannelId = "UCWv7vMbMWH4-V0ZXdmDpPBA";
var playlistName = "ReactPedia";

export const onSearch = async (keyword, setState) => {
  const response = await youtube.get("/search", {
    params: {
      q: keyword,
      type: "video",
      maxResults: 25,
    },
  });

  if (!response.ok) {
    if (response.status === 403) {
      alert(
        "Error fetching videos: 403 Forbidden\n You might have exceeded the YouTube API quota."
      );
      console.error(
        "Error fetching videos: 403 Forbidden \n You might have exceeded the YouTube API quota."
      );
      return;
    } else {
      alert("Error fetching videos:", response.status);
      console.error("Error fetching videos:", response.status);
      return;
    }
  }

  setState(() => ({
    videos: response.data.items,
    currentVideoIndex: 0,
    currentVideoId:
      response.data.items.length > 0
        ? response.data.items[0].id.videoId
        : defaultVideoId,
  }));

  return response;
};

export const handleSubscriptionToggle = async (
  tokenClient,
  accessToken,
  videoItem,
  setSubscribed
) => {
  if (accessToken === "") {
    // Handle the case where the access token is missing
    tokenClient.requestAccessToken();
    return;
  }

  const subscriptionsResponse = await fetch(
    `https://www.googleapis.com/youtube/v3/subscriptions?part=id&mine=true&forChannelId=${videoItem.snippet.channelId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!subscriptionsResponse.ok) {
    alert("Error fetching subscription status:", subscriptionsResponse.status);
    console.error(
      "Error fetching subscription status:",
      subscriptionsResponse.status
    );
    return;
  }
  const subscriptionsData = await subscriptionsResponse.json();

  if (subscriptionsData.items && subscriptionsData.items.length > 0) {
    // User is subscribed, unsubscribe
    const subscriptionId = subscriptionsData.items[0].id;

    const unsubscribeResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/subscriptions?id=${subscriptionId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (unsubscribeResponse.ok) {
      setSubscribed(false);
    } else {
      alert("Error unsubscribing:", unsubscribeResponse.status);
      console.error("Error unsubscribing:", unsubscribeResponse.status);
    }
  } else {
    // User is not subscribed, subscribe
    const subscribeResponse = await fetch(
      "https://www.googleapis.com/youtube/v3/subscriptions?part=snippet",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          snippet: {
            resourceId: {
              kind: "youtube#channel",
              channelId: videoItem.snippet.channelId,
            },
          },
        }),
      }
    );

    if (subscribeResponse.ok) {
      setSubscribed(true);
      console.log("Subscribed to channel")
    } else {
      alert("Error subscribing:", subscribeResponse.status);
      console.error("Error subscribing:", subscribeResponse.status);
    }
  }
};

export const createPlaylist = async (accessToken, playlistName) => {
  var playlistIdList;
  const response = await fetch(
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
    }
  );
  if (!response.ok) {
    alert("Error fetching playlists:", response.status);
    console.error("Error fetching playlists:", response.status);
    return "";
  } else {
    playlistIdList = await response.json();
  }
  return playlistIdList.id;
};

export const findPlaylist = async (accessToken, playlistName) => {
  let playlistId = "";
  let playlistIdList;
  // Get all playlists
  const response = await fetch(
    "https://www.googleapis.com/youtube/v3/playlists?part=snippet&mine=true&maxResults=50",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );
  if (!response.ok) {
    alert("Error fetching playlists:", response.status);
    console.error("Error fetching playlists:", response.status);
    return "";
  } else {
    playlistIdList = await response.json();
  }

  for (var i = 0; i < playlistIdList.items.length; i++) {
    if (playlistIdList.items[i].snippet.localized.title === playlistName) {
      playlistId = playlistIdList.items[i].id;
      break;
    }
  }
  // Returns playlistId if playlist exists, else returns empty string
  return playlistId;
};

export const handleAddToPlaylistToggle = async (
  tokenClient,
  accessToken,
  videoItem,
  setAddedToPlaylist,
  playlistId,
  setPlaylistId
) => {

  if (accessToken === "") {
    tokenClient.requestAccessToken();
    return;
  }

  // Check if playlistId exists, update if exist
  if (playlistId === "") {
     setPlaylistId(await findPlaylist(accessToken, playlistName));
  }
  console.log("playlistId: ", playlistId);
  // If playlist does not exist, create it
  if (playlistId === "") {
    setPlaylistId(await createPlaylist(accessToken, playlistName));
  }

  // Check if the video is already in the playlist
  const playlistItemsResponse = await fetch(
    `https://www.googleapis.com/youtube/v3/playlistItems?part=id&playlistId=${playlistId}&videoId=${videoItem.id.videoId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!playlistItemsResponse.ok) {
    alert("Error fetching playlist status:", playlistItemsResponse.status);
    console.error(
      "Error fetching playlist status:",
      playlistItemsResponse.status
    );
    setPlaylistId("");
    return;
  }

  const playlistItemsData = await playlistItemsResponse.json();

  if (playlistItemsData.items && playlistItemsData.items.length > 0) {
    // Video is already in the playlist, remove it
    const playlistItemId = playlistItemsData.items[0].id;

    const removeFromPlaylistResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?id=${playlistItemId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (removeFromPlaylistResponse.ok) {
      setAddedToPlaylist(false);
    } else {
      alert("Error removing from playlist:", removeFromPlaylistResponse.status);
      console.error(
        "Error removing from playlist:",
        removeFromPlaylistResponse.status
      );
      setPlaylistId("");
    }
  } else {
    // Video is not in the playlist, add it
    const addToPlaylistResponse = await fetch(
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

    if (addToPlaylistResponse.ok) {
      setAddedToPlaylist(true);
    } else {
      alert("Error adding to playlist:", addToPlaylistResponse.status);
      console.error("Error adding to playlist:", addToPlaylistResponse.status);
      setPlaylistId("");
    }
  }
};

export const handleNext = (state, setState) => {
  setState((prevState) => ({
    ...prevState,
    currentVideoIndex: (prevState.currentVideoIndex + 1) % state.videos.length,
  }));
};

export const handlePrevious = (state, setState) => {
  setState((prevState) => ({
    ...prevState,
    currentVideoIndex:
      (prevState.currentVideoIndex - 1 + state.videos.length) %
      state.videos.length,
  }));
};

export const Videos = ({tokenClient : initializeTokenClient, accessToken : initialAccessToken}) => {
  const [state, setState] = useState({
    videos: [],
    currentVideoId: defaultVideoId,
    currentVideoIndex: 0,
  });
  const [tokenClient, setTokenClient] = useState(initializeTokenClient || {});
  const [accessToken, setAccessToken] = useState(initialAccessToken || "");
  const [subscribed, setSubscribed] = useState(false);
  const [addedToPlaylist, setAddedToPlaylist] = useState(false);
  const [searchTitle, setSearchTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [playlistId, setPlaylistId] = useState("");

  const onSearchChanged = (event) => {
    const _title = event.target.value;
    setSearchTitle(_title);
    setLoading(false);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      await onSearch(searchTitle, setState);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const initializeTokenClient = async () => {
      const client = await window.google.accounts.oauth2.initTokenClient({
        client_id: process.env.REACT_APP_OAUTH_CLIENT_ID,
        scope: "https://www.googleapis.com/auth/youtube",
        callback: (token) => {
          setAccessToken(token.access_token);
        },
      });
      setTokenClient(client);
    };
    initializeTokenClient();
  }, []);

  useEffect(() => {
    const fetchSubscriptionStatus = async () => {
      if (!accessToken) {
        return;
      }

      const channelId =
        state.videos.length > 0
          ? state.videos[state.currentVideoIndex].snippet.channelId
          : defaultChannelId;

      try {
        const subscriptionsResponse = await fetch(
          `https://www.googleapis.com/youtube/v3/subscriptions?part=id&mine=true&forChannelId=${channelId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        const subscriptionsData = await subscriptionsResponse.json();
        setSubscribed(
          subscriptionsData.items && subscriptionsData.items.length > 0
        );
      } catch (error) {
        alert("Error fetching subscription status:", error);
        console.error("Error fetching subscription status:", error);
      }
    };

    fetchSubscriptionStatus();
  }, [state.videos, state.currentVideoIndex, accessToken]);

  useEffect(() => {
    const fetchPlaylistStatus = async () => {
      if (!accessToken) {
        return;
      }

      // Check if playlist exists
      if (playlistId === "") {
        setPlaylistId(await findPlaylist(accessToken, playlistName));
      }

      // If playlist does not exist, return
      if (playlistId === "") {
        return;
      }

      try {
        const videoId =
          state.videos.length > 0
            ? state.videos[state.currentVideoIndex].id.videoId
            : defaultVideoId;

        const playlistItemsResponse = await fetch(
          `https://www.googleapis.com/youtube/v3/playlistItems?part=id&playlistId=${playlistId}&videoId=${videoId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        const playlistItemsData = await playlistItemsResponse.json();

        setAddedToPlaylist(
          playlistItemsData.items && playlistItemsData.items.length > 0
        );
      } catch (error) {
        alert("Error checking playlist status:", error);
        console.error("Error checking playlist status:", error);
        setPlaylistId("");
      }
    };

    fetchPlaylistStatus();
  }, [state.videos, state.currentVideoIndex, accessToken]);

  return (
    <div className="App">
      <div className="content-container-1">
        <form onSubmit={onSubmit}>
          <div className="form-control">
            <div className="search-title">
              <label>
                <h1>Explore and Learn with Video Tutorials!</h1>
              </label>
            </div>

            <div className="search-bar">
              <input
                value={searchTitle}
                onChange={onSearchChanged}
                id="keyword"
                type="text"
                placeholder="Search"
              />
              <button
                type="submit"
                disabled={loading}
                data-testid="search-button"
              >
                {loading ? "Searching..." : "Search"}
              </button>
            </div>
          </div>
        </form>
        <YoutubeEmbed
          embedId={
            state.videos.length > 0
              ? state.videos[state.currentVideoIndex]?.id.videoId
              : state.currentVideoId
          }
          width="560"
          height="315"
        />
      </div>
      <div className="video-info">
        <button
          className={`subscribed-button ${
            subscribed ? "unsubscribe-button" : "subscribe-button"
          }`}
          data-testid="subscribe-button"
          onClick={() => {
            handleSubscriptionToggle(
              tokenClient,
              accessToken,
              state.videos.length > 0
                ? state.videos[state.currentVideoIndex]
                : {
                    snippet: {
                      channelId: defaultChannelId,
                    },
                    id: {
                      videoId: defaultVideoId,
                    },
                  },
              setSubscribed
            );
          }}
        >
          {subscribed ? "Unsubscribe" : "Subscribe"}
        </button>
        <h4>Add the current video to a playlist named "ReactPedia"!</h4>
        <button
          className={`added-to-playlist-button ${
            addedToPlaylist
              ? "remove-from-playlist-button"
              : "add-to-playlist-button"
          }`}
          data-testid="add-to-playlist-button"
          onClick={() =>
            handleAddToPlaylistToggle(
              tokenClient,
              accessToken,
              state.videos.length > 0
                ? state.videos[state.currentVideoIndex]
                : {
                    snippet: {
                      channelId: defaultChannelId,
                    },
                    id: {
                      videoId: defaultVideoId,
                    },
                  },
              setAddedToPlaylist,
              playlistId
            )
          }
        >
          {addedToPlaylist ? "Remove from Playlist" : "Add to Playlist"}
        </button>
      </div>
      <div className="try-another">
        <h3>Not what you were looking for? Try another!</h3>
        <button
          className="prev-button"
          onClick={() => handlePrevious(state, setState)}
        >
          Previous
        </button>
        <button
          className="next-button"
          onClick={() => handleNext(state, setState)}
        >
          Next
        </button>
      </div>
    </div>
  );
};
