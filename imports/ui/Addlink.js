import React from 'react';
import Modal from 'react-modal';

import { Links } from './../api/links';

export default class Addlink extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      url: '',
      isOpen: false,
      error: '',
    }
  }
  onSubmit(e){
    e.preventDefault();
    const { url } = this.state;
      // Links.insert({url,userId: Meteor.userId()});
    Meteor.call("links.insert", url, (err, res) => {
      if(!err){
        this.setState({isOpen:false, url: '', error: ''})
        this.handleModalClose();
      }else{
        this.setState({error: err.reason})
      }
    });

  }

  onChange(e){
    this.setState({ url: e.target.value });
  }

  handleModalClose(){
    this.setState({isOpen:false,url:'', error:''});
  }
  render(){
    return (
      <div>
        <button className="button" type="button" onClick={()=> {this.setState({isOpen: true})}}>+Add Link</button>
        <Modal isOpen={this.state.isOpen}
          contentLabel="Add Link"
          onAfterOpen={()=> this.refs.url.focus()}
          onRequestClose={this.handleModalClose.bind(this)}
          className="boxed-view__box"
          overlayClassName="boxed-view boxed-view--modal"
          >
          <h1>Add Link</h1>
          {this.state.error ? <p>{this.state.error}</p> : undefined}
          <form onSubmit={this.onSubmit.bind(this)} className="boxed-view__form">
            <input
              type="text"
              ref="url"
              placeholder="URL"
              value={this.state.url}
              onChange={this.onChange.bind(this)}
            />
            <button className="button" type="submit">Add Link</button>
            <button type="button" className="button button--secondary" onClick={this.handleModalClose.bind(this)}>Cancel</button>
          </form>

        </Modal>
      </div>
    )
  }
}
