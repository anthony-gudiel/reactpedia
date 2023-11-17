import axios from 'redaxios'

const KEY = "AIzaSyAE1YmODfahCNsvS0jmJ2ztHUkd97wETYU"

export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3',
    params:{
        part:'snippet',
        maxResults:10,
        key: KEY
    },
    headers: {}
})