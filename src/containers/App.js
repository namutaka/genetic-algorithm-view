import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import FontIcon from 'material-ui/FontIcon';

import Configuration from '../components/Configuration';
import IndividualList from '../components/IndividualList';
import KnapsackView from '../components/KnapsackView';
import { setupGa, evolve } from '../actions'

export const defaultConfig = {
  numberOfItems: 20,
  populationSize: 30,
  crossMixingRatio: 0.5,
  mutationRatio: 0.3
}

class App extends Component {
  static propTypes = {
    generation: PropTypes.number.isRequired,
    population: PropTypes.object.isRequired,
    ga: PropTypes.object.isRequired,
    evolve: PropTypes.func,
    setupGa: PropTypes.func,
  }

  constructor() {
    super()
    this.state = {
      mode: 'config',
      config: defaultConfig,
      selectedIndividual: null,
      selectedItem: null,
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  handleChangeToRun(config) {
    console.table(config)
    if (!!config) {
      this.setState({
        mode: 'run',
        config,
        selectedIndividual: null
      })
      this.props.setupGa(config)
    } else {
      this.setState({
        mode: 'run'
      })
    }
  }

  handleChangeToConfig() {
    this.setState({ mode: 'config' })
  }

  handleClickPlay() {
    const { evolve } = this.props
    if (!!this.timer) {
      clearInterval(this.timer)
      this.timer = null
    } else {
      this.timer = setInterval(() => evolve(), 500)
    }
    this.forceUpdate()
  }

  handleSelectIndividual(individual) {
    this.setState({
      selectedIndividual: individual
    })
  }

  handleSelectItem(item) {
    this.setState({
      selectedItem: item
    })
  }

  render() {
    const { population, generation, ga, evolve } = this.props
    const { selectedIndividual, selectedItem } = this.state
    return (
      <div className="height-auto">

        <Toolbar>
          <ToolbarGroup firstChild={true}>
            <RaisedButton
              icon={
                <FontIcon className="material-icons">
                  {!!this.timer ? "pause" : "play_arrow"}
                </FontIcon>
              }
              onClick={() => this.handleClickPlay()}/>
            <RaisedButton
              icon={
                <FontIcon className="material-icons">
                  skip_next
                </FontIcon>
              }
              style={{marginLeft: 0}}
              onClick={() => evolve()}/>
            <ToolbarTitle
              text={"Generation: " + generation }
              style={{marginLeft: "20px", width: '160px'}}
            />
          </ToolbarGroup>
          <ToolbarGroup>
            <RaisedButton
              label="RESET"
              onClick={() => this.handleChangeToConfig()}/>
          </ToolbarGroup>
        </Toolbar>

        <div className="clearfix" style={{height: 'calc(100% - 56px)'}}>
          <div className="height-auto" style={{width: '50%', float: 'left'}}>
            <KnapsackView knapsack={ga.knapsack}
              onSelect={(item) => this.handleSelectItem(item)}
              selection={selectedIndividual ? selectedIndividual.genes : null} />
          </div>
          <div className="height-auto" style={{width: '50%', float: 'left'}}>
            <IndividualList individuals={population.individuals}
              onSelect={(selected) => this.handleSelectIndividual(selected)}
              selectedGeneId={selectedItem && selectedItem.id} />
          </div>
        </div>
        <Configuration
          initialConfig={this.state.config}
          onClick={(c) => this.handleChangeToRun(c)}
          open={this.state.mode === 'config'}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  population: state.population,
  generation: state.generation,
  ga: state.ga
})

export default connect(mapStateToProps, {
  evolve,
  setupGa
})(App)

