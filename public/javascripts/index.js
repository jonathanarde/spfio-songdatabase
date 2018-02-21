'use strict';

import * as search from './search';
import * as playlist from './playlist';
import library from './library';
import * as song from './song';
import discover from './discover';
import m from 'mithril';
import prop from 'mithril/stream';
import * as bootstrap from 'bootstrap';

const Application = {
  search,
  playlist,
  library,
  song
};

// HACK expose this to the window
window.glorifyApp = Application;

let loadHandlers = [];
document.addEventListener('DOMContentLoaded', function() {
  loadHandlers.forEach(h => {
    h();
  });
});

glorifyApp.initSearchBoxHome = function(elemId) {
  if (!elemId) {
    elemId = 'searchBox';
  }
  loadHandlers.push(() => {
    m.mount(document.getElementById(elemId), search.searchBoxHome);
  });
};

glorifyApp.initSearchPage = function(opts) {
  loadHandlers.push(() => {
    search.searchPage.init(document.getElementById('songlistTable'), opts);
  });
};

glorifyApp.initPlaylistTable = function() {
  loadHandlers.push(() => {
    m.mount(document.getElementById('playlist'), playlist.playlistTable);
    m.mount(
      document.getElementById('addNewPlaylistButton'),
      playlist.addNewPlaylist
    );
  });
};

glorifyApp.initLibraryTable = function() {
  loadHandlers.push(() => {
    m.mount(document.getElementById('library'), library.libraryTable);
  });
};

glorifyApp.initPlaylistClicked = function(s, p) {
  loadHandlers.push(() => {
    let songs = prop(s);
    let playlistName = prop(p);
    m.mount(document.getElementById('playlistClicked'), {
      view: () => {
        return m(playlistClicked, {
          songs,
          playlistName
        });
      }
    });
  });
};

glorifyApp.initSongClicked = function(ls, rs, rse) {
  loadHandlers.push(() => {
    song.songClicked.init(ls, rs, rse);
  });
};

glorifyApp.initDiscover = function(opts) {
  loadHandlers.push(() => {
    discover.init(opts);
  });
};

glorifyApp.initSongForm = function(elemId, obj) {
  loadHandlers.push(() => {
    let form = song.songForm(obj);
    m.mount(document.getElementById(elemId), form);
  });
};
