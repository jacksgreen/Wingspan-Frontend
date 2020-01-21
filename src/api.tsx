import React, { useState } from 'react';
import axios from 'axios';

export async function getResponse() {
    const getter = await axios.get('http://127.0.0.1:5000/')
    return getter.data
}
