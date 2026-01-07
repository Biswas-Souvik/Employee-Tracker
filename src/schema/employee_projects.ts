import { pgTable, bigint, timestamp, primaryKey } from 'drizzle-orm/pg-core';
import { employees } from './employees';
import { projects } from './projects';

export const employeeProjects = pgTable(
  'employee_projects',
  {
    employeeId: bigint('employee_id', { mode: 'number' })
      .notNull()
      .references(() => employees.employeeId),
    projectId: bigint('project_id', { mode: 'number' })
      .notNull()
      .references(() => projects.projectId),
    assignedAt: timestamp('assigned_at').defaultNow(),
    releasedAt: timestamp('released_at'),
  },
  (table) => [primaryKey({ columns: [table.employeeId, table.projectId] })]
);
