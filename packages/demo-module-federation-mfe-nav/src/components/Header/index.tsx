import type { ReactElement } from 'react';

import styles from './styles.module.css';

export default function Header(): ReactElement {
  return (
    <header className={styles.header}>
      <a href="#">Demo</a>
      <div>
        <a className="active" href="#">Home</a>
        <a href="#">Contact</a>
        <a href="#">About</a>
      </div>
    </header>
  )
}
