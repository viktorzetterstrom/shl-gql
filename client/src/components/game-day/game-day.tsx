import React from "react";
import styles from "./game-day.module.css";
import { GameDay as GameDayType } from "../../generated/graphql";
import { TeamLogo } from "..";

type GameDayProps = {
  gameDay: GameDayType;
};

export const GameDay: React.FC<GameDayProps> = ({
  gameDay: { date, games },
}) => {
  const now = new Date();
  const showResult = new Date(date) < now;

  return (
    <React.Fragment key={date}>
      <tr>
        <td colSpan={5} style={{ textAlign: "center" }}>
          {date}
        </td>
      </tr>
      {games?.map((game) => (
        <tr key={game.gameId}>
          <td>{game.time}</td>
          <td className={styles.leftTeam}>
            {`${game.homeTeamName.toLowerCase()} `}
            <TeamLogo teamCode={game.homeTeamCode} />
          </td>
          <td>&nbsp;-&nbsp;</td>
          <td className={styles.rightTeam}>
            <TeamLogo teamCode={game.awayTeamCode} />
            {` ${game.awayTeamName.toLowerCase()}`}
          </td>
          <td>{showResult && game.result}</td>
        </tr>
      ))}
      <tr>
        <td colSpan={5} />
      </tr>
    </React.Fragment>
  );
};
