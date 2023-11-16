import axios from 'redaxios'

const KEY = "AIzaSyD6_99z-Q22DH1MF_n29zukhs4t2Vm3Ezs"

export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3',
    params:{
        part:'snippet',
        maxResults:10,
        key: KEY
    },
    headers: {}
})