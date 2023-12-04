// Videos.js

import React, { useState, useEffect } from "react";
import youtube from "../../api/youtube";
import Search from "../../components/Search";
import YoutubeEmbed from "../../components/YouTubeEmbedVideo";
import "./videos.css";

const defaultVideoId = "SqcY0GlETPk";
const defaultChannelId = "UCWv7vMbMWH4-V0ZXdmDpPBA";
var playlistName = "ReactPedia";
var playlistId = "";

export const onSearch = async (keyword, setState) => {
  const response = await youtube.get("/search", {
    params: {
      q: keyword,
      type: "video",
      maxResults: 25,
    },
  });

  setState(() => ({
    videos: response.data.items,
    currentVideoIndex: 0,
    videoId:
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
    alert(
      "Error fetching subscription status:",
      subscriptionsResponse.status
    );
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
    } else {
      alert("Error subscribing:", subscribeResponse.status);
      console.error("Error subscribing:", subscribeResponse.status);
    }
  }
};

export const findAndCreatePlaylist = async (accessToken, playlistId) => {
  var playlistId_list;
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
    return;
  } else {
    playlistId_list = await response.json();
  }

  for (var i = 0; i < playlistId_list.items.length; i++) {
    if (playlistId_list.items[i].snippet.localized.title === playlistName) {
      playlistId = playlistId_list.items[i].id;
      break;
    }
  }

  // No playlist found, create one
  if (playlistId === "") {
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
            description: "This is playlist from website.",
            tags: ["react-learning-app"],
          },
        }),
      }
    );
    if (!response.ok) {
      alert("Error fetching playlists:", response.status);
      console.error("Error fetching playlists:", response.status);
      return;
    } else {
      playlistId_list = await response.json();
    }
  }
  return playlistId;
};

export const handleAddToPlaylistToggle = async (
  tokenClient,
  accessToken,
  videoItem,
  setAddedToPlaylist,
  playlistId
) => {
  if (accessToken === "") {
    tokenClient.requestAccessToken();
    return;
  }

  if (playlistId === "") {
    playlistId = await findAndCreatePlaylist(accessToken, playlistId);
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
      alert(
        "Error removing from playlist:",
        removeFromPlaylistResponse.status
      );
      console.error(
        "Error removing from playlist:",
        removeFromPlaylistResponse.status
      );
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
      console.error(
        "Error adding to playlist:",
        addToPlaylistResponse.status
      );
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

export const Videos = () => {
  const [state, setState] = useState({
    videos: [],
    videoId: defaultVideoId,
    currentVideoIndex: 0,
  });
  const [tokenClient, setTokenClient] = useState({});
  const [accessToken, setAccessToken] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [addedToPlaylist, setAddedToPlaylist] = useState(false);

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

      if (playlistId === "") {
        playlistId = await findAndCreatePlaylist(accessToken, playlistId);
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
      }
    };

    fetchPlaylistStatus();
  }, [state.videos, state.currentVideoIndex, accessToken]);

  return (
    <div className="App">
      <div className="content-container-1">
        <Search onSearch={(keyword) => onSearch(keyword, setState)} />
        <YoutubeEmbed
          embedId={
            state.videos.length > 0
              ? state.videos[state.currentVideoIndex]?.id.videoId
              : state.videoId
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
          onClick={() =>
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
            )
          }
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
