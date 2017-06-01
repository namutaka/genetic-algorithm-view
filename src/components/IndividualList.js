import React, { Component } from 'react';
import PropTypes from 'prop-types'
import IndividualItem from './IndividualItem'
import { List } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';

class IndividualList extends Component {
  static propTypes = {
    individuals: PropTypes.array.isRequired,
    onSelect: PropTypes.func,
    selectedGeneId: PropTypes.number
  }

  render() {
    const { individuals, onSelect, selectedGeneId } = this.props
    return (
      <List className='container-column' style={{padding: 0}}>
        <div>
          <Subheader>Individuals</Subheader>
          <Divider inset={false} />
        </div>
        <div className="scroll-y">
          {individuals.map((individual, i) =>
            <div key={i}>
              <IndividualItem
                individual={individual}
                onSelect={(i) => onSelect(i)}
                selectedGeneId={selectedGeneId} />
              <Divider inset={false} />
            </div>
          )}
        </div>
      </List>
    );
  }
}


export default IndividualList

