import React, { Component } from 'react';

import PropTypes from 'prop-types';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

class ExpenseForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      description: '',
      note: '',
      amount: '',
      createdAt: moment(),
      calendarFocused: false,
      error: '',
    };
  }

  handleOnDescriptionChange = e => {
    const description = e.target.value;
    this.setState(() => ({ description }));
  };

  handleOnNoteChange = e => {
    const note = e.target.value;
    this.setState(() => ({ note }));
  };

  handleOnAmountChange = e => {
    const amount = e.target.value;
    const allowSpecificFormat = /^\d{1,}(\.\d{0,2})?$/; // allowing only numbers & 2 digits after point ex.: 123.12

    if (!amount || amount.match(allowSpecificFormat)) {
      this.setState(() => ({ amount }));
    }
  };

  handleOnDateChange = createdAt => {
    if (createdAt) {
      this.setState(() => ({ createdAt }));
    }
  };

  handleCalendarOnFocusChange = ({ focused }) => {
    this.setState(() => ({ calendarFocused: focused }));
  };

  handleOnFormSubmit = e => {
    e.preventDefault();

    if (!this.state.description || !this.state.amount) {
      this.setState(() => ({
        error: 'Please provide description and amount.',
      }));
    } else {
      this.setState(() => ({ error: '' }));
      console.log('Submitted!');
      this.props.onSubmit({
        description: this.state.description,
        amount: parseFloat(this.state.amount, 10) * 100,
        createdAt: this.state.createdAt.valueOf(), // Output the number of milliseconds
        note: this.state.note,
      });
    }
  };

  render() {
    const {
      error,
      description,
      amount,
      note,
      createdAt,
      calendarFocused,
    } = this.state;

    return (
      <div>
        {error && <p>{error}</p>}
        <form onSubmit={this.handleOnFormSubmit}>
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={this.handleOnDescriptionChange}
          />
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={this.handleOnAmountChange}
          />
          <SingleDatePicker
            date={createdAt}
            onDateChange={this.handleOnDateChange}
            focused={calendarFocused}
            onFocusChange={this.handleCalendarOnFocusChange}
            numberOfMonths={1}
            isOutsideRange={() => false}
          />
          <textarea
            name="textarea"
            id="textarea"
            cols="30"
            rows="10"
            placeholder="Add a note for your xpense (optional)"
            value={note}
            onChange={this.handleOnNoteChange}
          />
          <button>Add Expense</button>
        </form>
      </div>
    );
  }
}

ExpenseForm.propTypes = {
  // expense: PropTypes.number.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default ExpenseForm;
