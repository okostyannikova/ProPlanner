import { Component } from 'react';
import PropTypes from 'prop-types';
import throttle from 'lodash.throttle';

export default class CardsPagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
    };
  }

  componentDidMount = () => {
    const { restoreData } = this.props;
    restoreData();
    this.fetchData();
    document.addEventListener('scroll', this.checkMoreData());
  };

  componentWillReceiveProps = nextProps => {
    const { restoreData, filter, loadData, numberOfCards } = this.props;
    if (nextProps.filter !== filter) {
      restoreData();
      loadData(1, numberOfCards, nextProps.filter);
      this.setState(() => ({ page: 2 }));
    }
  };

  componentWillUnmount = () => {
    document.removeEventListener('scroll', this.checkMoreData());
  };

  fetchData = () => {
    const { loadData, lastPageNumber, numberOfCards, filter } = this.props;
    const { page } = this.state;
    if (page <= lastPageNumber) {
      loadData(page, numberOfCards, filter);
      this.setState(prevState => ({ page: prevState.page + 1 }));
    }
  };

  checkMoreData = () =>
    throttle(ev => {
      const elem = ev.target.documentElement;
      const { cardHeight } = this.props;
      if (elem.scrollHeight - elem.scrollTop - cardHeight <= elem.clientHeight) {
        this.fetchData();
      }
    }, 300);

  render() {
    const { children } = this.props;
    return children;
  }
}

CardsPagination.propTypes = {
  loadData: PropTypes.func.isRequired,
  restoreData: PropTypes.func.isRequired,
  lastPageNumber: PropTypes.number.isRequired,
  cardHeight: PropTypes.number.isRequired,
  numberOfCards: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
  filter: PropTypes.object.isRequired,
};
