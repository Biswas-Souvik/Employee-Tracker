import {
  listEmployees,
  employeeWithProject,
  listProjects,
  employeePartofProject,
  projectWithEmployee,
  employeeInBench,
} from './utils/db.utils';

async function main() {
  console.log('\n========== EMPLOYEE PROJECT TRACKER ==========\n');

  const employees = await listEmployees();
  console.log('📋 All Employees:');
  console.table(employees);

  const employeesWithProjects = await employeeWithProject();
  console.log('\n👨‍💼 Employees with Assigned Projects:');
  console.table(employeesWithProjects);

  const projects = await listProjects();
  console.log('\n📁 All Projects:');
  console.table(projects);

  const employeesPerProject = await employeePartofProject();
  console.log('\n🧩 Employees per Project:');
  console.table(employeesPerProject);

  const projectsPerEmployee = await projectWithEmployee();
  console.log('\n🔁 Projects per Employee:');
  console.table(projectsPerEmployee);

  const benchEmployees = await employeeInBench();
  console.log('\n🪑 Employees on Bench (No Active Project):');
  console.table(benchEmployees);

  console.log('\n========== END ==========\n');
}

main();
