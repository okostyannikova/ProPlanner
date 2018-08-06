import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { increment, dicrement } from '../modules/Test';

class Test extends Component {
  render() {
    return (
      <div>
        <button type="button" onClick={this.props.increment}>
          Increment +
        </button>
        <span>{this.props.count}</span>
        <button type="button" onClick={this.props.dicrement}>
          Dicrement -
        </button>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  count: store.reducer,
});

const mapDispatchToProps = dispatch => ({
  increment: bindActionCreators(increment, dispatch),
  dicrement: bindActionCreators(dicrement, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Test);
