import {
    boolean,
    integer,
    pgTable,
    serial,
    text,
    timestamp,
    varchar
} from "drizzle-orm/pg-core";

export const organizersTable = pgTable("organizers", {
  id: serial().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull(),
  phoneNumber: varchar({ length: 255 }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const eventsTable = pgTable("events", {
  id: serial().primaryKey(),
  organizerId: integer("organizer_id").references(() => organizersTable.id),
  title: varchar({ length: 255 }).notNull(),
  description: text().notNull(),
  toc: text().notNull(),
  poster: varchar({ length: 255 }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updated_at: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const ticketsTable = pgTable("tickets", {
  id: serial().primaryKey(),
  eventId: integer("event_id").references(() => eventsTable.id),
  title: varchar({ length: 255 }).notNull(),
  expiredAt: timestamp("expired_at", { withTimezone: true }).notNull(),
  price: integer().notNull(),
  quantity: integer().notNull(),
  soldOut: boolean().notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type Organizer = typeof organizersTable.$inferSelect;
export type NewOrganizer = typeof organizersTable.$inferInsert;
export type Event = typeof eventsTable.$inferSelect;
export type NewEvent = typeof eventsTable.$inferInsert;
export type Ticket = typeof ticketsTable.$inferSelect;
export type NewTicket = typeof ticketsTable.$inferInsert;
