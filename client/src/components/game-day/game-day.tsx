import React from "react";
import Image from "next/image";
import { GameDay as GameDayType } from "../../generated/graphql";

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
            <Image
              alt={`${game.homeTeamName} logo`}
              src={`/img/${game.homeTeamCode}-30.png`}
              width="15"
              height="15"
            />
          </td>
          <td>&nbsp;-&nbsp;</td>
          <td style={{ textAlign: "left" }}>
            <Image
              alt={`${game.awayTeamName} logo`}
              src={`/img/${game.awayTeamCode}-30.png`}
              width="15"
              height="15"
            />
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
