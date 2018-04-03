import React, { Component } from 'react';

import PropTypes from 'prop-types';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';

class ExpenseForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      description: props.expense ? props.expense.description : '',
      note: props.expense ? props.expense.note : '',
      amount: props.expense ? (props.expense.amount / 100).toString() : '',
      createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
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
        <form className="form" onSubmit={this.handleOnFormSubmit}>
          {error && <p className="form__error">{error}</p>}
          <input
            type="text"
            placeholder="Description"
            className="text-input"
            value={description}
            onChange={this.handleOnDescriptionChange}
          />
          <input
            type="number"
            placeholder="Amount"
            className="text-input"
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
            className="textarea"
            value={note}
            onChange={this.handleOnNoteChange}
          />
          <button className="button">Add Expense</button>
        </form>
      </div>
    );
  }
}

ExpenseForm.propTypes = {
  expense: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default ExpenseForm;
