import _ from 'lodash';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import createAllArtistSelector from 'Store/Selectors/createAllAuthorsSelector';
import createTagsSelector from 'Store/Selectors/createTagsSelector';
import TagsModalContent from './TagsModalContent';

function createMapStateToProps() {
  return createSelector(
    (state, { authorIds }) => authorIds,
    createAllArtistSelector(),
    createTagsSelector(),
    (authorIds, allArtists, tagList) => {
      const author = _.intersectionWith(allArtists, authorIds, (s, id) => {
        return s.id === id;
      });

      const artistTags = _.uniq(_.concat(..._.map(author, 'tags')));

      return {
        artistTags,
        tagList
      };
    }
  );
}

function createMapDispatchToProps(dispatch, props) {
  return {
    onAction() {
      // Do something
    }
  };
}

export default connect(createMapStateToProps, createMapDispatchToProps)(TagsModalContent);
