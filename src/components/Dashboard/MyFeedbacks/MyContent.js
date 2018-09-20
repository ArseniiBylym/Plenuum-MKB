import React from 'react';
import './MyContent.css';

const MyContent = (props) => {
  return (
    <div className="mycontent-main-container">
      {props.searchPage.overlay}
      <div className="mycontent-search-page">
        {props.searchPage.searchUsers}
      </div>
      <nav className="navbar navbar-default">
        <div className="flex-container">
          <div className='centered-items'>
            {props.segmentedControl}
          </div>
          <div className="action-icons">
            <ul className="nav navbar-nav navbar-right test">
              <li className='icons-style'>{props.searchButton}</li>
              <li
                className='icons-style'
                onClick={props.searchUsers.openSearch}
              >
                <div className={'mycontent-search-users' + (props.filter ? ' active' : '')}>

                </div>

              </li>
            </ul>
          </div>
        </div>
      </nav>
      {props.filter}
      <div className="mycontent-content">
        {props.children}
      </div>
    </div>
  );
};

export const filterComponent = (props) => {
    return (
        <div className="mycontent-filter">
            <div className="mycontent-filter-query">
                <p>Filter: &nbsp;</p>
                <p>{props.name}</p>
            </div>
            <a className='mycontent-close' onClick={props.cancelQuery}>
                <i className='fa fa-times close-icon'></i>
            </a>

        </div>
    );
};

export const overlayComponent = () => {
    return (<div className='overlay'></div>);
};

export const searchUsersComponent = (props) => {
  const { searchTitle="Filter by people" }=props
    return (
        <div className={"mycontent-search-container " + props.className }>
            <div className='container-fluid'>
                <div className="row">
                    <div className='col-sm-12'>
                        <div className="mycontent-search-title ">
                            <h5 className='filter-by-text'>{ searchTitle }
                                <a className='pull-right' onClick={props.openSearch}>
                                    <i className='fa fa-times close-icon'></i>
                                </a>
                            </h5>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className='col-sm-12'>
                        {props.search}
                    </div>
                </div>
                <div className="row">
                    <div className='col-sm-12'>
                        <div className='result-text'>{props.groupTitle}</div>
                    </div>
                </div>
                <div className="row">
                    <div className='col-sm-12'>
                        <div>{props.userList}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const selectedSearchButtonComponent = (props) => {
    return (
        <div className='search-input'>
            {props.search}
            <div className="search-icon-close" onClick={props.showSearchInput}>
            </div>
        </div>
    )
};

export const searchButtonComponent = (props) => {
    return (<div className="search-icon" onClick={props.showSearchInput}></div>);
};

export default MyContent;
