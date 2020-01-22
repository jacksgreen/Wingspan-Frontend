import React, { useState } from 'react';
import axios from 'axios';

export async function getResponse() {
    // const getter = await axios.get('https://itc-chrome-extension-server.herokuapp.com/')
    const getter = await axios.get('http://127.0.0.1:2700')
    return getter.data
}
