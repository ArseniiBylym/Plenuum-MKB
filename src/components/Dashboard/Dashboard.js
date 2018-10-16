import React from 'react';
import './Dashboard.css';

const Dashboard = (props) => {
  return (
    <div className={`super-container ${ props.user.orgId }`}>
      <div className="main-Container" >
        <div className="content">
          {props.options}
          <div className="dashboard-notification">
            {props.notification}
          </div>
          <div className="component" >
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;



// import React from 'react';
// import './Dashboard.css';

// const Dashboard = (props) => {
//   return (
//     <div className={`super-container `}>
//       <div className="main-Container" >
//         <div className="content">
//           {props.options}
//           <div className="dashboard-notification">
//             {props.notification}
//           </div>
//           <div className="component" >
//             {props.children}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

