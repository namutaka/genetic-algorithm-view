import GeneticAlgorithm from '../services/GeneticAlgorithm';
import Knapsack from '../services/Knapsack';

import { GA_EVOLVE, SETUP_GA } from '../actions'

function reducer(state, action) {
  switch (action.type) {
    case GA_EVOLVE:
      return Object.assign({}, state, {
        population: state.ga.evolve(state.population),
        generation: state.generation + 1
      })

    case SETUP_GA:
      const config = action.config
      return Object.assign({}, state,
        createGaState(config))

    default:
      return state
  }
}

function createGaState(config) {
  const knapsack = new Knapsack(config.numberOfItems)
  knapsack.weightCapacity = Math.floor(
    knapsack.totalWeight() * 0.5)
  const ga = new GeneticAlgorithm(knapsack, config)

  return {
    population: ga.createPopulation(),
    generation: 1,
    ga: ga
  }
}

export default reducer
export { createGaState }

