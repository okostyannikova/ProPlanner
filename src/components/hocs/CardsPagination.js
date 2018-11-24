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
    const { restoreData, params, search, loadData, numberOfCards } = this.props;
    if (nextProps.params !== params) {
      restoreData();
      loadData(1, numberOfCards, nextProps.params, search);
      this.setState(() => ({ page: 2 }));
    }
    if (nextProps.search !== search) {
      restoreData();
      loadData(1, numberOfCards, params, nextProps.search);
      this.setState(() => ({ page: 2 }));
    }
  };

  componentWillUnmount = () => {
    document.removeEventListener('scroll', this.checkMoreData());
  };

  fetchData = () => {
    const { loadData, lastPageNumber, numberOfCards, params, search } = this.props;
    const { page } = this.state;
    if (page <= lastPageNumber) {
      loadData(page, numberOfCards, params, search);
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

CardsPagination.defaultProps = {
  params: {},
  search: null,
};

CardsPagination.propTypes = {
  loadData: PropTypes.func.isRequired,
  restoreData: PropTypes.func.isRequired,
  lastPageNumber: PropTypes.number.isRequired,
  cardHeight: PropTypes.number.isRequired,
  numberOfCards: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
  params: PropTypes.object,
  search: PropTypes.string,
};
