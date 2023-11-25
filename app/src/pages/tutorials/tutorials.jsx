// Tutorials.js

import React, { useState, useEffect } from "react";
import youtube from "../../api/youtube";
import Search from "../../components/Search";
import YoutubeEmbed from "../../components/YouTubeEmbedVideo";
import "./tutorials.css";

const defaultVideo = "SqcY0GlETPk";

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
    videoId: response.data.items.length > 0 ? response.data.items[0].id.videoId : defaultVideo,
  }));

  return response;
};

const handleSubscriptionToggle = async (
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
      console.error("Error unsubscribing:", unsubscribeResponse.statusText);
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
      console.error("Error subscribing:", subscribeResponse.statusText);
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

export const Tutorials = () => {
  const [state, setState] = useState({
    videos: [],
    videoId: defaultVideo,
    currentVideoIndex: 0,
  });
  const [tokenClient, setTokenClient] = useState({});
  const [accessToken, setAccessToken] = useState("");
  const [subscribed, setSubscribed] = useState(false);

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

      try {
        const subscriptionsResponse = await fetch(
          `https://www.googleapis.com/youtube/v3/subscriptions?part=id&mine=true&forChannelId=${state.videos[state.currentVideoIndex].snippet.channelId}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
          }
        );

        const subscriptionsData = await subscriptionsResponse.json();

        setSubscribed(subscriptionsData.items && subscriptionsData.items.length > 0);
      } catch (error) {
        console.error('Error fetching subscription status:', error);
      }
    };

    fetchSubscriptionStatus();
  }, [state.videos, state.currentVideoIndex, accessToken]);

  return (
    <div className="App">
      <div className="content-container-1">
        <Search onSearch={(keyword) => onSearch(keyword, setState)} />
        <YoutubeEmbed
          embedId={state.videos.length > 0 ? state.videos[state.currentVideoIndex]?.id.videoId : state.videoId}
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
              state.videos[state.currentVideoIndex],
              setSubscribed
            )
          }
        >
          {subscribed ? "Unsubscribe" : "Subscribe"}
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
