const { expect } = require('chai');
const sinon = require('sinon');
const AppRegistry = require('hadron-app-registry');
const Connection = require('../../../lib/models/connection');
const Actions = require('../../../lib/actions');
const IndexStore = require('../../../lib/stores');

describe('IndexStore', function() {
  this.timeout(60000);

  afterEach(() => {
    IndexStore.state = IndexStore.getInitialState();
  });

  describe('#getInitialState', () => {
    it('initializes with an empty current connection', () => {
      expect(IndexStore.state.currentConnection.username).to.equal('');
    });
  });

  describe('#resetConnection', () => {
    context('when the form is currently valid', () => {
      before(() => {
        IndexStore.state.currentConnection.mongodb_username = 'testing';
      });

      it('updates the hostname in the current connection model', (done) => {
        const unsubscribe = IndexStore.listen((state) => {
          unsubscribe();
          expect(state.currentConnection.mongodb_username).to.equal(undefined);
          done();
        });
        Actions.resetConnection();
      });
    });

    context('when the form is not valid', () => {
      before(() => {
        IndexStore.state.isValid = false;
      });

      it('resets the form to valid', (done) => {
        const unsubscribe = IndexStore.listen((state) => {
          unsubscribe();
          expect(state.isValid).to.equal(true);
          done();
        });
        Actions.resetConnection();
      });
    });
  });

  describe('#onHostnameChanged', () => {
    it('updates the hostname in the current connection model', (done) => {
      const unsubscribe = IndexStore.listen((state) => {
        unsubscribe();
        expect(state.currentConnection.hostname).to.equal('myserver');
        done();
      });
      Actions.onHostnameChanged('myserver');
    });

    context('when the hostname contains mongodb.net', () => {
      it('updates the hostname and sets the systemca ssl option', (done) => {
        const unsubscribe = IndexStore.listen((state) => {
          unsubscribe();
          expect(state.currentConnection.hostname).to.equal('mongodb.net');
          expect(state.currentConnection.ssl).to.equal('SYSTEMCA');
          done();
        });
        Actions.onHostnameChanged('mongodb.net');
      });
    });
  });

  describe('#onPortChanged', () => {
    it('updates the port in the current connection model', (done) => {
      const unsubscribe = IndexStore.listen((state) => {
        unsubscribe();
        expect(state.currentConnection.port).to.equal('27018');
        done();
      });
      Actions.onPortChanged('27018');
    });
  });

  describe('#onReplicaSetNameChanged', () => {
    it('updates the replica set name in the current connection model', (done) => {
      const unsubscribe = IndexStore.listen((state) => {
        unsubscribe();
        expect(state.currentConnection.replica_set_name).to.equal('myreplicaset');
        done();
      });
      Actions.onReplicaSetNameChanged('myreplicaset');
    });
  });

  describe('#onReadPreferenceChanged', () => {
    it('updates the read preference in the current connection model', (done) => {
      const unsubscribe = IndexStore.listen((state) => {
        unsubscribe();
        expect(state.currentConnection.read_preference).to.equal('primaryPreferred');
        done();
      });
      Actions.onReadPreferenceChanged('primaryPreferred');
    });
  });

  describe('#onSSLMethodChanged', () => {
    it('updates the ssl method in the current connection model', (done) => {
      const unsubscribe = IndexStore.listen((state) => {
        unsubscribe();
        expect(state.currentConnection.ssl).to.equal('SYSTEMCA');
        done();
      });
      Actions.onSSLMethodChanged('SYSTEMCA');
    });
  });

  describe('#onAuthenticationMethodChanged', () => {
    it('updates the authentication method in the current connection model', (done) => {
      const unsubscribe = IndexStore.listen((state) => {
        unsubscribe();
        expect(state.currentConnection.authentication).to.equal('MONGODB');
        done();
      });
      Actions.onAuthenticationMethodChanged('MONGODB');
    });
  });

  describe('#onUsernameChanged', () => {
    it('updates the username in the current connection model', (done) => {
      const unsubscribe = IndexStore.listen((state) => {
        unsubscribe();
        expect(state.currentConnection.mongodb_username).to.equal('user');
        done();
      });
      Actions.onUsernameChanged('user');
    });
  });

  describe('#onPasswordChanged', () => {
    it('updates the password in the current connection model', (done) => {
      const unsubscribe = IndexStore.listen((state) => {
        unsubscribe();
        expect(state.currentConnection.mongodb_password).to.equal('pass');
        done();
      });
      Actions.onPasswordChanged('pass');
    });
  });

  describe('#onAuthSourceChanged', () => {
    it('updates the auth source in the current connection model', (done) => {
      const unsubscribe = IndexStore.listen((state) => {
        unsubscribe();
        expect(state.currentConnection.mongodb_database_name).to.equal('database');
        done();
      });
      Actions.onAuthSourceChanged('database');
    });
  });

  describe('#onSSLCAChanged', () => {
    it('updates the ssl ca field in the current connection model', (done) => {
      const unsubscribe = IndexStore.listen((state) => {
        unsubscribe();
        expect(state.currentConnection.ssl_ca).to.deep.equal(['file']);
        done();
      });
      Actions.onSSLCAChanged(['file']);
    });
  });

  describe('#onSSLCertificateChanged', () => {
    it('updates the ssl certificate field in the current connection model', (done) => {
      const unsubscribe = IndexStore.listen((state) => {
        unsubscribe();
        expect(state.currentConnection.ssl_certificate).to.deep.equal(['file']);
        done();
      });
      Actions.onSSLCertificateChanged(['file']);
    });
  });

  describe('#onSSLPrivateKeyChanged', () => {
    it('updates the ssl private key field in the current connection model', (done) => {
      const unsubscribe = IndexStore.listen((state) => {
        unsubscribe();
        expect(state.currentConnection.ssl_private_key).to.deep.equal(['file']);
        done();
      });
      Actions.onSSLPrivateKeyChanged(['file']);
    });
  });

  describe('#onSSLPrivateKeyPasswordChanged', () => {
    it('updates the ssl private key password field in the current connection model', (done) => {
      const unsubscribe = IndexStore.listen((state) => {
        unsubscribe();
        expect(state.currentConnection.ssl_private_key_password).to.equal('testing');
        done();
      });
      Actions.onSSLPrivateKeyPasswordChanged('testing');
    });
  });

  describe('#onSSHTunnelPortChanged', () => {
    it('updates the SSH Tunnel port in the current connection model', (done) => {
      const unsubscribe = IndexStore.listen((state) => {
        unsubscribe();
        expect(state.currentConnection.ssh_tunnel_port).to.equal('5000');
        done();
      });
      Actions.onSSHTunnelPortChanged('5000');
    });
  });

  describe('#onSSHTunnelUsernameChanged', () => {
    it('updates the SSH Tunnel username in the current connection model', (done) => {
      const unsubscribe = IndexStore.listen((state) => {
        unsubscribe();
        expect(state.currentConnection.ssh_tunnel_username).to.equal('mongodb');
        done();
      });
      Actions.onSSHTunnelUsernameChanged('mongodb');
    });
  });

  describe('#onSSHTunnelHostnameChanged', () => {
    it('updates the SSH Tunnel hostname in the current connection model', (done) => {
      const unsubscribe = IndexStore.listen((state) => {
        unsubscribe();
        expect(state.currentConnection.ssh_tunnel_hostname).to.equal('localhost');
        done();
      });
      Actions.onSSHTunnelHostnameChanged('localhost');
    });
  });

  describe('#onSSHTunnelPasswordChanged', () => {
    it('updates the SSH Tunnel password in the current connection model', (done) => {
      const unsubscribe = IndexStore.listen((state) => {
        unsubscribe();
        expect(state.currentConnection.ssh_tunnel_password).to.equal('mongodb');
        done();
      });
      Actions.onSSHTunnelPasswordChanged('mongodb');
    });
  });

  describe('#onSSHTunnelPassphraseChanged', () => {
    it('updates the SSH Tunnel passphrase in the current connection model', (done) => {
      const unsubscribe = IndexStore.listen((state) => {
        unsubscribe();
        expect(state.currentConnection.ssh_tunnel_passphrase).to.equal('mongodb');
        done();
      });
      Actions.onSSHTunnelPassphraseChanged('mongodb');
    });
  });

  describe('#onSSHTunnelIdentityFileChanged', () => {
    it('updates the SSH Tunnel identity file in the current connection model', (done) => {
      const unsubscribe = IndexStore.listen((state) => {
        unsubscribe();
        expect(state.currentConnection.ssh_tunnel_identity_file).to.deep.equal(['file']);
        done();
      });
      Actions.onSSHTunnelIdentityFileChanged(['file']);
    });
  });

  describe('#onConnectionSelected', () => {
    const connection = new Connection();

    it('sets the current connection in the store', (done) => {
      const unsubscribe = IndexStore.listen((state) => {
        unsubscribe();
        expect(state.currentConnection).to.equal(connection);
        done();
      });
      Actions.onConnectionSelected(connection);
    });
  });

  describe('#onFavoriteNameChanged', () => {
    it('updates the name on the current connection model', (done) => {
      const unsubscribe = IndexStore.listen((state) => {
        unsubscribe();
        expect(state.currentConnection.name).to.equal('myconnection');
        done();
      });
      Actions.onFavoriteNameChanged('myconnection');
    });
  });

  describe('#onCreateFavorite', () => {
    before(() => {
      IndexStore.state.currentConnection.name = 'myconnection';
    });

    after((done) => {
      const unsubscribe = IndexStore.listen(() => {
        unsubscribe();
        done();
      });
      IndexStore.onDeleteConnection(IndexStore.state.currentConnection);
    });

    it('creates a new favorite in the store', (done) => {
      const unsubscribe = IndexStore.listen((state) => {
        unsubscribe();
        expect(state.currentConnection.is_favorite).to.equal(true);
        expect(state.connections.length).to.equal(1);
        done();
      });
      Actions.onCreateFavorite();
    });
  });

  describe('#onCreateRecent', () => {
    context('when the list is under 10 recent connections', () => {
      after((done) => {
        const unsubscribe = IndexStore.listen(() => {
          unsubscribe();
          done();
        });
        IndexStore.onDeleteConnection(IndexStore.state.currentConnection);
      });

      it('creates a new recent in the store', (done) => {
        const unsubscribe = IndexStore.listen((state) => {
          unsubscribe();
          expect(state.currentConnection.is_favorite).to.equal(false);
          expect(state.currentConnection.last_used).to.not.equal(undefined);
          expect(state.connections.length).to.equal(1);
          done();
        });
        Actions.onCreateRecent();
      });
    });

    context('when the list has 10 recent connections', () => {
      before(() => {
        IndexStore.state.connections.add(new Connection({ is_favorite: true }));
        IndexStore.state.connections.add(new Connection({ last_used: new Date('2017-01-01') }));
        IndexStore.state.connections.add(new Connection({ last_used: new Date('2017-01-02') }));
        IndexStore.state.connections.add(new Connection({ last_used: new Date('2017-01-03') }));
        IndexStore.state.connections.add(new Connection({ last_used: new Date('2017-01-04') }));
        IndexStore.state.connections.add(new Connection({ last_used: new Date('2017-01-08') }));
        IndexStore.state.connections.add(new Connection({ last_used: new Date('2017-01-09') }));
        IndexStore.state.connections.add(new Connection({ last_used: new Date('2017-01-10') }));
        IndexStore.state.connections.add(new Connection({ last_used: new Date('2017-01-05') }));
        IndexStore.state.connections.add(new Connection({ last_used: new Date('2017-01-06') }));
        IndexStore.state.connections.add(new Connection({ last_used: new Date('2017-01-07') }));
      });

      after((done) => {
        const unsubscribe = IndexStore.listen(() => {
          unsubscribe();
          IndexStore.state.connections.reset();
          done();
        });
        IndexStore.onDeleteConnection(IndexStore.state.currentConnection);
      });

      it('limits the recent connections to 10', (done) => {
        const unsubscribe = IndexStore.listen((state) => {
          unsubscribe();
          expect(state.currentConnection.is_favorite).to.equal(false);
          expect(state.currentConnection.last_used).to.not.equal(undefined);
          expect(state.connections.length).to.equal(11);
          done();
        });
        Actions.onCreateRecent();
      });
    });
  });

  describe('#onConnect', () => {
    context('when the connection is valid', () => {
      const spy = sinon.spy();
      const store = {
        onConnected: (err, ds) => {
          if (!err) {
            spy(ds);
          }
        }
      };

      beforeEach(() => {
        global.hadronApp.appRegistry = new AppRegistry();
        global.hadronApp.appRegistry.registerStore('test', store);
        const connection = new Connection({ port: 27018 });
        IndexStore.state.currentConnection = connection;
      });

      after(() => {
        global.hadronApp.appRegistry = new AppRegistry();
      });

      it('connects and sets a valid state', (done) => {
        const unsubscribe = IndexStore.listen((state) => {
          unsubscribe();
          expect(state.isValid).to.equal(true);
          expect(spy.calledOnce).to.equal(true);
          done();
        });
        Actions.onConnect();
      });
    });

    context('when the connection fails', () => {
      before(() => {
        global.hadronApp.appRegistry = new AppRegistry();
        const connection = IndexStore.state.currentConnection;
        connection.hostname = '127.0.0.1';
        connection.port = 27020;
      });

      it('sets an invalid state with an error', (done) => {
        const unsubscribe = IndexStore.listen((state) => {
          unsubscribe();
          expect(state.isValid).to.equal(false);
          expect(state.errorMessage).to.equal('MongoDB not running on the provided host and port');
          done();
        });
        Actions.onConnect();
      });
    });

    context('when the connection is not valid', () => {
      before(() => {
        IndexStore.state.currentConnection.authentication = 'MONGODB';
      });

      after(() => {
        IndexStore.state.currentConnection.authentication = 'NONE';
      });

      it('sets an invalid state', (done) => {
        const unsubscribe = IndexStore.listen((state) => {
          unsubscribe();
          expect(state.isValid).to.equal(false);
          done();
        });
        Actions.onConnect();
      });
    });
  });
});
