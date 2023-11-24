
// Tutorials.js

import React, { useState, useEffect } from 'react';
import youtube from '../../api/youtube';
import Search from '../../components/Search';
import YoutubeEmbed from '../../components/YouTubeEmbedVideo';
import './tutorials.css';

export const onSearch = async (keyword, setState) => {
  const response = await youtube.get('/search', {
    params: {
      q: keyword,
      type: 'video',
      maxResults: 25,
    },
  });

  setState(() => ({
    videos: response.data.items,
    currentVideoIndex: 0,
    videoId: response.data.items[0].id.videoId
  }));

  return response;
};

export const handleSubcribe = (tokenClient, accessToken, videoItems) =>{
  if (accessToken == ''){
    tokenClient.requestAccessToken()
  }else{
     fetch("https://www.googleapis.com/youtube/v3/subscriptions?part=snippet", {
      method: 'POST', 
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "snippet": {
          "resourceId": {
            "kind": "youtube#channel",
            "channelId": videoItems.snippet.channelId
          }
        }
      })
    })
      .catch(error => console.error('Error:', error));
  }
}

export const handleNext = (state, setState) => {
  setState((prevState) => ({
    ...prevState,
    currentVideoIndex: (prevState.currentVideoIndex + 1) % state.videos.length,
  }));
};

export const handlePrevious = (state, setState) => {
  setState((prevState) => ({
    ...prevState,
    currentVideoIndex: (prevState.currentVideoIndex - 1 + state.videos.length) % state.videos.length,
  }));
};

export const Tutorials = () => {
  const [state, setState] = useState({
    videos: [],
    videoId: "a3ICNMQW7Ok",
    currentVideoIndex: 0,
  });
  const [tokenClient, setTokenClient] = useState({});
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    const initializeTokenClient = async () => {
      const client = await window.google.accounts.oauth2.initTokenClient({
        client_id: process.env.REACT_APP_OAUTH_CLIENT_ID,
        scope: "https://www.googleapis.com/auth/youtube",         
        callback: (token) => {
          setAccessToken(token.access_token);
        }
      });
      setTokenClient(client);
    };
    initializeTokenClient();
  }, []);

  return (
    <div className="App">
      <div className='content-container-1'>
        <Search onSearch={(keyword) => onSearch(keyword, setState)} />
        <button id="Subcribe" onClick={() => handleSubcribe(tokenClient, accessToken, state.videos[state.currentVideoIndex])}>Subscribe</button>
        <YoutubeEmbed embedId={state.videos[state.currentVideoIndex]?.id.videoId} width="560" height="315" />
      </div>
      <div className='try-another'>
        <h3>Not what you were looking for? Try another!</h3>
        <button className='prev-button' onClick={() => handlePrevious(state, setState)}>
          Previous
        </button>
        <button className='next-button' onClick={() => handleNext(state, setState)}>
          Next
        </button>
      </div>
    </div>
  );
};
