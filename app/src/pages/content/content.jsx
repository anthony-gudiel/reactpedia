import React from 'react'
import youtube from '../../api/youtube'
import Search from '../../components/Search'
export const Content = () => {
  const state= {
    videos:[],
    videoId: null
  }

   const onSearch = async keyword => {
    const response = await youtube.get("/search", {
      params:{
        q: keyword
      }
    });
    
    console.log(response);
    
  }

  
    return(
      <div className='App'>
      Content
      <Search onSearch={onSearch}/>
  
      
    </div>)

}