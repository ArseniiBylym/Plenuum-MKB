import React from 'react';
import './Dashboard.css';
import {Icon, Button} from 'react-materialize'

const Dashboard = (props) => {
  let currentTheme = '';
  if(props.user.orgId == 'hipteam' || 
    props.user.orgId == 'mkb-bank' || 
    props.user.orgId == 'mkb-bank-test1'|| 
    props.user.orgId == 'mkb-bank-test2' || 
    props.user.orgId == 'mkb-bank-test3' ||
    props.user.orgId == 'mkb-bank-test4' || 
    props.user.orgId == 'mkb-bank-test5'){
      currentTheme = 'hipteam'
    }
  return (
    <div className={`super-container ${ currentTheme }`}>
      <div className="main-Container" > 
        <div className={props.isSidebarShow ? "content showSidebar" : "content"}>
        <div  onClick={props.openSidebar} className='hamburger_open-icon'>
          <Icon medium className='hamburger_icon'>navigate_next</Icon>
        </div>
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

