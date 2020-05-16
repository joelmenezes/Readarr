import { createSelector, createSelectorCreator, defaultMemoize } from 'reselect';
import createClientSideCollectionSelector from './createClientSideCollectionSelector';
import hasDifferentItemsOrOrder from 'Utilities/Object/hasDifferentItemsOrOrder';

function createUnoptimizedSelector(uiSection) {
  return createSelector(
    createClientSideCollectionSelector('authors', uiSection),
    (authors) => {
      const items = authors.items.map((s) => {
        const {
          id,
          sortName
        } = s;

        return {
          id,
          sortName
        };
      });

      return {
        ...authors,
        items
      };
    }
  );
}

function artistListEqual(a, b) {
  return hasDifferentItemsOrOrder(a, b);
}

const createArtistEqualSelector = createSelectorCreator(
  defaultMemoize,
  artistListEqual
);

function createAuthorClientSideCollectionItemsSelector(uiSection) {
  return createArtistEqualSelector(
    createUnoptimizedSelector(uiSection),
    (author) => author
  );
}

export default createAuthorClientSideCollectionItemsSelector;
