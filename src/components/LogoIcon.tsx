import React from "react";
import { Icon } from "@material-ui/core";
import logoIcon from "../assets/logoIcon.svg";

const LogoIcon: React.FC = (): JSX.Element => {
  return (
    <Icon>
      <img src={"/assets/logoIcon.svg"} />
    </Icon>
  );
};

export default LogoIcon;
