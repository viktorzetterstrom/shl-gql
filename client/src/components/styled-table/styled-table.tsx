import styles from "./styled-table.module.css";

export const StyledTable: React.FC = ({ children }) => (
  <table className={styles.table}>{children}</table>
);
