import styles from "./layout.module.css";
import { Navbar } from "./nav-bar";
import { TopBar } from "./top-bar";

export const Layout: React.FC = ({ children }) => {
  return (
    <div>
      <TopBar />
      <Navbar />
      <div className={styles.content}>{children}</div>
    </div>
  );
};
