import axios from 'axios'

export async function getResponse() {
    const response = await axios.get('http://127.0.0.1:5000/')
    console.log(response.data)
}
