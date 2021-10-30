import Link from "next/link";
import { useRouter } from "next/dist/client/router";
import clsx from "clsx";

import styles from "./Navbar.module.css";

export const Navbar: React.FC = () => {
  const { pathname: currentPath } = useRouter();

  const routes = ["standings", "games", "goalies", "skaters"];

  return (
    <nav className={styles.root}>
      <div className={styles.left}>
        {routes.map((route) => {
          const routePath = `/${route}`;
          const isActivePath = routePath === currentPath;

          return (
            <Link key={route} href={routePath}>
              <a className={clsx(isActivePath ? styles.active : null)}>
                {route}
              </a>
            </Link>
          );
        })}
      </div>

      <div className={styles.right}>
        <Link href="https://zetterstrom.dev">
          <a>zetterstrom.dev</a>
        </Link>
      </div>
    </nav>
  );
};
