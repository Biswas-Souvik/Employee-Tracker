import { db } from './db';
import { employees } from '../schema/employees';
import { projects } from '../schema/projects';
import { employeeProjects } from '../schema/employee_projects';

async function insertSampleData() {
  const insertedEmployees = await db
    .insert(employees)
    .values([
      {
        employeeName: 'Souvik Biswas',
        email: 'souvik@example.com',
        role: 'Backend Engineer',
        department: 'Engineering',
      },
      {
        employeeName: 'Naveen PL',
        email: 'np@example.com',
        role: 'Frontend Engineer',
        department: 'Engineering',
      },
      {
        employeeName: 'Dheeraj',
        email: 'dgb@example.com',
        role: 'Senion Full-Stack Engineer',
        department: 'Quality',
      },
    ])
    .returning();

  const insertedProjects = await db
    .insert(projects)
    .values([
      {
        projectName: 'Employee Tracker',
        status: 'ACTIVE',
      },
      {
        projectName: 'URL Shortener',
        status: 'ACTIVE',
      },
      {
        projectName: 'Leave Tracker',
        status: 'INACTIVE',
      },
    ])
    .returning();

  await db.insert(employeeProjects).values([
    {
      employeeId: insertedEmployees[0].employeeId, // Souvik
      projectId: insertedProjects[0].projectId, // Employee Tracker
    },
    {
      employeeId: insertedEmployees[1].employeeId, // Naveen
      projectId: insertedProjects[0].projectId, // Employee Tracker
    },
    {
      employeeId: insertedEmployees[0].employeeId, // Souvik
      projectId: insertedProjects[1].projectId, // URL Shortener
    },
  ]);
}

insertSampleData()
  .then(() => {
    console.log('Do nothing');
  })
  .catch(() => {
    console.log('Do nothing');
  });
