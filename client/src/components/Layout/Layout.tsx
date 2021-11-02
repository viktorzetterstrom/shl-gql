import styles from "./layout.module.css";
import { NavBar, TopBar } from "./components";

export const Layout: React.FC = ({ children }) => {
  return (
    <div>
      <TopBar />
      <NavBar />
      <div className={styles.content}>{children}</div>
    </div>
  );
};
