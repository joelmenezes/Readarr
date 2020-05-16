import _ from 'lodash';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import createAllArtistSelector from 'Store/Selectors/createAllAuthorsSelector';
import { bulkDeleteAuthor } from 'Store/Actions/authorEditorActions';
import DeleteAuthorModalContent from './DeleteAuthorModalContent';

function createMapStateToProps() {
  return createSelector(
    (state, { authorIds }) => authorIds,
    createAllArtistSelector(),
    (authorIds, allArtists) => {
      const selectedArtist = _.intersectionWith(allArtists, authorIds, (s, id) => {
        return s.id === id;
      });

      const sortedArtist = _.orderBy(selectedArtist, 'sortName');
      const author = _.map(sortedArtist, (s) => {
        return {
          authorName: s.authorName,
          path: s.path
        };
      });

      return {
        author
      };
    }
  );
}

function createMapDispatchToProps(dispatch, props) {
  return {
    onDeleteSelectedPress(deleteFiles) {
      dispatch(bulkDeleteAuthor({
        authorIds: props.authorIds,
        deleteFiles
      }));

      props.onModalClose();
    }
  };
}

export default connect(createMapStateToProps, createMapDispatchToProps)(DeleteAuthorModalContent);
