import { pgTable, bigserial, varchar, timestamp } from 'drizzle-orm/pg-core';

export const employees = pgTable('employees', {
  employeeId: bigserial('employee_id', { mode: 'number' }).primaryKey(),
  employeeName: varchar('employee_name', { length: 100 }).notNull(),
  email: varchar('email', { length: 150 }).notNull().unique(),
  role: varchar('role', { length: 100 }),
  department: varchar('department', { length: 100 }),
  createdAt: timestamp('created_at').defaultNow(),
});
