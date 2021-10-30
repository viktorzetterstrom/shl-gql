import styles from "./Layout.module.css";
import { Navbar } from "./Navbar";
import { TopBar } from "./TopBar";

export const Layout: React.FC = ({ children }) => {
  return (
    <div>
      <TopBar />
      <Navbar />
      <div className={styles.content}>{children}</div>
    </div>
  );
};
