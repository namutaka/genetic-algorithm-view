import { createArray, intRandom } from '../utils'

export default class NapZak {

  constructor(numberOfItems) {
    this.weightCapacity = 0
    this.numberOfItems = numberOfItems
    this.items = this.createItems(this.numberOfItems);
    console.table(this.items)
  }

  totalWeight() {
    return this.items.reduce((sum, item) =>
      sum + item.weight, 0)
  }

  createItems(size) {
    return createArray(size, (i) => this.createItem(i))
  }

  createItem(id) {
    return {
      id,
      weight: intRandom(1, 10),
      value: intRandom(1, 20),
    }
  }

  calcWightAndValue(selection) {
    let value = 0
    let weight = 0
    this.items.forEach((item, i) => {
      if (selection[item.id] > 0) {
        value += item.value
        weight += item.weight
      }
    })

    return { value, weight }
  }

  isOverWightCapacity(weight) {
    return weight > this.weightCapacity
  }
}

