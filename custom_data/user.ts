import { UserModel } from "../src/models/User";

export const BASIC_USERS = [
  {
    username: "testtest",
    email: "test@test.cz",
    firstName: "Karel",
    lastName: "Doe",
    password: "testtest",
    clients: [],
  },
  {
    username: "test2test",
    email: "test2@test.cz",
    firstName: "Petr",
    lastName: "Eod",
    password: "test2test",
    clients: [],
  },
];

export const generateBasicUsers = async () => {
  console.log("STARTING CREATING USERS");

  const firstUser = await UserModel.findOne({ username: "testtest" });
  const secondUser = await UserModel.findOne({ username: "test2test" });

  if(firstUser || secondUser){
    await UserModel.deleteMany()
  }

  try {
    await UserModel.create(...BASIC_USERS);
  } catch (error) {
    console.error(error);
  } finally {
    console.log("DONE CREATING USERS");
  }
};
