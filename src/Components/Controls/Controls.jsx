import React from 'react';
import PropTypes from 'prop-types';
import transactionType from '../Utils/transactionType';
import styles from './Controls.module.css';

const Controls = ({ transaction, addTransaction, handleSubmitTransaction }) => (
  <section className={styles.controls}>
    <input
      className={styles.input}
      type="number"
      name="transaction"
      value={transaction}
      onChange={addTransaction}
    />
    <button
      className={styles.controlBtn}
      type="button"
      onClick={handleSubmitTransaction}
      name={transactionType.deposit}
    >
      Deposit
    </button>
    <button
      className={styles.controlBtn}
      type="button"
      onClick={handleSubmitTransaction}
      name={transactionType.withdraw}
    >
      Withdraw
    </button>
  </section>
);

Controls.propTypes = {
  transaction: PropTypes.string.isRequired,
  addTransaction: PropTypes.func.isRequired,
  handleSubmitTransaction: PropTypes.func.isRequired,
};

export default Controls;
