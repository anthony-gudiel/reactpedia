// Tutorials.js

import React, { useState, useEffect } from 'react';
import youtube from '../../api/youtube';
import Search from '../../components/Search';
import YoutubeEmbed from '../../components/YouTubeEmbedVideo';
import './tutorials.css';

var nameplaylist = 'react-learning-app'

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

export const handleSubcribe = (tokenClient, accessToken, videoItems) => {
  console.log(videoItems)
  console.log(videoItems.snippet.channelId)
  if (accessToken == '') {
    console.log("request new token")
    tokenClient.requestAccessToken()
  } else {
    console.log("already have token")
    console.log(accessToken)
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
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
  }
}

const onGettingPlaylist = async (tokenClient, accessToken, playlists) => {
  console.log(playlists)
  var id = "";

  for (var i = 0; i < playlists.items.length; i++) {
    if (playlists.items[i].snippet.localized.title === "react-learning-app") {
      console.log(playlists);
      console.log(playlists.items[i].id)
      break;
    }
  }
  if (id === "") {
    console.log(" no react")
    await fetch("https://www.googleapis.com/youtube/v3/playlists?part=id,snippet", {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "snippet": {
          "title": nameplaylist,
          "description": "This is playlist from website.",
          "tags": [
            "react-learning-app"
          ]
        }
      })
    }).then(response => response.json())

    for (var i = 0; i < playlists.items.length; i++) {
      if (playlists.items[i].snippet.localized.title === "react-learning-app") {
        console.log(playlists);
        console.log(playlists.items[i].id)
        break;
      }
    }
  }

  
} 

export const handleAddToPlaylist = async (tokenClient, accessToken) => {

  if (accessToken == '') {
    // console.log("request new token")
    tokenClient.requestAccessToken()
  } else {
    // console.log("already have token")
    // console.log("retriveData")
    const response = await fetch("https://www.googleapis.com/youtube/v3/playlists?part=snippet&mine=true", {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log(data)
        //onGettingPlaylist(data);
      })
      .catch(error => {
        console.error('Error:', error);
      })
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
        client_id: "730770086946-fp5jl29v8oc54g6cd95cugi5g7587u4v.apps.googleusercontent.com",
        scope: "https://www.googleapis.com/auth/youtube",
        callback: (token) => {
          console.log(token);
          setAccessToken(token.access_token);
          //retriveData(data, token.access_token);
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
        <button id="Subcribe" onClick={() => handleSubcribe(tokenClient, accessToken, state.videos[state.currentVideoIndex])}>Subcribe</button>
        <button id="add-to-playlist" onClick={() => handleAddToPlaylist(tokenClient, accessToken)}>Add to playlists</button>
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
