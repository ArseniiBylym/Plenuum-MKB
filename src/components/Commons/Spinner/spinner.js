import React from 'react';
import MDSpinner from "react-md-spinner";

export const spinner = (props) => {
  return (
    <div {...props} className="spinner-plenuum">
      <MDSpinner
        color1='#50E3C2'
        color2='#F5D141'
        color3='#35A9DB'
        color4='#35A9DB'
      />
    </div>
  )

};
