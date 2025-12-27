import { relations } from "drizzle-orm";
import {
  int,
  text,
  mysqlTable,
  serial,
  varchar,
  timestamp,
  boolean,
  json,
} from "drizzle-orm/mysql-core";

// ----------------------
// users table
// ----------------------
export const usersTable = mysqlTable("user_info", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 255 }).notNull(),
  age: int("age").notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  password: varchar("password", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

// ----------------------
// userdata table
// ----------------------
export const userdata = mysqlTable("userdata", {
  id: serial("id").primaryKey(),
  code: varchar("code", { length: 20 }).notNull(),
  title: varchar("title", { length: 255 }).notNull().default("Untitled"),
  data: varchar("data", { length: 1020 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
  user_id: int("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
});

// ----------------------
// session table
// ----------------------
export const session = mysqlTable("session", {
  id: serial("id").primaryKey().notNull(),
  user_id: int("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  ip: varchar("ip", { length: 45 }),
  tokenHash: varchar("token_hash", { length: 256 }).notNull().unique(),
  userAgent: text("user_agent"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  expiredAt: timestamp("expired_at"),
  // optional meta example if needed
  // meta: json("meta"),
});

// ----------------------
// email verification table
// ----------------------
export const emailVerify = mysqlTable("email_verify", {
  id: serial("id").primaryKey(),
  user_id: int("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  email: varchar("email", { length: 255 }).notNull(),
  verified: boolean("verified").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

// ----------------------
// relations
// ----------------------
export const usersTableRelation = relations(usersTable, ({ many }) => ({
  userdata: many(userdata),
  sessions: many(session),
  emailVerifications: many(emailVerify),
}));

export const userdataRelation = relations(userdata, ({ one }) => ({
  user: one(usersTable, {
    fields: [userdata.user_id],
    references: [usersTable.id],
  }),
}));

export const sessionRelation = relations(session, ({ one }) => ({
  user: one(usersTable, {
    fields: [session.user_id],
    references: [usersTable.id],
  }),
}));

export const emailVerifyRelation = relations(emailVerify, ({ one }) => ({
  user: one(usersTable, {
    fields: [emailVerify.user_id],
    references: [usersTable.id],
  }),
}));
