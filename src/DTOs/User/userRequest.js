export class UserRegisterRequest {
    constructor({ name, email, password, phone_Number, address, product_preference }) {
      this.name = name;
      this.email = email;
      this.password = password;
      this.phone_Number = phone_Number;
      this.address = address;
      this.product_preference = product_preference;
    }
  }