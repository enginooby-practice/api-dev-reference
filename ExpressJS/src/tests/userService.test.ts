// import {User} from "../entities/User";
// import {userRepository} from "../repositories/repositoryManager";
// import {userService} from "../services/UserService";
//
// let userDemo: User;
// const userDemoData = new User("0", "User", "password", "user@gmail.com");
//
// const user1 = {
//     id: "1",
//     username: "User 1",
//     password: "password1",
//     email: "user1@gmail.com"
// };
//
// beforeEach(async () => {
//     await userRepository.deleteAll();
//     userDemo = await userRepository.create(userDemoData);
//     await userService.generateAuthToken(userDemo);
//     await userRepository.save(userDemo);
// })
//
// // ? More like repo test
// test("Should delete user", async () => {
//     await userService.delete(userDemo.id);
//
//     const userInRepo = await userRepository.findById(userDemo.id);
//     expect(userInRepo).toBeNull();
//
//     // TODO: test cascade delete dependent tasks
// })
//
// test("Should sign up a new user (Service)", async () => {
//     const response = await userService.signUp(user1 as User);
//
//     const userInRepo = await userRepository.findById(response.newUser.id);
//     expect(userInRepo).not.toBeNull();
//
//     expect(response).toMatchObject({
//         newUser: {
//             username: user1.username,
//             email: user1.email
//         },
//         token: response.token
//     })
// })
//
// test("Shouldn't sign up a new user w/ existing email", async () => {
//         await expect(userService.signUp({...user1, email: userDemo.email} as User))
//             .rejects
//             .toThrowError();
//     }
// )
//
// test("Shouldn't sign up a new user w/ existing username", async () => {
//     await expect(userService.signUp({...user1, username: userDemo.username} as User))
//         .rejects
//         .toThrowError();
// })
//
// test("On sign out", async () => {
//     const originalTokenAmount = userDemo.tokens.length;
//     const currentToken = userDemo.tokens[0];
//     const response = await userService.signOut(userDemo, currentToken);
//
//     expect(userDemo.tokens.length).toBe(originalTokenAmount - 1);
//     expect(userDemo.tokens.includes(currentToken)).toBe(false);
//     expect(response).toStrictEqual({message: "Logged out"});
// })
//
// test("On sign out all", async () => {
//     const response = await userService.signOutAll(userDemo);
//
//     expect(userDemo.tokens.length).toBe(0);
//     expect(response).toStrictEqual({message: "Logged out all"});
// })
//
// test("Should authenticate w/ valid token", async () => {
//     const user = await userService.authenticate(userDemo.tokens[0]);
//
//     // ? Compare user w/ userDemo
//     expect(user).not.toBeNull();
// })
//
// test("Shouldn't authenticate w/ invalid token", async () => {
//     await expect(userService.authenticate("blahblahblah"))
//         .rejects
//         .toThrowError();
// })