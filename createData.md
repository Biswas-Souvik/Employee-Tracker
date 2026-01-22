WITH inserted_employees AS (
INSERT INTO employees (employee_name, email, role, department)
VALUES
('Souvik', 'souvik@example.com', 'Backend Engineer', 'Engineering'),
('Manikanta', 'manikanta@example.com', 'Frontend Engineer', 'Engineering'),
('Dheeraj', 'dgb@example.com', 'Senion Full-Stack Engineer', 'Quality')
RETURNING employee_id, employee_name
),
inserted_projects AS (
INSERT INTO projects (project_name, status)
VALUES
('Employee Tracker', 'ACTIVE'),
('URL Shortener', 'ACTIVE'),
('Leave Tracker', 'INACTIVE')
RETURNING project_id, project_name
)
INSERT INTO employee_projects (employee_id, project_id)
SELECT e.employee_id, p.project_id
FROM inserted_employees e
JOIN inserted_projects p
ON (
(e.employee_name = 'Souvik' AND p.project_name IN ('Employee Tracker', 'URL Shortener'))
OR
(e.employee_name = 'Manikanta' AND p.project_name = 'Employee Tracker')
);
