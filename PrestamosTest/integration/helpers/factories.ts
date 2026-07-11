export const uniqueSuffix = () => `${Date.now()}-${Math.floor(Math.random() * 100000)}`;

export const userData = (overrides: Partial<{ usuario: string; password: string; nombre: string; rol: string; activo: boolean }> = {}) => {
  const suffix = uniqueSuffix();
  return {
    usuario: `it-user-${suffix}`,
    password: 'Test123!',
    nombre: `Integration User ${suffix}`,
    rol: 'USUARIO',
    activo: true,
    ...overrides
  };
};

export const equipmentData = (overrides: Partial<{ nombre: string; descripcion: string | null; codigoInventario: string; estado: string }> = {}) => {
  const suffix = uniqueSuffix();
  return {
    nombre: `Integration Equipment ${suffix}`,
    descripcion: `Integration equipment ${suffix}`,
    codigoInventario: `IT-${suffix}`,
    estado: 'DISPONIBLE',
    ...overrides
  };
};

export const tomorrowIso = () => {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  return date.toISOString();
};
