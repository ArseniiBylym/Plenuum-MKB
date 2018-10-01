// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import './CreateNewButton.css';
// import Constants from '../../../../lib/constants';

// export default function CreateNewButton(props) {
//     const { text } = props;
//     return (
//         <NavLink to={Constants.Route.CREATE_NEW_SURVEY} className='CreateNewButton'>
//             <div className='CreateNewButton__icon'>
//                 <div className="plus-icon"></div>
//             </div>
//             <div className='CreateNewButton__text'>{text}</div>
//         </NavLink>
//     )
// }

import React from 'react';
import { NavLink } from 'react-router-dom';
import './CreateNewButton.css';
import Constants from '../../../../lib/constants';

export default function CreateNewButton(props) {
    const { text } = props;
    return (
        <NavLink to={Constants.Route.CREATE_NEW_SURVEY_TEMPLATE} className='CreateNewButton'>
         {/* <NavLink to={Constants.Route.CREATE_NEW_SURVEY} className='CreateNewButton'> */}
            <div className='CreateNewButton__icon'>
                <div className="plus-icon"></div>
            </div>
            <div className='CreateNewButton__text'>{text}</div>
        </NavLink>
    )
}

