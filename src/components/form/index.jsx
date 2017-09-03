const React = require('react');
const PropTypes = require('prop-types');
const FormGroup = require('./form-group');
const HostInput = require('./host-input');
const PortInput = require('./port-input');
const Authentication = require('./authentication-section');
const ReplicaSetNameInput = require('./replica-set-name-input');
const ReadPreferenceSelect = require('./read-preference-select');
const SSL = require('./ssl-section');
const SSHTunnel = require('./ssh-tunnel-section');
const FormActions = require('./favorite-section');

class ConnectForm extends React.Component {

  render() {
    return (
      <form data-test-id="connect-form">
        <FormGroup id="host-port" separator>
          <HostInput {...this.props} />
          <PortInput {...this.props} />
        </FormGroup>
        <Authentication {...this.props} />
        <FormGroup id="read-preference" separator>
          <ReplicaSetNameInput {...this.props} />
          <ReadPreferenceSelect {...this.props} />
        </FormGroup>
        <SSL {...this.props} />
        <SSHTunnel {...this.props} />
        <FormActions {...this.props } />
      </form>
    );
  }
}

ConnectForm.propTypes = {
  currentConnection: PropTypes.object.isRequired
};

ConnectForm.displayName = 'ConnectForm';

module.exports = ConnectForm;
