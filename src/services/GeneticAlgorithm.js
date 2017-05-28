import { createArray, intRandom } from '../utils'
import deepcopy from 'deepcopy'


class GeneticAlgorithm {

  constructor(knapsack, opts) {
    this.populationSize = opts.populationSize
    this.crossMixingRatio = opts.crossMixingRatio
    this.mutationRatio = opts.mutationRatio
    this.knapsack = knapsack
  }

  createPopulation() {
    const population = {
      individuals: this.createInidividuals()
    }
    this.evaluate(population)
    this.sortIndividuals(population.individuals)
    return population
  }

  createInidividuals() {
    return createArray(this.populationSize, () =>
      this.createInidividual()
    );
  }

  createInidividual() {
    return { genes: this.createGenes(), value: 0 }
  }

  createGenes() {
    return createArray(this.knapsack.numberOfItems, () =>
      intRandom(0, 1)
    )
  }

  evaluate(population) {
    population.individuals.forEach((individual) => {
      individual.value = this.calcFitness(individual.genes)
    })
  }

  calcFitness(genes) {
    const { value, weight } = this.knapsack.calcWightAndValue(genes)

    if (this.knapsack.isOverWightCapacity(weight)) {
      return 0
    }

    return value
  }

  // order by value desc
  sortIndividuals(individuals) {
    individuals.sort((l,r) =>
      - (l.value - r.value)
    )
  }

  evolve(oldPopulation) {
    const bestIndividual = oldPopulation.individuals[0]
    const population =  Object.assign({}, {
      ...oldPopulation,
      individuals: this.doSelection(oldPopulation.individuals)
    })

    this.doCrossover(population.individuals)
    this.doMutation(population.individuals)
    this.evaluate(population)

    population.individuals[0] = bestIndividual

    this.sortIndividuals(population.individuals)
    return population
  }

  // createNewGeneration
  doSelection(individuals) {
    this.sortIndividuals(individuals)

    const accumulated = []
    const sumValue = individuals.reduce((sum, individual) => {
      sum = sum + individual.value
      accumulated.push([sum, individual])
      return sum
    }, 0)

    const newIndividuals = createArray(this.populationSize, () => {
      const r = intRandom(0, sumValue)
      const acc = accumulated.find((i) => {
        return r <= i[0] // accumulated value
      })
      const selectedIndividual = acc[1]
      return { genes: deepcopy(selectedIndividual.genes), value: 0 }
    })

    return newIndividuals
  }

  // crossover
  doCrossover(individuals) {
    // suffle
    individuals.sort((l,r) => Math.random())

    for (var i = 0; i < individuals.length; i += 2) {
      this.crossGenes(
        individuals[i].genes,
        individuals[i + 1].genes
      )
    }
  }

  crossGenes(genes1, genes2) {
    for (var i = 0; i < genes1.length; i++) {
      if (Math.random() < this.crossMixingRatio) {
        [ genes1[i], genes2[i] ] = [ genes2[i], genes1[i] ]
      }
    }
  }

  // mutation
  doMutation(individuals) {
    for (var i = 0; i < individuals.length; i += 2) {
      this.mutateGenes(
        individuals[i].genes
      )
    }
  }

  mutateGenes(genes) {
    for (var i = 0; i < genes.length; i++) {
      if (Math.random() < this.mutationRatio) {
        genes[i] = 1 - genes[i]
      }
    }
  }

}

export default GeneticAlgorithm

