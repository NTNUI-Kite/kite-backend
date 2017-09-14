import React from 'react';
import PropTypes from 'prop-types';

const InstaWidget = props => (
  <div className="instaContainer">
    {
      props.posts.map(info => (
        <div key={info.id} className="instaPost">
          <a target="_blank" href={`https://www.instagram.com/p/${info.code}`}>
            <img alt="instagram" className="instaImage" src={info.thumbnail_src} />
          </a>
        </div>
      ))
    }
  </div>
);

InstaWidget.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default InstaWidget;
