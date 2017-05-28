import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Paper from 'material-ui/Paper'
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import { grey200, grey500, red200, redA200 } from 'material-ui/styles/colors';

class KnapsackView extends Component {
  static propTypes = {
    knapsack: PropTypes.object.isRequired,
    selection: PropTypes.array,
    onSelect: PropTypes.func
  }

  constructor(props) {
    super()
    this.state = {
      selectedItem: null
    }
  }

  handleClickItem(item) {
    console.log(item)
    const { selectedItem } = this.state
    if (selectedItem && selectedItem.id === item.id) {
      item = null
    }

    this.setState({ selectedItem: item })
    this.props.onSelect(item)
  }

  render() {
    const { knapsack, selection } = this.props
    const { selectedItem } = this.state
    return (
      <div>
        <Subheader>
          Items (Capacity: {knapsack.weightCapacity})
        </Subheader>
        <Divider inset={false} />
        <Paper style={{margin: '10px', padding: '10px'}}>
          {knapsack.items.map((item, i) => {
            return this.renderItem(item,
              (selection || [])[item.id],
              !!selectedItem && selectedItem.id === item.id
            )
          })}
        </Paper>
        {this.renderTotal()}
      </div>
    )
  }

  renderItem(item, highlight, selected) {
    const size = 20 + item.weight * 5
    const style = {
      width: size + "px",
      height: size + "px",
      margin: 5,
      textAlign: 'center',
      display: 'inline-block',
      lineHeight: size + "px",
    }

    if (selected) {
      style['backgroundColor'] = selected ? redA200 : null
    }

    let zDepth = 1
    if (typeof highlight !== 'undefined') {
      if (highlight < 1) {
        style['backgroundColor'] = selected ? red200 : grey200
      } else {
        zDepth = 2
      }
    }

    return (
      <Paper key={item.id} style={style} zDepth={zDepth}
          onClick={() => this.handleClickItem(item)}>
        {item.value}
      </Paper>
    )
  }

  renderTotal() {
    const { knapsack, selection } = this.props
    if (!selection) {
      return null
    }

    const {value, weight} = knapsack.calcWightAndValue(selection)
    let notice = ''
    if (knapsack.isOverWightCapacity(weight)) {
      notice = 'over!'
    }

    return (
      <div className="clearfix">
        <Paper style={{margin: '10px', padding: '10px',
            float: 'right', width: '45%'}}>
          <strong style={{color: grey500}}>WEIGHT</strong>&nbsp;
          {weight} {notice}
        </Paper>
        <Paper style={{margin: '10px', padding: '10px',
            float: 'left', width: '45%'}}>
          <strong style={{color: grey500}}>VALUE</strong>&nbsp;
          {value}
        </Paper>
      </div>
    )
  }
}

export default KnapsackView

