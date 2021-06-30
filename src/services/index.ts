import HttpClient from "./HttpClient";
import UserService from "./Appointment";

/* globals CSS_CONFIG */

interface Services {
  appointment: UserService;
}

const configAppointmentService = (): UserService => {
  const http = new HttpClient(CSS_CONFIG.API);
  return new UserService(http);
};

const configureServices = async (): Promise<Services> => {
  const appointment = configAppointmentService();

  return {
    appointment,
  };
};

export default configureServices;
