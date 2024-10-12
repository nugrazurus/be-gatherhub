import { Faker, faker, id_ID } from "@faker-js/faker";
import { db } from ".";
import {
  eventsTable,
  NewEvent,
  NewOrganizer,
  NewTicket,
  organizersTable,
  ticketsTable,
} from "./schema";

const idFaker = new Faker({ locale: [id_ID] });

async function main() {
  console.log("Seeding database...");
  console.log(process.env.DATABASE_URL);

  for (let i = 0; i < 10; i++) {
    const organizer: NewOrganizer = {
      name: idFaker.person.fullName(),
      email: idFaker.internet.email(),
      phoneNumber: idFaker.phone.number(),
    };
    console.log(organizer);

    const insertOrganizer = await db
      .insert(organizersTable)
      .values(organizer)
      .returning({ id: organizersTable.id });

    for (let j = 0; j < 5; j++) {
      const event: NewEvent = {
        organizerId: insertOrganizer[0].id,
        title: faker.word.adjective(3),
        description: faker.lorem.paragraph(),
        toc: faker.lorem.paragraph(),
        poster: faker.image.url(),
      };

      const insertEvent = await db
        .insert(eventsTable)
        .values(event)
        .returning({ id: eventsTable.id });

      for (let k = 0; k < 2; k++) {
        const ticket: NewTicket = {
          eventId: insertEvent[0].id,
          title: faker.lorem.words(3),
          expiredAt: faker.date.future(),
          price: Number(
            faker.finance.amount({ min: 10000, max: 100000, dec: 0 })
          ),
          quantity: faker.number.int({ min: 10, max: 100 }),
          soldOut: faker.datatype.boolean(),
        };

        await db.insert(ticketsTable).values(ticket);
      }
    }
  }

  console.log("Seeding database done!");
  process.exit(0);
}

await main()
  .catch((err) => {
    console.error(err);
    process.exit(0);
  });
