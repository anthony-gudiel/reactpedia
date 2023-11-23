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
  
  useEffect(() => {
    setTokenClient(
      window.google.accounts.oauth2.initTokenClient({
        client_id: "730770086946-fp5jl29v8oc54g6cd95cugi5g7587u4v.apps.googleusercontent.com",
        scope: "https://www.googleapis.com/auth/youtube",
        callback: (token) => {
          console.log(token);
        }
      })
    );
  }, []);

  return (
    <div className="App">
      <div className='content-container-1'>
        <Search onSearch={(keyword) => onSearch(keyword, setState)} />
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
