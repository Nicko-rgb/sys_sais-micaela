-- Active: 1727790809895@@127.0.0.1@3306@db_sais

CREATE VIEW personal_activo AS
SELECT nombres, estado
FROM personal_salud
WHERE estado = 'activo';