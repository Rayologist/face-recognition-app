import React, { Component } from 'react';
import './Rank.css'


class Rank extends Component {
    constructor(props){
        super(props);
    }
    render() {
        const {userName, userEntries} = this.props;
        return (
            <>
              <div className="rank title">
                  {`${userName}, your current entry count is ...`}
              </div>

              <div className="rank number">
                  {`${userEntries}`}
              </div>
            </>
        )
    }
}

export default Rank;
