var React = require('react');
var BlogPreview = require('./BlogPreview');

class BlogPreviewList extends React.Component {
  render(){
    return(
      <div>
        {
          this.props.entries.map(function(item,index){
            return(
              <BlogPreview item = {item} key={index}/>
            );
          })
        }
      </div>
    );
  }
}

module.exports = BlogPreviewList;
