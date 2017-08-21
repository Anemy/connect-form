const React = require('react');
const PropTypes = require('prop-types');
const Actions = require('../actions');
const FormFileInput = require('./form-file-input');
const FormItemInput = require('./form-item-input');

class SSLServerClientValidation extends React.Component {

  onCertificateAuthorityChanged(paths) {
    Actions.onSSLCAChanged(paths);
  }

  onClientCertificateChanged(paths) {
    Actions.onSSLCertificateChanged(paths);
  }

  onClientPrivateKeyChanged(paths) {
    Actions.onSSLPrivateKeyChanged(paths);
  }

  onClientKeyPasswordChanged(evt) {
    Actions.onSSLPrivateKeyPasswordChanged(evt.target.value);
  }

  render() {
    return (
      <div id="ssl-server-client-validation" className="form-group">
        <FormFileInput
          label="Certificate Authority"
          changeHandler={this.onCertificateAuthorityChanged.bind(this)}
          values={this.props.currentConnection.ssl_ca}
          multi />
        <FormFileInput
          label="Client Certificate"
          changeHandler={this.onClientCertificateChanged.bind(this)}
          values={this.props.currentConnection.ssl_certificate} />
        <FormFileInput
          label="Client Private Key"
          changeHandler={this.onClientPrivateKeyChanged.bind(this)}
          values={this.props.currentConnection.ssl_private_key} />
        <FormItemInput
          label="Client Key Password"
          name="client_key_password"
          changeHandler={this.onClientKeyPasswordChanged.bind(this)}
          value={this.props.currentConnection.ssl_private_key_password} />
      </div>
    );
  }
}

SSLServerClientValidation.propTypes = {
  currentConnection: PropTypes.object.isRequired
};

SSLServerClientValidation.displayName = 'SSLServerClientValidation';

module.exports = SSLServerClientValidation;
