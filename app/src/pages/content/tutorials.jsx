import React, { useState } from 'react';
import youtube from '../../api/youtube';
import Search from '../../components/Search';
import YoutubeEmbed from '../../components/YouTubeEmbedVideo';
import './tutorials.css';

export const Tutorials = () => {
  const [state, setState] = useState({
    videos: [],
    videoId: "a3ICNMQW7Ok",
    currentVideoIndex: 0,
  });

  const onSearch = async (keyword) => {
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
  }

  const handleNext = () => {
    setState((prevState) => ({
      ...prevState,
      currentVideoIndex: (prevState.currentVideoIndex + 1) % state.videos.length,
    }));
  };

  const handlePrevious = () => {
    setState((prevState) => ({
      ...prevState,
      currentVideoIndex: (prevState.currentVideoIndex - 1 + state.videos.length) % state.videos.length,
    }));
  };

  return (
    <div className="App">
      <div className='content-container-1'>
          <Search onSearch={onSearch}/>
          <YoutubeEmbed embedId={state.videos[state.currentVideoIndex]?.id.videoId} width="560" height="315" />
      </div>
      <div className='try-another'>
        <h3>Not what you were looking for? Try another!</h3>
        <button className='prev-button' onClick={handlePrevious}>
          Previous
        </button>
        <button className='next-button' onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
};
