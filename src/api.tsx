import React, { useState } from 'react';
import axios from 'axios';

export async function getResponse() {
    const getter = await axios.get('https://itc-chrome-extension-server.herokuapp.com/')
    return getter.data
}
