import Image from "next/image";

type TeamLogoProps = {
  teamCode: string;
};

export const TeamLogo: React.FC<TeamLogoProps> = ({ teamCode }) => (
  <Image
    alt={`${teamCode} logo`}
    src={`/img/${teamCode}-30.png`}
    width="15"
    height="15"
  />
);
