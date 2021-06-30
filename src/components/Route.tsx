import * as React from 'react';

export interface RouteProps {
  path: string;
  component: React.ComponentType<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  location?: Location;
}

export const Route: React.FC<RouteProps> = ({
  component: Component,
  ...rest
}) => {
  return <Component {...rest} />;
};
