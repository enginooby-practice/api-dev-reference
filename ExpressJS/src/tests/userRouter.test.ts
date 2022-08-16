// MAYDO
// + Sign out with valid/invalid auth
// + Sign out all with valid/invalid auth
// + Update user with valid auth & valid data
// + Update user with valid auth & invalid data
// + Update user with invalid auth

import {app} from "../app";
import {User} from "../entities/User";
import {userService} from "../services/UserService";
import {userRepository} from "../repositories/repositoryManager";
import {StatusCodes} from "http-status-codes";

const request = require('supertest');
const baseRoute = "/api/users";

let userDemo: User;
const userDemoData = new User("0", "User", "password", "user@gmail.com");

const user1 = {
    "id": "1",
    "username": "User 1",
    "password": "password1",
    "email": "user1@gmail.com"
};

beforeEach(async () => {
    await userRepository.deleteAll();
    userDemo = (await userService.signUp(userDemoData)).newUser;
})

test("Should sign up a new user", async () => {
    const response = await request(app)
        .post(`${baseRoute}`)
        .send(user1)
        .expect(StatusCodes.CREATED);
})

test("Shouldn't sign up a new user w/ existing email", async () => {
    await request(app)
        .post(`${baseRoute}`)
        .send({...user1, "email": userDemo.email})
        .expect(StatusCodes.BAD_REQUEST)
})


test("Shouldn't sign up a new user w/ existing username", async () => {
    await request(app)
        .post(`${baseRoute}`)
        .send({...user1, "username": userDemo.username})
        .expect(StatusCodes.BAD_REQUEST);
})

test("Should sign in with valid credentials", async () => {
    const response = await request(app)
        .post(`${baseRoute}/login`)
        .send({
            "email": userDemo.email,
            "password": userDemo.password,
        })
        .expect(StatusCodes.OK);
})

test("Shouldn't sign in with invalid credentials", async () => {
    await request(app)
        .post(`${baseRoute}/login`)
        .send({
            "email": userDemo.email + "typo",
            "password": userDemo.password,
        })
        .expect(StatusCodes.BAD_REQUEST);
})

test("Should get user profile with valid token", async () => {
    await request(app)
        .get(`${baseRoute}/me`)
        .set("Authorization", `Bearer ${userDemo.tokens[0]}`)
        .send()
        .expect(StatusCodes.OK);
})

test("Should delete user with valid token", async () => {
    await request(app)
        .delete(`${baseRoute}/me`)
        .set("Authorization", `Bearer ${userDemo.tokens[0]}`)
        .send()
        .expect(StatusCodes.OK);

    const userInDatabase = await userRepository.findById(userDemo.id);
    expect(userInDatabase).toBeNull();
})

test("Shouldn't delete user with invalid token", async () => {
    await request(app)
        .delete(`${baseRoute}/me`)
        .set("Authorization", `Bearer ${userDemo.tokens[0]}typo`)
        .send()
        .expect(StatusCodes.UNAUTHORIZED);
})