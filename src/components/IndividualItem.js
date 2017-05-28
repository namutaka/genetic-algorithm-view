import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { ListItem } from 'material-ui/List';
import FontIcon from 'material-ui/FontIcon';
import { grey700, red700 } from 'material-ui/styles/colors';


class IndividualItem extends Component {
  static propTypes = {
    individual: PropTypes.object,
    onSelect: PropTypes.func,
    selectedGeneId: PropTypes.number
  }

  renderGenes(genes) {
    const { selectedGeneId } = this.props
    return (
      <span>
        {genes.map((gene, i) =>
          <FontIcon className="material-icons"
              key={i}
              style={{ fontSize: '18px' }}
              color={typeof selectedGeneId !== 'undefined' && selectedGeneId === i ? red700 : grey700}>
            {(gene > 0) ? 'shopping_cart' : 'remove'}
          </FontIcon>
        )}
      </span>
    )
  }

  render() {
    const { individual, onSelect } = this.props
    return (
      <ListItem
        primaryText={this.renderGenes(individual.genes)}
        rightIcon={
          <div style={{lineHeight: '24px'}}>{individual.value}</div>
        }
        onClick={() => onSelect(individual)}
      />
    );
  }
}

export default IndividualItem

