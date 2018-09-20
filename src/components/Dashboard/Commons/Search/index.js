import React, {Component} from 'react';
import Search from './Search.js';

class SearchContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {query:undefined};
    this.onTextChange = this.onTextChange.bind(this);
  }

  onTextChange(e) {
    const text = e.target.value;
    this.setState({query: text});
    this.props.searchFor(e);
  }

  render() {
    let layoutClass = this.props.customClass || 'main-container';
    if (this.state.query && this.state.query.length > 0) {
      layoutClass += ' typing';
    }
    return(
      <Search
        searchFor={this.onTextChange}
        defaultValue={this.props.defaultValue}
        layout={layoutClass}
        image={this.props.image}
        />
    );
  }

}

export default SearchContainer;
