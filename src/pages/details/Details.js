import React from 'react';


export class Details extends React.Component{
    // componentDidMount () {
    //     const { symbol } = this.props.location.state
    //   }
      render() {
        return (
            <h1>{this.props.location.symbol}</h1>
        )
      }
}