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

const request = require('supertest');

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
        .post("/api/users")
        .send(user1)
        .expect(201);

    const userInDatabase = await userRepository.findById(user1.id);
    expect(userInDatabase).not.toBeNull();

    expect(response.body).toMatchObject({
        newUser: {
            username: user1.username,
            email: user1.email
        },
        token: response.body.token
    })
})

test("Shouldn't sign up a new user w/ existing email", async () => {
    await request(app)
        .post("/api/users")
        .send({...user1, "email": userDemo.email})
        .expect(400);
})

test("Shouldn't sign up a new user w/ existing username", async () => {
    await request(app)
        .post("/api/users")
        .send({...user1, "username": userDemo.username})
        .expect(400);
})

test("Should sign in with valid credentials", async () => {
    const initialTokenAmount = userDemo.tokens.length;

    const response = await request(app)
        .post("/api/users/login")
        .send({
            "email": userDemo.email,
            "password": userDemo.password,
        })
        .expect(200);

    // expect(response.body.user.tokens.length).toBe(initialTokenAmount + 1);
})

test("Shouldn't sign in with invalid credentials", async () => {
    await request(app)
        .post("/api/users/login")
        .send({
            "email": userDemo.email + "typo",
            "password": userDemo.password,
        })
        .expect(400);
})

test("Should get user profile with valid token", async () => {
    await request(app)
        .get("/api/users/me")
        .set("Authorization", `Bearer ${userDemo.tokens[0]}`)
        .send()
        .expect(200);
})

test("Should delete user with valid token", async () => {
    await request(app)
        .delete("/api/users/me")
        .set("Authorization", `Bearer ${userDemo.tokens[0]}`)
        .send()
        .expect(200);

    const userInDatabase = await userRepository.findById(userDemo.id);
    expect(userInDatabase).toBeNull();
})

test("Shouldn't delete user with invalid token", async () => {
    await request(app)
        .delete("/api/users/me")
        .set("Authorization", `Bearer ${userDemo.tokens[0]}typo`)
        .send()
        .expect(401);
})