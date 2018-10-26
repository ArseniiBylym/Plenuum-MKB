import React from 'react';
import './ErrorNotification.css';

function ErrorNotification(props) {

        return(
            <div 
                className={!props.isShow ? 'ErrorNotification' : 'ErrorNotification visible-error-notification'} 
                onAnimationEnd={props.endAnimationHandler}
            >
                Kérjük javítsd ki a hibákat
            </div>
        )
}

export default ErrorNotification