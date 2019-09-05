import React from 'react';
import PropTypes from 'prop-types';
import styles from './Balance.module.css';

const Balance = ({ allDeposits, allWithdraws, balance }) => (
  <section className={styles.balance}>
    <span>⬆️{allDeposits} $</span>
    <span>⬇️{allWithdraws} $</span>
    <span>Balance: {balance} $</span>
  </section>
);

Balance.propTypes = {
  allDeposits: PropTypes.number.isRequired,
  allWithdraws: PropTypes.number.isRequired,
  balance: PropTypes.number.isRequired,
};

export default Balance;
