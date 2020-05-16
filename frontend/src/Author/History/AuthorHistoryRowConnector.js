import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { fetchHistory, markAsFailed } from 'Store/Actions/historyActions';
import createAuthorSelector from 'Store/Selectors/createAuthorSelector';
import createAlbumSelector from 'Store/Selectors/createBookSelector';
import AuthorHistoryRow from './AuthorHistoryRow';

function createMapStateToProps() {
  return createSelector(
    createAuthorSelector(),
    createAlbumSelector(),
    (author, album) => {
      return {
        author,
        album
      };
    }
  );
}

const mapDispatchToProps = {
  fetchHistory,
  markAsFailed
};

export default connect(createMapStateToProps, mapDispatchToProps)(AuthorHistoryRow);
