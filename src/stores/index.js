const Reflux = require('reflux');
const sortBy = require('lodash.sortby');
const DataService = require('mongodb-data-service');
const Actions = require('../actions');
const Connection = require('../models/connection');
const ConnectionCollection = require('../models/connection-collection');
const StateMixin = require('reflux-state-mixin');

const ConnectStore = Reflux.createStore({
  mixins: [StateMixin.store],

  listenables: Actions,

  init() {
    this.state.connections.fetch({
      success: () => {
        this.trigger(this.state);
      }
    });
  },

  resetConnection() {
    this.setState({ currentConnection: new Connection(), isValid: true });
  },

  onAuthenticationMethodChanged(method) {
    this.state.currentConnection.authentication = method;
    this.trigger(this.state);
  },

  onUsernameChanged(username) {
    this.state.currentConnection.mongodb_username = username;
    this.trigger(this.state);
  },

  onPasswordChanged(password) {
    this.state.currentConnection.mongodb_password = password;
    this.trigger(this.state);
  },

  onAuthSourceChanged(authSource) {
    this.state.currentConnection.mongodb_database_name = authSource;
    this.trigger(this.state);
  },

  onHostnameChanged(hostname) {
    this.state.currentConnection.hostname = hostname;
    if (hostname.match(/mongodb\.net/i)) {
      this.state.currentConnection.ssl = 'SYSTEMCA';
    }
    this.trigger(this.state);
  },

  onPortChanged(port) {
    this.state.currentConnection.port = port;
    this.trigger(this.state);
  },

  onReadPreferenceChanged(readPreference) {
    this.state.currentConnection.read_preference = readPreference;
    this.trigger(this.state);
  },

  onReplicaSetNameChanged(replicaSetName) {
    this.state.currentConnection.replica_set_name = replicaSetName;
    this.trigger(this.state);
  },

  onSSLMethodChanged(method) {
    this.state.currentConnection.ssl = method;
    this.trigger(this.state);
  },

  onSSLCAChanged(files) {
    this.state.currentConnection.ssl_ca = files;
    this.trigger(this.state);
  },

  onSSLCertificateChanged(files) {
    this.state.currentConnection.ssl_certificate = files;
    this.trigger(this.state);
  },

  onSSLPrivateKeyChanged(files) {
    this.state.currentConnection.ssl_private_key = files;
    this.trigger(this.state);
  },

  onSSLPrivateKeyPasswordChanged(password) {
    this.state.currentConnection.ssl_private_key_password = password;
    this.trigger(this.state);
  },

  onFavoriteNameChanged(name) {
    this.state.currentConnection.name = name;
    this.trigger(this.state);
  },

  onCreateFavorite() {
    const connection = this.state.currentConnection;
    connection.is_favorite = true;
    this._addConnection(connection);
  },

  onCreateRecent() {
    const connection = this.state.currentConnection;
    connection.last_used = new Date();
    this._pruneRecents(() => {
      this._addConnection(connection);
    });
  },

  onConnectionSelected(connection) {
    this.setState({ currentConnection: connection });
  },

  onDeleteConnection(connection) {
    connection.destroy({
      success: () => {
        this.state.connections.remove(connection._id);
        this.state.currentConnection = new Connection();
        this.trigger(this.state);
      }
    });
  },

  onSSHTunnelChanged(tunnel) {
    this.state.currentConnection.ssh_tunnel = tunnel;
    this.trigger(this.state);
  },

  onSSHTunnelPasswordChanged(password) {
    this.state.currentConnection.ssh_tunnel_password = password;
    this.trigger(this.state);
  },

  onSSHTunnelPassphraseChanged(passphrase) {
    this.state.currentConnection.ssh_tunnel_passphrase = passphrase;
    this.trigger(this.state);
  },

  onSSHTunnelHostnameChanged(hostname) {
    this.state.currentConnection.ssh_tunnel_hostname = hostname;
    this.trigger(this.state);
  },

  onSSHTunnelUsernameChanged(username) {
    this.state.currentConnection.ssh_tunnel_username = username;
    this.trigger(this.state);
  },

  onSSHTunnelPortChanged(port) {
    this.state.currentConnection.ssh_tunnel_port = port;
    this.trigger(this.state);
  },

  onSSHTunnelIdentityFileChanged(file) {
    this.state.currentConnection.ssh_tunnel_identity_file = file;
    this.trigger(this.state);
  },

  onSaveConnection(connection) {
    connection.save({
      success: () => {
        this.trigger(this.state);
      }
    });
  },

  onConnect() {
    const connection = this.state.currentConnection;
    if (!connection.isValid()) {
      this.setState({ isValid: false });
    } else {
      const dataService = new DataService(this.state.currentConnection);
      dataService.connect((err, ds) => {
        if (err) {
          return this.setState({ isValid: false, errorMessage: err.message });
        }
        global.hadronApp.appRegistry.onConnected(err, ds);
        this.setState({ isValid: true, isConnected: true, errorMessage: null });
      });
    }
  },

  getInitialState() {
    return {
      currentConnection: new Connection(),
      connections: new ConnectionCollection(),
      isValid: true,
      isConnected: false,
      errorMessage: null
    };
  },

  _addConnection(connection) {
    this.state.connections.add(connection);
    connection.save();
    this.trigger(this.state);
  },

  _pruneRecents(done) {
    const recents = this.state.connections.filter((connection) => {
      return !connection.is_favorite;
    });
    if (recents.length === 10) {
      const sortedRecents = sortBy(recents, 'last_used');
      const toDelete = sortedRecents[9];
      toDelete.destroy({
        success: () => {
          this.state.connections.remove(toDelete._id);
          return done();
        }
      });
    }
    done();
  }
});

module.exports = ConnectStore;
