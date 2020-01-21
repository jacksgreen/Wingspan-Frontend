import React, { useState } from 'react';

export function getResponse() {
    fetch('127.0.0.1:5000/')
        .then(res => res.json())
        .then((data) => {
            return data
        })
        .catch(err => {
            console.error
        })

}
