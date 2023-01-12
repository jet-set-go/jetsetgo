import React from 'react';
import styles from './DashboardLayout.module.css';

const DashboardLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

export default DashboardLayout;
