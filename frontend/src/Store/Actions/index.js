import * as app from './appActions';
import * as blacklist from './blacklistActions';
import * as calendar from './calendarActions';
import * as captcha from './captchaActions';
import * as customFilters from './customFilterActions';
import * as commands from './commandActions';
import * as albums from './bookActions';
import * as trackFiles from './bookFileActions';
import * as albumHistory from './bookHistoryActions';
import * as history from './historyActions';
import * as interactiveImportActions from './interactiveImportActions';
import * as oAuth from './oAuthActions';
import * as organizePreview from './organizePreviewActions';
import * as retagPreview from './retagPreviewActions';
import * as paths from './pathActions';
import * as providerOptions from './providerOptionActions';
import * as queue from './queueActions';
import * as releases from './releaseActions';
import * as albumStudio from './bookshelfActions';
import * as author from './authorActions';
import * as artistEditor from './authorEditorActions';
import * as artistHistory from './authorHistoryActions';
import * as artistIndex from './authorIndexActions';
import * as series from './seriesActions';
import * as search from './searchActions';
import * as settings from './settingsActions';
import * as system from './systemActions';
import * as tags from './tagActions';
import * as tracks from './trackActions';
import * as wanted from './wantedActions';

export default [
  app,
  blacklist,
  captcha,
  calendar,
  commands,
  customFilters,
  albums,
  trackFiles,
  albumHistory,
  history,
  interactiveImportActions,
  oAuth,
  organizePreview,
  retagPreview,
  paths,
  providerOptions,
  queue,
  releases,
  albumStudio,
  author,
  artistEditor,
  artistHistory,
  artistIndex,
  series,
  search,
  settings,
  system,
  tags,
  tracks,
  wanted
];
