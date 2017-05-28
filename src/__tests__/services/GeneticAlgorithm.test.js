import GeneticAlgorithm from '../../services/GeneticAlgorithm';
import Knapsack from '../../services/Knapsack';

export const config = {
  numberOfItems: 20,
  populationSize: 30,
  crossMixingRatio: 0.5,
  mutationRatio: 0.3
}

describe('GeneticAlgorithm', () => {
  const knapsack = new Knapsack(config.numberOfItems)
  const ga = new GeneticAlgorithm(knapsack, config)

  it('crossGenes', () => {
    const genes1 = [0, 0, 0, 0, 0]
    const genes2 = [1, 1, 1, 1, 1]
    ga.crossGenes(genes1, genes2)

    console.warn(genes1, genes2)
  });

  it('mutateGenes', () => {
    const genes = [0, 0, 0, 0, 0]
    ga.mutateGenes(genes)

    console.warn(genes)
  });

  it('createPopulation', () => {
    const population = ga.createPopulation()
    console.warn(population)
    const newPop = ga.evolve(population)
    console.warn(newPop)
  });
});


