import React from "react";
import { GameDay as GameDayType } from "../../generated/graphql";
import { TeamLogo } from "..";

type GameDayProps = {
  gameDay: GameDayType;
};

export const GameDay: React.FC<GameDayProps> = ({
  gameDay: { date, games },
}) => {
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
          <td style={{ textAlign: "right" }}>
            {`${game.homeTeamName} `}
            <TeamLogo teamCode={game.homeTeamCode} />
          </td>
          <td>&nbsp;-&nbsp;</td>
          <td style={{ textAlign: "left" }}>
            <TeamLogo teamCode={game.awayTeamCode} />
            {` ${game.awayTeamName}`}
          </td>
          <td>{game.result}</td>
        </tr>
      ))}
      <tr>
        <td colSpan={5} />
      </tr>
    </React.Fragment>
  );
};
