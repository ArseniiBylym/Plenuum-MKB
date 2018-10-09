import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ProfileSettings, {editActions, editSaveActions} from './ProfileSettings.js';
import ChangePasswordContainer from '../../Session/ChangePassword/index.js';
import SetPictureContainer from './SetPicture/index.js';
import Api from '../../../lib/api';
import UserListContainer from '../Commons/UserList/index.js';
import { searchUsersComponent } from  '../MyFeedbacks/MyContent.js';
import SearchContainer from '../Commons/Search/index.js';
import { connect } from 'react-redux';
import { Utils } from '../../../lib/utils';

class ProfileSettingsContainer extends Component {

    constructor(props, context){
        super(props);

        this.store = context.store;
        this.setUserData();
        this.utils = Utils();

        this.handleTextField = this.handleTextField.bind(this);
        this.handleEdition = this.handleEdition.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleResponse = this.handleResponse.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handlePictureChange = this.handlePictureChange.bind(this);
    }

    setUserData = () => {
        const user = this.store.getState().currentUser;
        const usersManager = this.props.usersManager

        let managerProfilePicture = ''
        let managerProfileFullName = ''
        let managerProfileId = ''

        if(usersManager) {
            managerProfilePicture = usersManager.pictureUrl;
            managerProfileFullName = usersManager.fullName;
            managerProfileId = usersManager._id;
        }

        this.state = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: '',
            newPassword: '',
            passwordAgain : '',
            edit: false,
            setPic: false,
            uploadedImage: undefined,
            changePassword: undefined,
            allManagers: [],
            searchedManager: [],
            searchPage: false,
            managerSelected: false,
            selectedManager:{
                managerProfilePicture: `${managerProfilePicture}`,
                fullName: `${managerProfileFullName}`,
                _id: `${managerProfileId}`
            },
            selectLineManager:false
        }
    }

    //----------For manager select
    openSearch = () => {
        this.setState({
            searchPage: !this.state.searchPage,
        });
    }
    deleteSelectedManager(e){
        e.stopPropagation();
        this.setState({
            selectedManager: {},
            // selectLineManager:true 
        })
    }

    selectLineManager(){
        this.setState( (prev) => ({ selectLineManager: !prev.selectLineManager }) )
    }

    getManagers() {
        const { currentUser } = this.store.getState();
        if ( currentUser ) {
            const orgId = currentUser.orgId;
            Api.users( orgId )
                .then(( allManagers ) => {
                    const managersWithoutMe = allManagers.filter((element) => {
                        return element._id !== currentUser._id;
                    });
                    managersWithoutMe.sort( (a, b) => {
                        var nameA = a.firstName.toLowerCase();
                        var nameB = b.firstName.toLowerCase();
                        var secondNameA = a.lastName.toLowerCase();
                        var secondNameB = b.lastName.toLowerCase();
                        if (nameA < nameB) {
                            return -1;
                        }
                        if (nameA > nameB) {
                            return 1;
                        }
                        if (secondNameA < secondNameB) {
                            return -1;
                        }
                        if (secondNameA > secondNameB) {
                            return 1;
                        }
                        return 0;
                    } );
                    this.setState({ allManagers: managersWithoutMe, searchedManager: managersWithoutMe});
                })
                .catch((error) => { console.log(error.message) });
        }
    }

    componentDidMount = () => {
        this.setUserData()
        this.getManagers()
    }

    handleUserClick = (clickedManager) => {
        const { firstName, lastName, pictureUrl = '/profile.1623f812.svg', _id } = clickedManager;
        const fullName = firstName + ' ' + lastName;
        this.props.addManagerToUserProfileSaga(pictureUrl, fullName, _id);
        console.log(fullName)
        this.setState((prevState) => {
            return{
                selectedManager: {
                    managerProfilePicture: pictureUrl,
                    fullName,
                    _id
                },
                searchPage: !prevState.searchPage, 
                selectLineManager:false 
            }
                
        })
        // this.setState( (prev) => ({searchPage: !prev.searchPage, selectLineManager:false }))
    }
    searchFor = (event) => {
        const { currentUser } = this.store.getState();
        const string = event ? event.target.value : "";
        const { allManagers } = this.state;
        let resultManager = allManagers.filter((element) => {
          let strings = string.replace(/\s/g, '');

          let fullName = element.firstName.replace(/\s/g, '') + '' + element.lastName.replace(/\s/g, '');
          let nameFull = element.lastName.replace(/\s/g, '') + '' + element.firstName.replace(/\s/g, '');

          return fullName.toLowerCase().includes(strings.toLowerCase())
          || nameFull.toLowerCase().includes(strings.toLowerCase());
        });

        resultManager = this.utils.sortUsers( resultManager );
        this.setState( {searchedManager: resultManager} );
    }
    //----------For manager select

    componentWillMount(){
        this.handleEdition();
    }
   

    handleChangePassword(shouldOpen) {
        let changePassword;
        if (!shouldOpen) {
            changePassword = undefined;
        } else {
            changePassword = (<ChangePasswordContainer handleCloseAlert={this.handleChangePassword}/>);
        }
        this.setState({changePassword:changePassword});
    }

    handleResponse(response, error){
        if (error) {
            console.log(error.message);
        }else{
            console.log(response);
        }
    }

    handleSave(){
        this.changePassword();
        this.handleEdition();
    }

    handlePictureChange()
    {
        if (this.state.setPic) {
            this.dropzone = (
                undefined
            );
            this.setState({setPic: false});
        } else {
            this.dropzone = <SetPictureContainer handlePictureChange={this.handlePictureChange}
                                                 updatePicture={this.props.setProfilePicture}/>
            this.setState({setPic: true, dropzone: this.dropzone});
        }
    }


    handleEdition(){
        if (this.state.edit) {
            this.actions = editSaveActions({handleEdition:this.handleEdition, handleSave:this.handleSave});
            this.setState({edit: false});
        }else {
            this.actions = editActions({handleEdition:this.handleEdition});
            this.setUserData();
            this.setState({edit: true, password: '', newPassword: '', passwordAgain: ''});
        }
    }

    handleTextField(e){
        switch (e.target.name) {
            case 'firstName':
                this.setState({firstName: e.target.value});
                break;
            case 'lastName':
                this.setState({lastName: e.target.value});
                break;
            case 'email':
                this.setState({email: e.target.value});
                break;
            case 'password':
                this.setState({password: e.target.value});
                break;
            case 'newPassword':
                this.setState({newPassword: e.target.value});
                break;
            case 'passwordAgain':
                this.setState({passwordAgain: e.target.value});
                break;
            default:
                return;
        }
    }

    render(){
        const user = this.store.getState().currentUser;
        const { searchPage, searchedManager, allManagers } = this.state;
        let groupTitle;

        if (searchedManager.length - 1 === allManagers.length - 1) {
            groupTitle = "All";
        } else if (searchedManager.length > 0 && searchedManager.length < allManagers.length - 1) {
            groupTitle = "Results";
        } else {
            groupTitle = "No Results";
        }
        const search = (<SearchContainer
            searchFor={ this.searchFor }
            customClass='filter-manager'
        />);
        let managersList = null;
        if(this.state.searchPage) {
            managersList = searchUsersComponent({
                userList: <UserListContainer
                        users={ searchedManager }
                        handleUserClick={this.handleUserClick}
                    />,
                    openSearch:this.openSearch,
                    searchTitle:'Válaszd ki a vezetőd',
                    search,
                    groupTitle,
                    className:"select-manager"
                })
        }
        
        return (
            <div>

            <ProfileSettings 
                user={user}
                setPic={this.handlePictureChange}
                actions={this.actions}
                handleTextField={!this.state.edit ? this.handleTextField : undefined}
                handleChangePassword={this.handleChangePassword}
                readOnly={this.state.edit}
                userDescription=""
                changePassword={this.state.changePassword ? this.state.changePassword : ""}
                
                selectManager={ this.openSearch }
                managerProfilePicture={ this.state.selectedManager.managerProfilePicture }
                managerFullName={ this.state.selectedManager.fullName }
                deleteSelectedManager={ this.deleteSelectedManager.bind(this) }
                selectLineManager = { this.selectLineManager.bind(this) }
                managerSelected = { this.state.selectLineManager }
                />
                { this.state.searchPage && <div className="overlay" onClick={this.openSearch}/> }
                {managersList}
               
            </div>
        )
    }
}

ProfileSettingsContainer.contextTypes = {
    store: PropTypes.object
};

const mapStateToProps = state => {
    return{
        usersManager: state.currentUser.manager
    }
}

const mapDispatchToProps = dispatch => {
    return{
        addManagerToUserProfile: (pictureUrl, fullName, _id) => {dispatch({type: "ADD_USERS_MANAGER", manager: {pictureUrl, fullName, _id}})},
        addManagerToUserProfileSaga: (pictureUrl, fullName, _id) => {dispatch ({type: "ADD_USERS_MANAGER_SAGA", managerSaga: {pictureUrl, fullName, _id}})}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileSettingsContainer)
