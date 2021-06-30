import HttpClient from '../HttpClient';
import HTTPResponse from '../HttpResponse';
import { User } from './model';
import { Errors } from '../errors';

/* globals CSS_CONFIG */

class UserService {
  private http: HttpClient;

  public constructor(http: HttpClient, mock?: boolean) {
    this.http = http;
   
  }

  public async getUserInformation(): Promise<HTTPResponse<User>> {
    let user: User = {
      isLoggedIn: false,
      privacyPolicy: false,
      streetAddress: '',
      streetAddress2: '',
      postCode: '',
      city: '',
      country: '',
    };

    try {
      const response = await this.http.get(
        `${CSS_CONFIG.COUNTRY}/service/order`
      );

      user = response.data;
      user.isLoggedIn = true;
      user.privacyPolicy = true;

      return new HTTPResponse(user);
    } catch (err) {
      const { response } = err;
      if (!response) {
        return new HTTPResponse(user, Errors.SERVICE_NOT_AVAILABLE as number);
      }

      const error =
        Object.values(Errors).indexOf(response.status) > -1
          ? response.status
          : Errors.SERVICE_NOT_AVAILABLE;
      return new HTTPResponse(user, error);
    }
  }
}

export default UserService;
