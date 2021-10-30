import styles from "./Navbar.module.css";
import Link from "next/link";

export const Navbar: React.FC = () => (
  <nav className={styles.root}>
    <div className={styles.left}>
      <Link href="standings">
        <a>standings</a>
      </Link>
      <Link href="games">
        <a>games</a>
      </Link>
      <Link href="goalies">
        <a>goalies</a>
      </Link>
      <Link href="skaters">
        <a>skaters</a>
      </Link>
    </div>
    <div className={styles.right}>
      <Link href="https://zetterstrom.dev">
        <a>zetterstrom.dev</a>
      </Link>
    </div>
  </nav>
);
