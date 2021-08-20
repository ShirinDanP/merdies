import HttpClient from "./HttpClient";
import LogInService from "./Login";
import InventoryService from "./Inventory";
import ErrorReportService from "./ErrorReport";
import ReturnService from "./Return";
import UserNameService from "./UserName";
/* globals CSS_CONFIG */

interface Services {
  inventory: InventoryService;
  logIn: LogInService;
  errorReport: ErrorReportService;
  returnService: ReturnService;
  userNameService: UserNameService;
}

const configInventoryService = (): InventoryService => {
  const http = new HttpClient(CSS_CONFIG.API);
  return new InventoryService(http);
};

const configLoginService = (): LogInService => {
  const http = new HttpClient(CSS_CONFIG.API);

  return new LogInService(http);
};

const configureErrorReportService = (): ErrorReportService => {
  const http = new HttpClient(CSS_CONFIG.API);
  return new ErrorReportService(http);
};

const configureReturnService = (): ReturnService => {
  const http = new HttpClient(CSS_CONFIG.API);
  return new ReturnService(http);
};

const configureUserNameService = (): UserNameService => {
  const http = new HttpClient(CSS_CONFIG.API);
  return new UserNameService(http);
};

const configureServices = async (): Promise<Services> => {
  const inventory = configInventoryService();
  const logIn = configLoginService();
  const errorReport = configureErrorReportService();
  const returnService = configureReturnService();
  const userNameService = configureUserNameService();

  return {
    inventory,
    logIn,
    errorReport,
    returnService,
    userNameService,
  };
};

export default configureServices;
