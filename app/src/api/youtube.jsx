import axios from 'redaxios'

const KEY = process.env.REACT_APP_YOUTUBE_API_KEY

export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3',
    params:{
        part:'snippet',
        maxResults:10,
        key: KEY
    },
    headers: {}
})