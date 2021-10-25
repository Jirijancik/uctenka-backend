import { ClientModel } from "../src/models/Client";
import { UserModel } from "../src/models/User";
import { BusinessType } from "../src/types/businessType";
import { Currency } from "../src/types/currency";
import { PaymentMethod } from "../src/types/paymentMethod";
import { PaymentTerms } from "../src/types/paymentTerms";
import { BASIC_USERS, generateBasicUsers } from "./user";

export const generateBasicClients = async () => {
  console.log("STARTING CREATING CLIENTS");

  try {
    let firstUser = await UserModel.findOne({ email: BASIC_USERS[0].email });
    let secondUser = await UserModel.findOne({ email: BASIC_USERS[1].email });

    if (!firstUser || !secondUser) {
      await generateBasicUsers();
      firstUser = await UserModel.findOne({ email: BASIC_USERS[0].email });
      secondUser = await UserModel.findOne({ email: BASIC_USERS[1].email });
    }

    const existingClients = await ClientModel.find();

    if (existingClients.length) {
      await ClientModel.deleteMany();
    }

    const BASIC_CLIENT = [
      {
        userId: firstUser._id,
        name: "Basic Client",
        unifiedVatNumber: 9566698,
        vatNumber: 9566698,
        currency: Currency.CZK,
        accountBalance: 0,
        paymentTerms: PaymentTerms.AfterTwoWeeks,
        contactPerson: "Bozka",
        email: firstUser.email,
        country: "Czechia",
        street: "Malinak",
        city: "Brno",
        postcode: 75602,
        mobilePhone: 776555999,
        typeOfBussiness: BusinessType.PrivatePerson,
        accountNumber: 988987772,
        paymentMethod: null,
      },
      {
        userId: firstUser._id,
        name: "Babuska Company",
        unifiedVatNumber: 7566695,
        vatNumber: null,
        currency: Currency.CZK,
        accountBalance: 0,
        paymentTerms: PaymentTerms.AfterTwoWeeks,
        contactPerson: "Babuska",
        email: "babuska@babuska.cz",
        country: "Czechia",
        street: "Ceil",
        city: "Brno",
        postcode: 75605,
        mobilePhone: 664895633,
        typeOfBussiness: BusinessType.Company,
        accountNumber: 988987772,
        paymentMethod: PaymentMethod.Cash,
      },
      {
        userId: secondUser._id,
        name: "Karel",
        unifiedVatNumber: 989999,
        vatNumber: null,
        currency: Currency.EUR,
        accountBalance: 0,
        paymentTerms: PaymentTerms.AfterTwoWeeks,
        contactPerson: secondUser.firstName,
        email: secondUser.email,
        country: "Slovakia",
        street: "Gorba",
        city: "Bratislava",
        postcode: 96999,
        mobilePhone: 36999658,
        typeOfBussiness: BusinessType.PrivatePerson,
        accountNumber: 785555898,
        paymentMethod: PaymentMethod.Account,
      },
    ];

    BASIC_CLIENT.map(async (client) => {
      await ClientModel.create(client);
      const createdClient = await ClientModel.findOne({ name: client.name });

      await UserModel.findOneAndUpdate(
        { _id: client.userId },
        { $push: { clients: createdClient._id } },
        (error) => {
          if (error) {
            console.log(error);
          }
        }
      );
    });
  } catch (error) {
    console.error(error);
  } finally {
    console.log("DONE CREATING CLIENTS");
  }
};
