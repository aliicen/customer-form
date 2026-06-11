import { pgTable, serial, integer, text, timestamp } from 'drizzle-orm/pg-core';

export const task = pgTable('task', {
	id: serial('id').primaryKey(),
	title: text('title').notNull(),
	priority: integer('priority').notNull().default(1)
});

export const customerRegistration = pgTable('customer_registration', {
	id: serial('id').primaryKey(),
	name: text('name').notNull(),
	email: text('email').notNull(),
	country: text('country').notNull(),
	createdAt: timestamp('created_at').notNull().defaultNow()
});

export * from './auth.schema';
