const React = require('react');
const PropTypes = require('prop-types');

class FormGroup extends React.Component {

  getClassName() {
    let className = 'form-group';
    if (this.props.separator) {
      className = `${className} form-group-separator`;
    }
    return className;
  }

  render() {
    return (
      <div id={this.props.id} className={this.getClassName()}>
        {this.props.children}
      </div>
    );
  }
}

FormGroup.propTypes = {
  id: PropTypes.string,
  separator: PropTypes.bool
};

FormGroup.displayName = 'FormGroup';

module.exports = FormGroup;
