import { Meteor } from 'meteor/meteor';
import React from 'react';
import Clipboard from 'clipboard';
import moment from 'moment';

export default class LinksListItem extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      copied: false
    }
  }
  componentDidMount(){
    this.clipboard = new Clipboard(this.refs.copy);
    this.clipboard.on('success', () => {
      alert('copied');
      this.setState({copied: true})
      setTimeout(() => {
          this.setState({copied: false})
      },10000)
    }).on('error', ()=> {
      alert('Unable to copy ');
      this.setState({copied: falses})
    })
  }
  componentWillUnmount(){
    this.clipboard.destroy();
  }
  renderStats(){
    const visitMessage = this.props.visitedCount === 1 ? 'visit' : 'visits';
    let visitedMessage = null;
    if(typeof(this.props.lastVisitedAt)==='number'){
        visitedMessage = `(visited ${moment(this.props.lastVisitedAt).fromNow()})`
    }

    return(
      <p>{this.props.visitedCount } {visitMessage} - {visitedMessage}</p>
    );
  }
  render() {
    return(
      <div>
        <p>{this.props.url}</p>
        <p>{this.props.shortUrl}</p>
        <p>{this.props.visible.toString() }</p>
        {this.renderStats()}

        <button ref="copy" data-clipboard-text={this.props.shortUrl}>{ this.state.copied ? 'Copied' : 'Copy'}</button>
        <button onClick={()=> {
          Meteor.call("links.setVisibility",this.props._id, !this.props.visible);
        }}>
          {this.props.visible ? 'Hide' : 'Unhide'}
        </button>
      </div>
    );
  }
}
