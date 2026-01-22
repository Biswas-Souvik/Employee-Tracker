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
    const { q } = event?.queryStringParameters ?? {};
    console.log(q);

    let output = {};
    switch (q) {
      case 'employees':
        output = await listEmployees();
        break;
      case 'employeesProjects':
        output = await employeeWithProject();
        break;
      case 'projects':
        output = await listProjects();
        break;
      case 'employeesActive':
        output = await employeePartofProject();
        break;
      case 'projectsActive':
        output = await projectWithEmployee();
        break;
      case 'employeesBench':
        output = await employeeInBench();
        break;
      default:
        console.error('Invalid Query String: ' + q);
    }

    return { statusCode: 200, body: JSON.stringify(output) };
  } catch (err) {
    console.error((err as Error).message);
    return { statusCode: 500 };
  }
};
