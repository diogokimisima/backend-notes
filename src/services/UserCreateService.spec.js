const UserCreateService = require('./UserCreateService');
const UserRepositoryInMemory = require('../repositories/UserRepositoryInMemory.js');
const AppError = require('../utils/AppError.js');

describe("UserCreateService", () => {
    let userRepositoryInMemory = null;
    let userCreateService = null;

    beforeEach(() => {

        userRepositoryInMemory = new UserRepositoryInMemory();
        userCreateService = new UserCreateService(userRepositoryInMemory);
    });


    it("user should be create", async () => {
        const user = {
            name: 'User test',
            email: 'user@teste.com',
            password: '123'
        };

        const userCreated = await userCreateService.execute(user);
        expect(userCreated).toHaveProperty('id');
    });

    it("user not should be create with exist email", async () => {
        const user1 = {
            name: "User test 1",
            email: "user@teste.com",
            password: "123"
        };
        const user2 = {
            name: "User test 2",
            email: "user@teste.com",
            password: "12345"
        };


        await userCreateService.execute(user1);
        await expect(userCreateService.execute(user2)).rejects.toEqual(new AppError("Este email ja esta em uso."));
    });

});
