import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const EditarPerfil = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")); // { id_usuario, rol, etc. }

  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchPerfil = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/auth/${user.id_usuario}`);
        const text = await res.text();
        const data = text ? JSON.parse(text) : null;

        if (!res.ok) {
          setError(data?.message || "No se pudo cargar el perfil.");
        } else if (data) {
          setFormData(data);
        }
      } catch (err) {
        console.error(err);
        setError("Error al conectar con el servidor.");
      } finally {
        setLoading(false);
      }
    };

    fetchPerfil();
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await fetch(`http://localhost:5000/api/auth/${user.id_usuario}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const text = await res.text();
      const data = text ? JSON.parse(text) : null;

      if (!res.ok) {
        setError(data?.message || "No se pudo actualizar el perfil.");
      } else {
        setSuccess("Perfil actualizado correctamente.");
        localStorage.setItem("user", JSON.stringify(data)); // actualizar localStorage
      }
    } catch (err) {
      console.error(err);
      setError("Error al conectar con el servidor.");
    }
  };

  if (loading) return <p className="text-center mt-10">Cargando perfil...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-yellow-100 to-pink-200 p-6 flex justify-center">
      <div className="max-w-2xl w-full bg-white rounded-3xl p-8 shadow-xl">
        <h1 className="text-3xl font-bold text-pink-600 mb-6 text-center">Editar Perfil</h1>

        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold text-gray-700">Nombre</label>
            <input
              type="text"
              name="nombre_usuario"
              value={formData.nombre_usuario || ""}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700">Apellido</label>
            <input
              type="text"
              name="apellido_usuario"
              value={formData.apellido_usuario || ""}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700">Correo</label>
            <input
              type="email"
              name="correo_usuario"
              value={formData.correo_usuario || ""}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700">Teléfono</label>
            <input
              type="text"
              name="telefono_usuario"
              value={formData.telefono_usuario || ""}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-pink-500 text-white font-semibold py-2 rounded hover:bg-pink-600 transition"
          >
            Guardar cambios
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditarPerfil;
