import { db } from './db';
import { employees } from '../schema/employees';
import { projects } from '../schema/projects';
import { employeeProjects } from '../schema/employee_projects';

import { eq, and, or, isNull } from 'drizzle-orm';
import { alias } from 'drizzle-orm/pg-core';

const e = alias(employees, 'e');
const ep = alias(employeeProjects, 'ep');
const p = alias(projects, 'p');

export async function listEmployees() {
  const allEmployees = await db.select().from(e);

  return allEmployees;
}

export async function employeeWithProject() {
  const employeesInProject = await db
    .select()
    .from(e)
    .leftJoin(ep, eq(ep.employeeId, e.employeeId))
    .leftJoin(p, eq(ep.projectId, p.projectId))
    .orderBy(e.employeeId);
  return employeesInProject;
}

export async function listProjects() {
  const activeProjects = await db
    .select()
    .from(p)
    .where(eq(p.status, 'ACTIVE'));

  return activeProjects;
}

export async function employeePartofProject() {
  const employeesInProject = await db
    .select()
    .from(e)
    .innerJoin(ep, eq(ep.employeeId, e.employeeId))
    .where(isNull(ep.releasedAt));

  return employeesInProject;
}

export async function projectWithEmployee() {
  const projectsForEmployee = await db
    .select()
    .from(p)
    .innerJoin(ep, eq(ep.projectId, p.projectId))
    .where(isNull(ep.releasedAt));
  return projectsForEmployee;
}

export async function employeeInBench() {
  const benchEmployees = await db
    .select()
    .from(e)
    .leftJoin(ep, eq(e.employeeId, ep.employeeId))
    .leftJoin(p, eq(ep.projectId, p.projectId))
    .where(or(isNull(p.projectId), eq(p.status, 'INACTIVE')))
    .orderBy(e.employeeId);
  return benchEmployees;
}
