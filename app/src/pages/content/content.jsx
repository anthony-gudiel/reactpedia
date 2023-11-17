import React, { useState } from 'react';
import youtube from '../../api/youtube';
import Search from '../../components/Search';
import YoutubeEmbed from '../../components/YouTubeEmbedVideo';

export const Content = () => {
  const [state, setState] = useState({
    videos: [],
    videoId: null,
  });

  const onSearch = async (keyword) => {
    const response = await youtube.get('/search', {
      params: {
        q: keyword,
      },
    });


    setState(() => ({
      videos: response.data.items,
      videoId: response.data.items[0].id.videoId
    }));
  }

  return (
    <div className="App">
      Content
        <Search onSearch={onSearch}/>
        <YoutubeEmbed embedId={state.videoId} width="560" height="315" />
    </div>
  );
};
