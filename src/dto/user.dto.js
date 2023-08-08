export class UserDto{

    constructor(user){
        this.first_name = user.first_name,
        this.last_name = user.last_name,
        this.age = user.age,
        this.email = user.email,
        this.role = user.role,
        this.cart = user.cart
    };

};