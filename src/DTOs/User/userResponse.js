export class UserResponse {
    constructor({ id, name, email, phone_Number, address, product_preference, role }) {
      this.id = id;
      this.name = name;
      this.email = email;
      this.phone_Number = phone_Number;
      this.address = address;
      this.product_preference = product_preference;
      this.role = role;
    }
  }