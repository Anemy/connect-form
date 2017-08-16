const find = require('lodash.find');
const React = require('react');
const PropTypes = require('prop-types');
const Actions = require('../actions');
const FormItemSelect = require('./form-item-select');

class FormAuthentication extends React.Component {

  constructor(props) {
    super(props);
    this.setupAuthenticationRoles();
    this.state = { authenticationMethod: 'NONE' };
  }

  onAuthMethodChanged(evt) {
    Actions.onAuthenticationMethodChanged(evt.target.value);
    this.setState({ authenticationMethod: evt.target.value });
  }

  setupAuthenticationRoles() {
    this.roles = global.hadronApp.appRegistry.getRole('Connect.AuthenticationMethod');
    this.selectOptions = this.roles.map((role) => {
      return role.selectOption;
    });
  }

  renderAuthenticationMethod() {
    const connection = this.props.currentConnection;
    const currentRole = find(this.roles, (role) => {
      return role.name === this.state.authenticationMethod;
    });
    if (currentRole.component) {
      return (<currentRole.component currentConnection={connection} />);
    }
  }

  render() {
    return (
      <div id="authentication" className="form-group">
        <FormItemSelect
          label="Authentication"
          name="authentication"
          options={this.selectOptions}
          changeHandler={this.onAuthMethodChanged.bind(this)} />
        {this.renderAuthenticationMethod()}
      </div>
    );
  }
}

FormAuthentication.propTypes = {
  currentConnection: PropTypes.object.isRequired
};

FormAuthentication.displayName = 'FormAuthentication';

module.exports = FormAuthentication;
