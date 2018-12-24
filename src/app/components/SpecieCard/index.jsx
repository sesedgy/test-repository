import React from 'react';
import PropTypes from 'prop-types';

const SpecieCard = ({
  number, name, image, types, flavorText,
}) => {
  const idString = String(number);
  const filler = '000';
  const pokemonId = filler.substring(0, filler.length - idString.length) + idString;
  return (
    <div className="card">
      <div className="card-image">
        <figure className="image is-2by2 has-background-light">
          <img
            async
            src={image}
            alt={name}
          />
        </figure>
      </div>
      <div className="card-content">
        <div className="media">
          <div className="media-content">
            <p className="subtitle is-6 has-text-grey">
              {`#${pokemonId}`}
            </p>
            <p className="title is-4 is-capitalized">
              <span
                className="has-text-black"
              >
                {name}
              </span>
            </p>
            <p className="subtitle is-6">{flavorText}</p>
          </div>
        </div>
      </div>
      <footer className="card-footer">
        {types.map(item => (
          <span
            key={item.type.name}
            className={`card-footer-item is-uppercase ${item.type.name}`}
          >
            {item.type.name}
          </span>
        ))}
      </footer>
    </div>
  );
};

SpecieCard.propTypes = {
  number: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  types: PropTypes.arrayOf(PropTypes.object).isRequired,
  flavorText: PropTypes.string.isRequired,
};

export default SpecieCard;
