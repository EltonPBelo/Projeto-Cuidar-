CREATE DATABASE cuidar_bd;

USE cuidar_bd;
CREATE TABLE pacientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    genero ENUM('Masculino', 'Femenino', 'Otro') NOT NULL,
    telefono VARCHAR(15),
    direccion VARCHAR(255)
);

CEATE TABLE cuidadores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    telefono VARCHAR(15),
    relacion ENUM('Familiar', 'Profesional', 'Amigo') NOT NULL
);

CREATE TABLE cuidados (
    id INT AUTO_INCREMENT PRIMARY KEY,
    paciente_id INT,
    cuidador_id INT,
    tipo_cuidado ENUM('Medicación', 'Higiene', 'Alimentación', 'Ejercicio', 'Otro') NOT NULL,
    fecha DATE NOT NULL,
    hora TIME NOT NULL,
    notas TEXT,
    FOREIGN KEY (paciente_id) REFERENCES pacientes(id),
    FOREIGN KEY (cuidador_id) REFERENCES cuidadores(id)
);

CREATE TABLE citas_medicas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    paciente_id INT,
    fecha DATE NOT NULL,
    hora TIME NOT NULL,
    medico VARCHAR(100) NOT NULL,
    motivo TEXT,
    FOREIGN KEY (paciente_id) REFERENCES pacientes(id)
);


CREATE TABLE medicamentos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    paciente_id INT,
    nombre VARCHAR(100) NOT NULL,
    dosis VARCHAR(50) NOT NULL,
    frecuencia VARCHAR(50) NOT NULL,
    inicio DATE NOT NULL,
    fin DATE,
    FOREIGN KEY (paciente_id) REFERENCES pacientes(id)
);

CREATE TABLE historial_salud (
    id INT AUTO_INCREMENT PRIMARY KEY,
    paciente_id INT,
    condicion VARCHAR(100) NOT NULL,
    descripcion TEXT,
    fecha_diagnostico DATE NOT NULL,
    FOREIGN KEY (paciente_id) REFERENCES pacientes(id)
);

CREATE TABLE emergencias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    paciente_id INT,
    contacto_nombre VARCHAR(100) NOT NULL,
    contacto_telefono VARCHAR(15) NOT NULL,
    relacion ENUM('Familiar', 'Amigo', 'Otro') NOT NULL,
    FOREIGN KEY (paciente_id) REFERENCES pacientes(id)
);

CREATE TABLE notas_cuidador (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cuidador_id INT,
    paciente_id INT,
    fecha DATE NOT NULL,
    nota TEXT NOT NULL,
    FOREIGN KEY (cuidador_id) REFERENCES cuidadores(id),
    FOREIGN KEY (paciente_id) REFERENCES pacientes(id)
);

CREATE TABLE actividades_diarias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    paciente_id INT,
    actividad ENUM('Baño', 'Comida', 'Ejercicio', 'Medicamento', 'Otro') NOT NULL,
    fecha DATE NOT NULL,
    hora TIME NOT NULL,
    notas TEXT,
    FOREIGN KEY (paciente_id) REFERENCES pacientes(id)
);

CREATE TABLE evaluaciones_salud (
    id INT AUTO_INCREMENT PRIMARY KEY,
    paciente_id INT,
    fecha DATE NOT NULL,
    peso DECIMAL(5,2),
    presion_arterial VARCHAR(10),
    frecuencia_cardiaca INT,
    notas TEXT,
    FOREIGN KEY (paciente_id) REFERENCES pacientes(id)
);

CREATE TABLE registro_atividades (
    id INT AUTO_INCREMENT PRIMARY KEY,
    paciente_id INT,
    actividad VARCHAR(255) NOT NULL,
    fecha_hora DATETIME NOT NULL,
    duracion INT,
    FOREIGN KEY (paciente_id) REFERENCES pacientes(id)
);

CREATE TABLE feedback_cuidador (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cuidador_id INT,
    paciente_id INT,
    fecha DATE NOT NULL,
    calificacion INT CHECK (calificacion BETWEEN 1 AND 5),
    comentarios TEXT,
    FOREIGN KEY (cuidador_id) REFERENCES cuidadores(id),
    FOREIGN KEY (paciente_id) REFERENCES pacientes(id)
);

CREATE TABLE remedios_todos_dias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    paciente_id INT,
    nombre_remedio VARCHAR(100) NOT NULL,
    dosis VARCHAR(50) NOT NULL,
    frecuencia VARCHAR(50) NOT NULL,
    inicio DATE NOT NULL,
    fin DATE,
    FOREIGN KEY (paciente_id) REFERENCES pacientes(id)
);

CREATE TABLE seguimiento_hidratacion (
    id INT AUTO_INCREMENT PRIMARY KEY,
    paciente_id INT,
    fecha DATE NOT NULL,
    cantidad_agua_ml INT NOT NULL,
    notas TEXT,
    FOREIGN KEY (paciente_id) REFERENCES pacientes(id)
);

CREATE TABLE controle_alarmes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    paciente_id INT,
    tipo_alarma ENUM('Medicamento', 'Cita Médica', 'Actividad Diaria', 'Otro') NOT NULL,
    fecha_hora DATETIME NOT NULL,
    descripcion TEXT,
    FOREIGN KEY (paciente_id) REFERENCES pacientes(id)
);