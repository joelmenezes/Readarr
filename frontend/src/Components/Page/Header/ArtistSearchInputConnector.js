import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { createSelector } from 'reselect';
import createAllArtistSelector from 'Store/Selectors/createAllAuthorsSelector';
import createDeepEqualSelector from 'Store/Selectors/createDeepEqualSelector';
import createTagsSelector from 'Store/Selectors/createTagsSelector';
import ArtistSearchInput from './ArtistSearchInput';

function createCleanArtistSelector() {
  return createSelector(
    createAllArtistSelector(),
    createTagsSelector(),
    (allArtists, allTags) => {
      return allArtists.map((author) => {
        const {
          authorName,
          sortName,
          images,
          titleSlug,
          tags = []
        } = author;

        return {
          authorName,
          sortName,
          titleSlug,
          images,
          tags: tags.reduce((acc, id) => {
            const matchingTag = allTags.find((tag) => tag.id === id);

            if (matchingTag) {
              acc.push(matchingTag);
            }

            return acc;
          }, [])
        };
      });
    }
  );
}

function createMapStateToProps() {
  return createDeepEqualSelector(
    createCleanArtistSelector(),
    (artists) => {
      return {
        artists
      };
    }
  );
}

function createMapDispatchToProps(dispatch, props) {
  return {
    onGoToArtist(titleSlug) {
      dispatch(push(`${window.Readarr.urlBase}/author/${titleSlug}`));
    },

    onGoToAddNewArtist(query) {
      dispatch(push(`${window.Readarr.urlBase}/add/search?term=${encodeURIComponent(query)}`));
    }
  };
}

export default connect(createMapStateToProps, createMapDispatchToProps)(ArtistSearchInput);
