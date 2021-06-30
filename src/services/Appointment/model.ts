/* eslint-disable import/prefer-default-export */


export interface User {
  isLoggedIn: boolean;
  businessName?: string;
  taxNo?: string;
  foreignCountry?: string;
  firstName?: string;
  lastName?: string;
  city: string;
  country: string;
  postCode: string;
  state?: string;
  streetAddress: string;
  streetAddress2?: string;
  email?: string;
  phoneNumber?: string;
  privacyPolicy: boolean;
  firstNamePhonetic?: string;
  lastNamePhonetic?: string;
  customerNumber?: string;
}
