import React from 'react';
import PropTypes from 'prop-types';

const ErrorPanel = ({ errors }) => (
  <div className="notification is-danger">
    <button type="button" className="delete" />
    {
        errors.map(error => <p key={error} className="control">{error}</p>)
    }
  </div>
);

ErrorPanel.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ErrorPanel;
