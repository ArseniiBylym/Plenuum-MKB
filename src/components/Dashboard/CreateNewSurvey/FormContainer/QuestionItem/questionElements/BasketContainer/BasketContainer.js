import React, { PureComponent } from 'react';

class BasketContainer extends PureComponent {

    render() {

        let classForBasket = 'BasketContainer__item basket';
        if (this.props.length > 1) {
            classForBasket += ' active'
        }

        let classForDownArrow = 'BasketContainer__item arrow-down'
        if (this.props.length > 1 && this.props.index != this.props.length - 1) {
            classForDownArrow += ' active'
        }

        let classForUpArrow = 'BasketContainer__item arrow-up'
        if (this.props.length > 1 && this.props.index != 0) {
            classForUpArrow += ' active'
        }

        const index = this.props.index

        return (
            <div className='BasketContainer'>
                <div className={classForBasket} onClick={() => this.props.delFunc(index)}></div>
                <div className={classForUpArrow} onClick={() => this.props.goToPrev(index)}></div>
                <div className={classForDownArrow} onClick={() => this.props.goToNext(index)}></div>
            </div>
        )
    }

}

export default BasketContainer