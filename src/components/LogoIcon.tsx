import React from "react";
import { Icon } from "@material-ui/core";

const LogoIcon: React.FC = (): JSX.Element => {
  return (
    <Icon>
      <img src={"/assets/logoIcon.svg"} />
    </Icon>
  );
};

export default LogoIcon;
