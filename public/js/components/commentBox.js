import React from 'react';
import CommentList from './commentList';
import CommentForm from './commentForm';

export default class CommentBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: props.initialData };
    this.loadCommentsFromServer = this.loadCommentsFromServer.bind(this);
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
  }

  componentDidMount() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  }

  loadCommentsFromServer() {
    var handleSuccess = (data) => {
      this.setState({
        data: data
      });
    };

    var handleError = (xhr, status, err) => {
      this.setState({
        data: comments
      });
      console.error(this.props.url, status, err.toString());
    };

    $.ajax({
      url: "/api/comments",
      dataType: 'json',
      cache: false,
      success: handleSuccess,
      error: handleError
    });
  }

  handleCommentSubmit(comment) {
    var comments = this.state.data;
    comment.id = Date.now(); //Optimistically setting an id on the new comment

    this.setState({
      data: comments.concat([comment])
    });

    var handleSuccess = (data) => {
      this.setState({
        data: data
      });
    };

    var handleError = (xhr, status, err) => {
      this.setState({
        data: comments
      });
      console.error(this.props.url, status, err.toString());
    };

    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: comment,
      success: handleSuccess,
      error: handleError
    });
  }

  render() { //passing handleCommentSubmit callback to the CommentForm component
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.state.data}/>
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
      </div>
    );
  }
}

CommentBox.defaultProps = { initialData: [], initialUrl: '' };
