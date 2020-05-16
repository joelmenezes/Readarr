import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Link from 'Components/Link/Link';
import styles from './SelectArtistRow.css';

class SelectArtistRow extends Component {

  //
  // Listeners

  onPress = () => {
    this.props.onArtistSelect(this.props.id);
  }

  //
  // Render

  render() {
    return (
      <Link
        className={styles.author}
        component="div"
        onPress={this.onPress}
      >
        {this.props.authorName}
      </Link>
    );
  }
}

SelectArtistRow.propTypes = {
  id: PropTypes.number.isRequired,
  authorName: PropTypes.string.isRequired,
  onArtistSelect: PropTypes.func.isRequired
};

export default SelectArtistRow;
