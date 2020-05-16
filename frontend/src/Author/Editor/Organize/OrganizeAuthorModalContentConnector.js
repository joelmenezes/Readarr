import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import createAllArtistSelector from 'Store/Selectors/createAllAuthorsSelector';
import { executeCommand } from 'Store/Actions/commandActions';
import * as commandNames from 'Commands/commandNames';
import OrganizeAuthorModalContent from './OrganizeAuthorModalContent';

function createMapStateToProps() {
  return createSelector(
    (state, { authorIds }) => authorIds,
    createAllArtistSelector(),
    (authorIds, allArtists) => {
      const author = _.intersectionWith(allArtists, authorIds, (s, id) => {
        return s.id === id;
      });

      const sortedArtist = _.orderBy(author, 'sortName');
      const artistNames = _.map(sortedArtist, 'authorName');

      return {
        artistNames
      };
    }
  );
}

const mapDispatchToProps = {
  executeCommand
};

class OrganizeAuthorModalContentConnector extends Component {

  //
  // Listeners

  onOrganizeArtistPress = () => {
    this.props.executeCommand({
      name: commandNames.RENAME_AUTHOR,
      authorIds: this.props.authorIds
    });

    this.props.onModalClose(true);
  }

  //
  // Render

  render(props) {
    return (
      <OrganizeAuthorModalContent
        {...this.props}
        onOrganizeArtistPress={this.onOrganizeArtistPress}
      />
    );
  }
}

OrganizeAuthorModalContentConnector.propTypes = {
  authorIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  onModalClose: PropTypes.func.isRequired,
  executeCommand: PropTypes.func.isRequired
};

export default connect(createMapStateToProps, mapDispatchToProps)(OrganizeAuthorModalContentConnector);
