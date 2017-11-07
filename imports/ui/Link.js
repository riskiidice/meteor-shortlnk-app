import React from 'react';

import { Links } from './../api/links';
import  LinksList from './Linkslist';
import  PrivateHeader from './PrivateHeader';
import  Addlink from './Addlink';
import LinksListFilters from './LinksListFilters';

 export default () => {
   return (
     <div>
       <PrivateHeader title="Your Links" />
       <div className="page-content">
         <LinksListFilters />
         <Addlink />
         <LinksList/ >
       </div>
     </div>
   )
 }
