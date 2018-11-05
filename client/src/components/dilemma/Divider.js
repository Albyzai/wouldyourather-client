import React from 'react';
import propTypes from 'prop-types';

//The divider bar between Dilemma and comments section
const Divider = ({ title, user }) => {
  return (
    <div id="divider" className="container-fluid">
      {title &&
        user && (
          <span>
            {title} af <span style={{ color: 'blue' }}>{user.username}</span>
          </span>
        )}
    </div>

    /*<div id="divider">
      <div className="col-md-8" id="divider-left">
        {title &&
          user && (
            <h4>
              {title} af <span style={{ color: 'blue' }}>{user.username}</span>
            </h4>
          )}
      </div>
      <div className="col-md-4 social" id="divider-right">
        <button type="button" className="btn btn-light mr-1">
          <i className="text-info fas fa-thumbs-up" />
          <span className="badge badge-light">{likes.length}</span>
        </button>
      </div>
    </div> */
  );
};

Divider.propTypes = {
  title: propTypes.string,
  user: propTypes.object.isRequired
};

export default Divider;
