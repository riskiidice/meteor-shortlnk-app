import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import Signup from './../ui/Signup';
import Link from './../ui/Link';
import NotFound from './../ui/NotFound';
import Login from './../ui/Login';


const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/links'];

const onEnterPublicPages = ()=> {
  if(Meteor.userId()){
    browserHistory.replace('/links');
  }
}

const onEnterPrivatePages = () => {
  if(!Meteor.userId()){
    browserHistory.replace('/');
  }
}
export const onAuthChange = (isAuthenticated) => {
  const pathname = browserHistory.getCurrentLocation().pathname;
  const isUnauthenticatedPages = unauthenticatedPages.includes(pathname);
  const isAuthenticatedPages = authenticatedPages.includes(pathname);

  if(isUnauthenticatedPages && isAuthenticated) {
      browserHistory.replace('/links');
  }else if(isAuthenticatedPages && !isAuthenticated){
    browserHistory.replace('/');
  }
}
export const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={Login} onEnter={onEnterPublicPages} />
    <Route path="/signup" component={Signup} onEnter={onEnterPublicPages} />
    <Route path="/links" component={Link} onEnter={onEnterPrivatePages}  />
    <Route path="*" component={NotFound} />
  </Router>
);
