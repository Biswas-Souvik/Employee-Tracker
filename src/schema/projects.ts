import {
  pgTable,
  bigserial,
  varchar,
  date,
  timestamp,
  pgEnum,
  index,
} from 'drizzle-orm/pg-core';

export const projectStatusEnum = pgEnum('project_status', [
  'ACTIVE',
  'INACTIVE',
]);

export const projects = pgTable(
  'projects',
  {
    projectId: bigserial('project_id', { mode: 'number' }).primaryKey(),
    projectName: varchar('project_name', { length: 150 }).notNull(),
    status: projectStatusEnum('status').notNull(),
    startDate: date('start_date'),
    endDate: date('end_date'),
    createdAt: timestamp('created_at').defaultNow(),
  },
  (table) => [index('idx_projects_status').on(table.status)]
);
