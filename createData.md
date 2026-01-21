WITH inserted_employees AS (
INSERT INTO employees (employee_name, email, role, department)
VALUES
('Souvik Biswas', 'souvik@example.com', 'Backend Engineer', 'Engineering'),
('Naveen PL', 'np@example.com', 'Frontend Engineer', 'Engineering'),
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
(e.employee_name = 'Souvik Biswas' AND p.project_name IN ('Employee Tracker', 'URL Shortener'))
OR
(e.employee_name = 'Naveen PL' AND p.project_name = 'Employee Tracker')
);
