import 'dotenv/config';

import {
  listEmployees,
  employeeWithProject,
  listProjects,
  employeePartofProject,
  projectWithEmployee,
  employeeInBench,
} from './utils/db.utils';

export const handler = async (event: any) => {
  try {
    const employees = await listEmployees();
    console.log('All Employees: ');
    console.table(employees);

    const employeesWithProjects = await employeeWithProject();
    console.log('\nEmployees with Projects: ');
    console.table(employeesWithProjects);

    const projects = await listProjects();
    console.log('\nAll Active Projects: ');
    console.table(projects);

    const employeesPerProject = await employeePartofProject();
    console.log('\nEmployees with Project: ');
    console.table(employeesPerProject);

    const projectsWithEmployee = await projectWithEmployee();
    console.log('\nProjects with Assigned Employees: ');
    console.table(projectsWithEmployee);

    const benchEmployees = await employeeInBench();
    console.log('\nEmployees on Bench (No Active Project): ');
    console.table(benchEmployees);
    return { statusCode: 200, body: 'Success' };
  } catch (err) {
    console.error((err as Error).message);
    return { statusCode: 500 };
  }
};
