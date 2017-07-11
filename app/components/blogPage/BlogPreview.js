var React = require('react');

class BlogPreview extends React.Component {
  render(){
    return(
      <div>
        <h2>{this.props.item.title}  </h2>
        <a>{this.props.item.desc}</a>
      </div>
    );
  }
}

module.exports = BlogPreview;
