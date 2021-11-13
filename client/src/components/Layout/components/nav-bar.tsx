import Link from "next/link";
import { useRouter } from "next/dist/client/router";
import clsx from "clsx";

import styles from "./nav-bar.module.css";

export const NavBar: React.FC = () => {
  const { asPath } = useRouter();
  const currentPath = asPath.split("?")[0];

  const nonBreakingSpaceCode = "\xa0";
  const routes = [
    { route: "standings", title: "standings" },
    { route: "results", title: "results" },
    { route: "upcoming-games", title: `upcoming${nonBreakingSpaceCode}games` },
    { route: "goalies", title: "goalies" },
    { route: "skaters", title: "skaters" },
  ];

  return (
    <nav className={styles.root}>
      {routes.map(({ route, title }) => {
        const routePath = `/${route}`;
        const isActivePath = routePath === currentPath;

        return (
          <Link prefetch={false} key={route} href={routePath}>
            <a className={clsx(isActivePath ? styles.active : null)}>{title}</a>
          </Link>
        );
      })}
    </nav>
  );
};
