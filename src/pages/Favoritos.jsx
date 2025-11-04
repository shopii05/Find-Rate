import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Favoritos = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [lugares, setLugares] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchFavoritos = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/favoritos/${user.id_usuario}`);

        // Verificamos que haya contenido antes de llamar a res.json()
        const text = await res.text();
        const data = text ? JSON.parse(text) : [];

        if (!res.ok) {
          setError(data.message || "No se pudieron cargar los favoritos.");
        } else {
          setLugares(data || []);
        }
      } catch (err) {
        console.error(err);
        setError("Error al conectar con el servidor.");
      } finally {
        setLoading(false);
      }
    };

    fetchFavoritos();
  }, [user, navigate]);

  if (loading) return <p className="text-center mt-10">Cargando favoritos...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-yellow-100 to-pink-200 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 shadow-xl">
        <h1 className="text-3xl font-bold text-pink-600 mb-6 text-center">Tus Lugares Favoritos</h1>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {lugares.length === 0 ? (
          <p className="text-center text-gray-600">No tienes lugares favoritos aún.</p>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {lugares.map((lugar) => (
              <li key={lugar.id_lugar} className="border p-4 rounded-xl shadow hover:shadow-lg transition">
                <h2 className="font-semibold text-lg text-gray-700">{lugar.nombre}</h2>
                <p className="text-sm text-gray-500">{lugar.descripcion}</p>
                <p className="text-sm text-gray-400 mt-2">Ubicación: {lugar.ubicacion}</p>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-6 text-center">
          <Link
            to="/dashboard"
            className="text-pink-500 font-semibold hover:underline"
          >
            ← Volver al Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Favoritos;
