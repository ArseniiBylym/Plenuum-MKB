import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Api from '../../../../lib/api.js';
import SetPicture, {SetPictureState, setPictureSuccess} from './SetPicture.js';
import {spinner} from '../../../Commons/Spinner/spinner.js';

class SetPictureContainer extends Component {

    constructor(props, context){
        super(props, context);

        this.store = context.store;
        this.state = {
            uploadedImage: undefined,
            isSending: undefined,
            setted: undefined
        };

        this.onDrop = this.onDrop.bind(this);
        this.submitPicture = this.submitPicture.bind(this);
    }

    submitPicture(){
        const { uploadedImage } = this.state;
        let data = new FormData(); //Form data adds the multipart
        data.append('avatar', uploadedImage);

        Api.setPicture(data)
            .then((response) => {
                this.store.dispatch({type: 'SET_USER_PICTURE', pictureUrl: response.avatar});
                this.setState({setted: true, isSending: false});
                this.props.updatePicture();
            })
            .catch((error) => {
                this.setState({setted: false, isSending: false});
                this.props.updatePicture();
            });
        this.setState({isSending: true});
    }

    //onDrop(images){
    onDrop(acceptedFiles, rejectedFiles){
        if (acceptedFiles.length > 0){
            this.setState({uploadedImage: acceptedFiles[0]})
        }
    }

    createComponent(image){
        if (image) {
            return {
                image: <img alt='' src={image.preview}/>,
                submitPicture: this.submitPicture,
                buttonClass: 'dropzone-button-enable'
            }
        }else{
            return {
                image: undefined,
                submitPicture: undefined,
                buttonClass: 'dropzone-button-disabled'
            }
        }
    }

    render() {
        const {uploadedImage, isSending, setted} = this.state;
        if (isSending) {
            const indicator = spinner({style: {height: '100%'}});
            return SetPictureState({component: indicator});
        } else if (setted) {
            const component = setPictureSuccess();
            return SetPictureState({component, handlePictureChange: this.props.handlePictureChange});
        } else {
            const {submitPicture, buttonClass, image} = this.createComponent(uploadedImage);
            return SetPicture({
                handlePictureChange: this.props.handlePictureChange,
                onDrop: this.onDrop,
                submitPicture,
                buttonClass,
                image
            });
        }
    }
}

SetPictureContainer.contextTypes = {
    store: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired
};

export default SetPictureContainer;
