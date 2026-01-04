import { db } from './db';
import { employees } from '../schema/employees';
import { projects } from '../schema/projects';
import { employeeProjects } from '../schema/employee_projects';

import { eq, or, isNull } from 'drizzle-orm';
import { alias } from 'drizzle-orm/pg-core';

const e = alias(employees, 'e');
const ep = alias(employeeProjects, 'ep');
const p = alias(projects, 'p');

export async function listEmployees() {
  return await db
    .select({
      employeeId: e.employeeId,
      employeeName: e.employeeName,
      employeeEmail: e.email,
    })
    .from(e);
}

export async function employeeWithProject() {
  return await db
    .select({
      employeeId: e.employeeId,
      employeeName: e.employeeName,
      employeeEmail: e.email,

      projectId: p.projectId,
      projectName: p.projectName,
      projectStatus: p.status,
    })
    .from(e)
    .leftJoin(ep, eq(ep.employeeId, e.employeeId))
    .leftJoin(p, eq(ep.projectId, p.projectId))
    .orderBy(e.employeeId);
}

export async function listProjects() {
  return await db
    .select({
      projectId: p.projectId,
      projectName: p.projectName,
      status: p.status,
    })
    .from(p)
    .where(eq(p.status, 'ACTIVE'));
}

export async function employeePartofProject() {
  return await db
    .select({
      employeeId: e.employeeId,
      employeeName: e.employeeName,
      projectId: ep.projectId,
      assignedAt: ep.assignedAt,
    })
    .from(e)
    .innerJoin(ep, eq(ep.employeeId, e.employeeId))
    .where(isNull(ep.releasedAt));
}

export async function projectWithEmployee() {
  return await db
    .select({
      projectId: p.projectId,
      projectName: p.projectName,
      employeeId: ep.employeeId,
      assignedAt: ep.assignedAt,
    })
    .from(p)
    .innerJoin(ep, eq(ep.projectId, p.projectId))
    .where(isNull(ep.releasedAt));
}

export async function employeeInBench() {
  return await db
    .select({
      employeeId: e.employeeId,
      employeeName: e.employeeName,
      employeeEmail: e.email,
    })
    .from(e)
    .leftJoin(ep, eq(e.employeeId, ep.employeeId))
    .leftJoin(p, eq(ep.projectId, p.projectId))
    .where(or(isNull(p.projectId), eq(p.status, 'INACTIVE')))
    .orderBy(e.employeeId);
}
