import React from "react";
import swordIcon from "../assets/ICON/sword.png";
import swordFilledIcon from "../assets/ICON/swordFilledIcon.png";

const SwordIconComponent = ({ isInArena, onToggleArena }) => {
  return (
    <img
      src={isInArena ? swordFilledIcon : swordIcon}
      alt="Sword Icon"
      onClick={(e) => {
        e.stopPropagation();
        onToggleArena();
      }}
      className="absolute top-2 left-16 w-8 h-8 cursor-pointer"
    />
  );
};

export default SwordIconComponent;
