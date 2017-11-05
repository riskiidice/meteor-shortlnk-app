import React from 'react';
import Modal from 'react-modal';

import { Links } from './../api/links';

export default class Addlink extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      url: '',
      isOpen: false,
    }
  }
  onSubmit(e){
    e.preventDefault();
    const { url } = this.state;
      // Links.insert({url,userId: Meteor.userId()});
    Meteor.call("links.insert", url, (err, res) => {
      if(!err){
        this.setState({url: ''})
      }
    });

  }

  onChange(e){
    this.setState({ url: e.target.value });
  }

  render(){
    return (
      <div>
        <Modal isOpen={this.state.isOpen} contentLabel="Add Link" >
          <p>Add Links</p>
          <form onSubmit={this.onSubmit.bind(this)} >
            <input
              type="text"
              ref="url"
              placeholder="URL"
              value={this.state.url}
              onChange={this.onChange.bind(this)}
            />
            <button type="submit">Add Links</button>
          </form>
        </Modal>
      </div>
    )
  }
}
