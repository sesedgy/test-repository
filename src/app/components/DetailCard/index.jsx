import React from 'react';
import PropTypes from 'prop-types';

const DetailCard = ({
  height, weight, category, abilities,
}) => (
  <div className="card">
    <div className="card-header">
      <p className="card-header-title">
        Details
      </p>
    </div>
    <div className="card-content">
      <div className="columns">
        <div className="column is-half">
          <p className="is-6 has-text-grey">Height</p>
          <p>
            {`${height / 10} m`}
          </p>
          <p className="is-6 has-text-grey">Weight</p>
          <p>
            {`${weight / 10} kg`}
          </p>
        </div>
        <div className="column is-half">
          <p className="is-6 has-text-grey">Category</p>
          <p>{category}</p>
          <p className="is-6 has-text-grey">Abilities</p>
          {abilities.map(ability => (
            <p
              key={ability.ability.name}
              className="is-capitalized"
            >
              {ability.ability.name}
            </p>
          ))}
        </div>
      </div>
    </div>
  </div>
);

DetailCard.propTypes = {
  height: PropTypes.number.isRequired,
  weight: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired,
  abilities: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default DetailCard;
