"use strict"
import './style.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import MemojiReactApp from './components/MemojiReactApp/MemojiReactApp';

let MEMOJIAPP = MEMOJIAPP || {};

MEMOJIAPP.namespace = function(propsString) {
    let parent = MEMOJIAPP,
        parts = propsString.split('.'),
        i;

    if(parts[0] === 'MEMOJIAPP') {
        parts = parts.slice(1);
    }

    for(i = 0; i < parts.length; i++) {
        if(typeof parent[parts[i]] === 'undefined') {
            parent[parts[i]] = {};
        }
        parent = parent[parts[i]];
    }
    return parent;
}

MEMOJIAPP.startgame = (function (){
    ReactDOM.render(<MemojiReactApp />, document.querySelector('#root'));
    
}());

export default MEMOJIAPP;









