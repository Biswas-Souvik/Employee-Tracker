import { db } from './db';
import { employees } from '../schema/employees';
import { projects } from '../schema/projects';
import { employeeProjects } from '../schema/employee_projects';

async function seed() {
  console.log('🌱 Seeding database...');

  /* ---------------- EMPLOYEES ---------------- */

  const insertedEmployees = await db
    .insert(employees)
    .values([
      {
        employeeName: 'Alice Johnson',
        email: 'alice@example.com',
        role: 'Backend Engineer',
        department: 'Engineering',
      },
      {
        employeeName: 'Bob Smith',
        email: 'bob@example.com',
        role: 'Frontend Engineer',
        department: 'Engineering',
      },
      {
        employeeName: 'Charlie Brown',
        email: 'charlie@example.com',
        role: 'QA Engineer',
        department: 'Quality',
      },
      {
        employeeName: 'Diana Prince',
        email: 'diana@example.com',
        role: 'Data Analyst',
        department: 'Analytics',
      },
    ])
    .returning();

  console.log('✅ Employees inserted');

  /* ---------------- PROJECTS ---------------- */

  const insertedProjects = await db
    .insert(projects)
    .values([
      {
        projectName: 'Employee Tracker',
        status: 'ACTIVE',
      },
      {
        projectName: 'Payroll System',
        status: 'ACTIVE',
      },
      {
        projectName: 'Legacy Migration',
        status: 'INACTIVE',
      },
    ])
    .returning();

  console.log('✅ Projects inserted');

  /* ---------------- EMPLOYEE_PROJECTS ---------------- */

  await db.insert(employeeProjects).values([
    {
      employeeId: insertedEmployees[0].employeeId, // Alice
      projectId: insertedProjects[0].projectId, // Employee Tracker
    },
    {
      employeeId: insertedEmployees[1].employeeId, // Bob
      projectId: insertedProjects[0].projectId,
    },
    {
      employeeId: insertedEmployees[2].employeeId, // Charlie
      projectId: insertedProjects[1].projectId, // Payroll
    },
    {
      employeeId: insertedEmployees[0].employeeId, // Alice
      projectId: insertedProjects[1].projectId,
    },
    // Diana intentionally NOT assigned → ON BENCH
  ]);

  console.log('✅ Employee-Project mappings inserted');

  console.log('🎉 Insertion complete');
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('❌ Insertion failed:', err);
    process.exit(1);
  });
