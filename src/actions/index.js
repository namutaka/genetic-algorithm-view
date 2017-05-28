// actions

export const GA_EVOLVE = 'GA_EVOLVE'

export function evolve() {
  return { type: GA_EVOLVE }
}

export const SETUP_GA = 'SETUP_GA'

export function setupGa(config) {
  return { type: SETUP_GA, config }
}

