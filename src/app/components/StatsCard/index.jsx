import React from 'react';
import PropTypes from 'prop-types';

const StatsCard = ({ stats }) => (
  <div className="card">
    <div className="card-header">
      <p className="card-header-title">
                    Stats
      </p>
    </div>
    <div className="card-content">
      {stats.map(stat => (
        <div key={stat.stat.name}>
          <p className="has-text-grey is-uppercase is-4">{stat.stat.name}</p>

          <progress
            className="progress is-primary"
            value={stat.base_stat}
            max="100"
          >
            {`${stat.base_stat}%`}
          </progress>
        </div>
      ))}
    </div>
  </div>
);

StatsCard.propTypes = {
  stats: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default StatsCard;
