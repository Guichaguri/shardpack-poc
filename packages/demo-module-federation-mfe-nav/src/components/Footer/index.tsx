import type { ReactElement } from 'react';

import styles from './styles.module.css';

export default function Footer(): ReactElement {
  return (
    <footer className={styles.footer}>
      Copyright Sample!!
    </footer>
  )
}
