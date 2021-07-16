import HttpClient from "./HttpClient";
import LogInService from "./Login";
import InventoryService from "./Inventory";
import FalseReporService from "./FalseReport";
import ReturnService from "./Return";
/* globals CSS_CONFIG */

interface Services {
  inventory: InventoryService;
  logIn: LogInService;
  falseReport: FalseReporService;
  returnService: ReturnService;
}

const configInventoryService = (): InventoryService => {
  const http = new HttpClient(CSS_CONFIG.API);
  return new InventoryService(http);
};

const configLoginService = (): LogInService => {
  const http = new HttpClient(CSS_CONFIG.API);

  return new LogInService(http);
};

const configureFalseReportService = (): FalseReporService => {
  const http = new HttpClient(CSS_CONFIG.API);
  return new FalseReporService(http);
};

const configureReturnService = (): ReturnService => {
  const http = new HttpClient(CSS_CONFIG.API);
  return new ReturnService(http);
};
const configureServices = async (): Promise<Services> => {
  const inventory = configInventoryService();
  const logIn = configLoginService();
  const falseReport = configureFalseReportService();
  const returnService = configureReturnService();

  return {
    inventory,
    logIn,
    falseReport,
    returnService,
  };
};

export default configureServices;
