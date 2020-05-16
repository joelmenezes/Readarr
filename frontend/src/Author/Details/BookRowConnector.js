/* eslint max-params: 0 */
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import createAuthorSelector from 'Store/Selectors/createAuthorSelector';
import createTrackFileSelector from 'Store/Selectors/createBookFileSelector';
import BookRow from './BookRow';

function createMapStateToProps() {
  return createSelector(
    createAuthorSelector(),
    createTrackFileSelector(),
    (author = {}, bookFile) => {
      return {
        artistMonitored: author.monitored,
        trackFilePath: bookFile ? bookFile.path : null
      };
    }
  );
}
export default connect(createMapStateToProps)(BookRow);
