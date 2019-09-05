import React, { Component } from 'react';
import shortid from 'shortid';
import { ToastContainer, toast } from 'react-toastify';
import Controls from './Controls/Controls';
import Balance from './Balance/Balance';
import 'react-toastify/dist/ReactToastify.css';
import styles from './Dashboard.module.css';

export default class Dashboard extends Component {
  state = {
    transactions: [],
    transaction: '',
    balance: 0,
    allDeposits: 0,
    allWithdraws: 0,
  };

  componentDidMount() {
    const history = localStorage.getItem('history');
    const historyUnparsed = JSON.parse(history);
    if (history) {
      this.setState({ ...historyUnparsed });
    }
  }

  addTransaction = e => {
    this.setState({ transaction: e.target.value });
  };

  addToLocalStorage = () =>
    localStorage.setItem('history', JSON.stringify(this.state));

  notify = notice => toast(notice);

  handleSubmitTransaction = e => {
    e.preventDefault();
    const date = new Date();

    const options = {
      year: 'numeric',
      month: 'long',
      timezone: 'UTC',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    };
    if (e.target.name === 'Deposit' && this.state.transaction > 0) {
      const newTransaction = {
        id: shortid.generate(),
        amount: this.state.transaction,
        type: e.target.name,
        date: date.toLocaleString('en', options),
      };
      this.setState(
        prevState => ({
          transactions: [...prevState.transactions, newTransaction],
          balance: prevState.balance + Number(newTransaction.amount),
          allDeposits: prevState.allDeposits + Number(newTransaction.amount),
          transaction: '',
        }),
        () => this.addToLocalStorage(),
      );
    } else if (this.state.transaction === '0') {
      this.notify('Введите сумму для проведения операции!');
    }

    if (
      e.target.name === 'Withdraw' &&
      this.state.balance >= this.state.transaction &&
      this.state.transaction > 0
    ) {
      const newTransaction = {
        id: shortid.generate(),
        amount: this.state.transaction,
        type: e.target.name,
        date: date.toLocaleString('en', options),
      };
      this.setState(
        prevState => ({
          transactions: [...prevState.transactions, newTransaction],
          balance: prevState.balance - Number(newTransaction.amount),
          allWithdraws: prevState.allWithdraws + Number(newTransaction.amount),
          transaction: '',
        }),
        () => this.addToLocalStorage(),
      );
    } else if (
      e.target.name === 'Withdraw' &&
      this.state.balance <= this.state.transaction
    ) {
      this.notify('На счету недостаточно средств для проведения операции!');
    }
    // setTimeout(localStorage.setItem('history', JSON.stringify(this.state)), 2);
  };

  render() {
    const { transaction, allDeposits, allWithdraws, balance } = this.state;
    return (
      <div className="dashboard">
        <Controls
          transaction={transaction}
          addTransaction={this.addTransaction}
          handleSubmitTransaction={this.handleSubmitTransaction}
        />
        <Balance
          allDeposits={allDeposits}
          allWithdraws={allWithdraws}
          balance={balance}
        />

        <ToastContainer />

        <table className={styles.history}>
          <thead>
            <tr>
              <th className={styles.column}>Transaction</th>
              <th className={styles.column}>Amount</th>
              <th className={styles.column}>Date</th>
            </tr>
          </thead>
          <tbody>
            {this.state.transactions.map(transaction => (
              <tr className={styles.row} key={transaction.id}>
                <td>{transaction.type}</td>
                <td>{transaction.amount}$</td>
                <td>{transaction.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
