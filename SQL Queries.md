# Employee Project Tracker – SQL Queries

This document contains SQL queries for the **Employee Project Tracker System**.

---

## List All Employees

```sql
SELECT *
FROM employees;
```

---

## List All Employees With Their Projects

```sql
SELECT *
FROM employees e
LEFT JOIN employee_projects ep
USING (employee_id)
LEFT JOIN projects p
USING (project_id)
ORDER BY e.employee_id;
```

---

## List Projects by Status (Active / Inactive)

```sql
SELECT *
FROM projects
WHERE status = 'ACTIVE';   -- or 'INACTIVE'
```

---

## List All Employees Currently Part of a Project

(Employees not yet released from a project)

```sql
SELECT *
FROM employees e
JOIN employee_projects ep
USING (employee_id)
WHERE ep.released_at IS NULL;
```

---

## List All Projects an Employee Is Part Of

```sql
SELECT *
FROM projects p
JOIN employee_projects ep
USING (project_id)
WHERE ep.released_at IS NULL;
```

---

## List All Employees on Bench

(Employees without a project or assigned to inactive projects)

```sql
SELECT *
FROM employees e
LEFT JOIN employee_projects ep
USING (employee_id)
LEFT JOIN projects p
USING (project_id)
WHERE ep.project_id IS NULL
   OR p.status = 'INACTIVE'
ORDER BY e.employee_id;
```
