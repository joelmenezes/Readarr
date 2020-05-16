import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { isCommandExecuting } from 'Utilities/Command';
import createAuthorSelector from 'Store/Selectors/createAuthorSelector';
import createCommandsSelector from 'Store/Selectors/createCommandsSelector';
import { executeCommand } from 'Store/Actions/commandActions';
import * as commandNames from 'Commands/commandNames';
import AlbumSearchCell from './AlbumSearchCell';

function createMapStateToProps() {
  return createSelector(
    (state, { bookId }) => bookId,
    createAuthorSelector(),
    createCommandsSelector(),
    (bookId, author, commands) => {
      const isSearching = commands.some((command) => {
        const albumSearch = command.name === commandNames.BOOK_SEARCH;

        if (!albumSearch) {
          return false;
        }

        return (
          isCommandExecuting(command) &&
          command.body.bookIds.indexOf(bookId) > -1
        );
      });

      return {
        artistMonitored: author.monitored,
        artistType: author.artistType,
        isSearching
      };
    }
  );
}

function createMapDispatchToProps(dispatch, props) {
  return {
    onSearchPress(name, path) {
      dispatch(executeCommand({
        name: commandNames.BOOK_SEARCH,
        bookIds: [props.bookId]
      }));
    }
  };
}

export default connect(createMapStateToProps, createMapDispatchToProps)(AlbumSearchCell);
