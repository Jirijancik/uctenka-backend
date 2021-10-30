import { hash } from 'bcryptjs';
import { UserModel } from "../src/models/User";

export const BASIC_USERS = async() => [
  {
    username: "testtest",
    email: "test@test.cz",
    firstName: "Karel",
    lastName: "Doe",
    password: await hash("test2test", 10),
    clients: [],
  },
  {
    username: "test2test",
    email: "test2@test.cz",
    firstName: "Petr",
    lastName: "Eod",
    password: await hash("test2test", 10),
    clients: [],
  },
];

export const generateBasicUsers = async () => {
  console.log("STARTING CREATING USERS");

  const firstUser = await UserModel.findOne({ username: "testtest" });
  const secondUser = await UserModel.findOne({ username: "test2test" });

  const userData = await BASIC_USERS()

  if(firstUser || secondUser){
    await UserModel.deleteMany()
  }

  try {
    await UserModel.create(...userData);
  } catch (error) {
    console.error(error);
  } finally {
    console.log("DONE CREATING USERS");
  }
};
