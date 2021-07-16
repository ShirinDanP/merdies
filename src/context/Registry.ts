/* eslint-disable @typescript-eslint/no-explicit-any */
class Registry {
  private registered: any = {};

  public exposeRegistered = (): any => this.registered;

  public register = (units: any): void => {
    Object.keys(units).map(
      // eslint-disable-next-line array-callback-return
      (alias: string): void => {
        this.registered[alias] = units[alias];
      }
    );

    return this.exposeRegistered();
  };
}

export default Registry;
