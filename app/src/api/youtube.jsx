import axios from 'redaxios'

const KEY = "AIzaSyDX9MUj7hjX2l4A1_QzmBne1YBwWAJBsMM"

export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3',
    params:{
        part:'snippet',
        maxResults:10,
        key: KEY
    },
    headers: {}
})