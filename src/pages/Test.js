import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { increment, dicrement } from '../modules/Test';

class Test extends Component {
  render() {
    const { increment: inc, dicrement: dec, count } = this.props;
    return (
      <div>
        <button type="button" onClick={inc}>
          Increment +
        </button>
        <span>{count}</span>
        <button type="button" onClick={dec}>
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
