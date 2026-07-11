export const uniqueSuffix = () => `${Date.now()}-${Math.floor(Math.random() * 10000)}`;

export const makeUserData = () => {
  const suffix = uniqueSuffix();
  return {
    nombre: `E2E Usuario ${suffix}`,
    usuario: `e2e-user-${suffix}`,
    password: 'E2ePass123!',
    rol: 'USUARIO'
  };
};

export const makeEquipmentData = () => {
  const suffix = uniqueSuffix();
  return {
    nombre: `E2E Equipo ${suffix}`,
    descripcion: `Equipo creado por pruebas E2E ${suffix}`,
    codigoInventario: `E2E-${suffix}`
  };
};

export const tomorrowDateInput = () => {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  return date.toISOString().slice(0, 10);
};
