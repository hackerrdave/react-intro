import React from 'react';
import { render } from 'react-dom';
import CommentBox from './js/components/commentBox';
import './styles/main.scss';

render(
  <CommentBox 
  	url={"/api/comments"}
  	pollInterval={2000} 
  />,
  document.getElementById('content')
);
