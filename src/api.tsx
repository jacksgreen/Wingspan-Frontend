import React, { useState } from 'react';
import axios from 'axios';

export async function getResponse() {
  //const server = 'https://itc-chrome-extension-server.herokuapp.com/'
  const server = 'http://127.0.0.1:2700/';
  const getter = await axios.get(server);
  return getter.data;
}

export async function getResponseFromSearchBar(search: any) {
  //const server = 'https://itc-chrome-extension-server.herokuapp.com/'
  const server = 'http://127.0.0.1:2700/search';
  const getter = await axios.get(server, search);
  return getter.data;
}

export async function getData(url: any) {
  const server = 'http://127.0.0.1:2700';
  const response = await axios.get(`${server}/data?url=${url}`);
  return response.data;
}
