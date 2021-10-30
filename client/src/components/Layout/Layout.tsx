import styles from "./Layout.module.css";
import { Navbar } from "./Navbar";

export const Layout: React.FC = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className={styles.content}>{children}</div>
    </div>
  );
};
