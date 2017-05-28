import React, { Component } from 'react';
import PropTypes from 'prop-types'
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';


class Configuration extends Component {
  static propTypes = {
    onClick: PropTypes.func,
  }

  constructor(props) {
    super()
    this.state = {
      config: props.initialConfig
    }
  }

  handleSubmit() {
    this.props.onClick(this.state.config)
  }

  handleCancel() {
    this.props.onClick(null)
  }

  handleChange(part) {
    const config = Object.assign({}, this.state.config, part)
    this.setState({ config })
  }

  render() {
    const {config} = this.state
    const actions = [
      <RaisedButton
        label="Cancel"
        onClick={() => this.handleCancel()}
      />,
      <RaisedButton
        label="Submit"
        primary={true}
        onClick={() => this.handleSubmit()} />
    ]
    return (
      <Dialog
        title="Configuration"
        actions={actions}
        modal={true}
        autoScrollBodyContent={true}
        open={this.props.open}>
        <TextField
            hintText="ex. 20"
            floatingLabelText="Number Of Items"
            floatingLabelFixed={true}
            defaultValue={config.numberOfItems}
            onChange={(e, value) => this.handleChange(
              {numberOfItems: value})}
          /><br />
        <TextField
            hintText="ex. 30"
            floatingLabelText="Population Size"
            floatingLabelFixed={true}
            defaultValue={config.populationSize}
            onChange={(e, value) => this.handleChange(
              {populationSize: value})}
          /><br />
        <TextField
            hintText="ex. 0.3"
            floatingLabelText="Cross Over Mixing Ratio"
            floatingLabelFixed={true}
            defaultValue={config.crossMixingRatio}
            onChange={(e, value) => this.handleChange(
              {crossMixingRatio: value})}
          /><br />
        <TextField
            hintText="ex. 0.3"
            floatingLabelText="Mutation Ratio"
            floatingLabelFixed={true}
            defaultValue={config.mutationRatio}
            onChange={(e, value) => this.handleChange(
              {mutationRatio: value})}
          /><br />
      </Dialog>
    )
  }
}

export default Configuration

