import { db } from "../index.js"; // tu conexión MySQL

// Obtener usuario por id
export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query("SELECT * FROM usuario WHERE id_usuario = ?", [id]);
    if (rows.length === 0) return res.status(404).json({ message: "Usuario no encontrado" });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al obtener usuario" });
  }
};

// Actualizar usuario por id
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    await db.query("UPDATE usuario SET ? WHERE id_usuario = ?", [data, id]);
    res.json({ message: "Perfil actualizado correctamente" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al actualizar usuario" });
  }
};
