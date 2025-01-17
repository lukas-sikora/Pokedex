import React from 'react';
import { useNavigate } from 'react-router-dom';
import heartIcon from '../assets/ICON/heart.png';
import heartFilledIcon from '../assets/ICON/heartFilledIcon.png';

const HeartIconComponent = ({ isFavorite, onToggleFavorite }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    onToggleFavorite();
    if (isFavorite) {
      navigate('/favorites'); // Przekierowanie do ulubionych
    }
  };

  return (
    <img
      src={isFavorite ? heartFilledIcon : heartIcon}
      alt="Heart Icon"
      onClick={(e) => {
        e.stopPropagation();
        handleClick();
      }}
      className="absolute top-2 left-2 w-8 h-8 cursor-pointer"
    />
  );
};

export default HeartIconComponent;
