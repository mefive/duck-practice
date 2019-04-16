import React from 'react';
import * as PropTypes from 'prop-types';
import omit from 'lodash/omit';
import pick from 'lodash/pick';

class Form extends React.PureComponent {
  static propTypes = {
    dataSource: PropTypes.shape({}),
    onChange: PropTypes.func.isRequired,
    children: PropTypes.func.isRequired,
    onError: PropTypes.func,
  };

  static defaultProps = {
    dataSource: {},
    onError: () => {},
  };

  state = {
    errors: {},
  };

  getFieldDecorator = (name, options = {}) => (item) => {
    this.rules[name] = options.rules;

    return React.cloneElement(item, {
      ...item.props,
      value: this.props.dataSource[name],
      onChange: (e) => {
        let value = e;

        if (typeof e === 'object' && e.target) {
          ({ value } = e.target);
        }

        if (typeof item.props.format === 'function') {
          value = item.props.format(value);
        }

        this.props.onChange(name, value);

        this.clearError(name);
      },
    });
  };

  clearError = (field) => {
    let fields;
    let { errors } = this.state;

    if (field == null) {
      fields = Object.keys(this.rules);
    } else if (typeof field === 'string') {
      fields = [field];
    } else {
      fields = field;
    }

    errors = omit(errors, fields);

    this.setState({ errors });
  };

  validate = (field) => {
    let { errors } = this.state;

    errors = pick(errors, Object.keys(this.rules));

    let fields;

    if (field == null) {
      fields = Object.keys(this.rules);
    } else if (typeof field === 'string') {
      fields = [field];
    } else {
      fields = field;
    }

    const addToError = (name, message) => {
      if (name in this.state.errors) {
        delete errors[name];
      }

      if (name in errors) {
        errors[name] = `${errors[name]}, ${message}`;
      } else {
        errors[name] = message;
      }
    };

    fields.forEach((name) => {
      const rules = this.rules[name];

      if (rules) {
        let value = this.props.dataSource[name];

        for (let i = 0; i < rules.length; i += 1) {
          const rule = rules[i];

          if (value == null || value === '' || (typeof value === 'string' && value.trim() === '')) {
            if (rule.required) {
              errors[name] = rule.message || 'required';
              break;
            }
          }

          value = value || '';

          if (typeof rule.validator === 'function') {
            if (!rule.validator(value)) {
              addToError(name, rule.message || 'not valid');
            }
          } else if (rule.regex != null && !rule.regex.test(value)) {
            addToError(name, rule.message || 'not valid');
          }
        }
      }
    });

    const hasError = Object.keys(errors).length > 0;

    this.setState({ errors }, () => {
      if (hasError) {
        this.props.onError(errors);
      }
    });

    return !hasError;
  };

  render() {
    const { getFieldDecorator, validate } = this;
    const { errors } = this.state;

    this.rules = {};

    return this.props.children({
      getFieldDecorator,
      validate,
      errors,
    });
  }
}

export default Form;
