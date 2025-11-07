export const authorizeRoles = (...allowed) => {
  return (req, res, next) => {
    try {
      const role = req.user?.role;
      if (!role) return res.status(401).json({ message: 'Sin rol en el token' });
      if (!allowed.includes(role)) {
        return res.status(403).json({ message: 'No tienes permisos para esta acción' });
      }
      next();
    } catch (e) {
      res.status(500).json({ message: 'Error en autorización' });
    }
  };
};
