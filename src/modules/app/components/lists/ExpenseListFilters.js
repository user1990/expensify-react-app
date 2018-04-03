import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { DateRangePicker } from 'react-dates';
import {
  setTextFilter,
  sortByDate,
  sortByAmount,
  setStartDate,
  setEndDate,
} from '../../reducers';

class ExpenseListFilters extends Component {
  state = {
    calendarFocused: null,
  };

  handleOnInputChange = e => {
    this.props.setTextFilter(e.target.value);
  };

  handleOnSelectChange = e => {
    if (e.target.value === 'date') {
      this.props.sortByDate();
    } else if (e.target.value === 'amount') {
      this.props.sortByAmount();
    }
  };

  handleOnDatesChange = ({ startDate, endDate }) => {
    this.props.setStartDate(startDate);
    this.props.setEndDate(endDate);
  };

  handleOnFocusChange = calendarFocused => {
    this.setState(() => ({ calendarFocused }));
  };

  render() {
    const { text, sortBy, startDate, endDate } = this.props.filters;

    return (
      <div className="content-container">
        <div className="input-group">
          <div className="input-group__item">
            <input
              type="text"
              className="text-input"
              placeholder="Search expenses"
              value={text}
              onChange={this.handleOnInputChange}
            />
          </div>
          <div className="input-group__item">
            <select
              className="select"
              value={sortBy}
              onChange={this.handleOnSelectChange}
            >
              <option value="date">Date</option>
              <option value="amount">Amount</option>
            </select>
          </div>
          <div className="input-group__item">
            <DateRangePicker
              startDate={startDate}
              endDate={endDate}
              onDatesChange={this.handleOnDatesChange}
              focusedInput={this.state.calendarFocused}
              onFocusChange={this.handleOnFocusChange}
              // eslint-disable-next-line
              showClearDates
              numberOfMonths={1}
              isOutsideRange={() => false}
            />
          </div>
        </div>
      </div>
    );
  }
}

ExpenseListFilters.propTypes = {
  setTextFilter: PropTypes.func.isRequired,
  sortByDate: PropTypes.func.isRequired,
  sortByAmount: PropTypes.func.isRequired,
  setStartDate: PropTypes.func.isRequired,
  setEndDate: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  sortBy: PropTypes.string.isRequired,
  filters: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => ({
  setTextFilter: text => dispatch(setTextFilter(text)),
  sortByDate: () => dispatch(sortByDate()),
  sortByAmount: () => dispatch(sortByAmount()),
  setStartDate: startDate => dispatch(setStartDate(startDate)),
  setEndDate: endDate => dispatch(setEndDate(endDate)),
});

const mapStateToProps = state => ({
  filters: state.filters,
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters);
