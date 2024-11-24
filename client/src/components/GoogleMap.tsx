import React, { useState } from "react";
import axios from "axios";

const GoogleMap: React.FC = () => {
  const [origin, setOrigin] = useState<string>("Porto Alegre, RS");
  const [destination, setDestination] = useState<string>("Novo Hamburgo, RS");
  const [routeInfo, setRouteInfo] = useState<{
    duration?: string;
    distance?: string;
  }>({});

  const API_KEY = "";
  const API_URL = "https://maps.googleapis.com/maps/api/directions/json";

  const calculateRoute = async () => {
    try {
      const response = await axios.get(API_URL, {
        params: {
          origin,
          destination,
          mode: "driving",
          key: API_KEY,
        },
      });

      if (response.data.status === "OK") {
        const route = response.data.routes[0].legs[0];
        setRouteInfo({
          duration: route.duration.text,
          distance: route.distance.text,
        });
      } else {
        alert(`Erro: ${response.data.error_message}`);
      }
    } catch (error) {
      console.error("Erro ao calcular rota:", error);
      alert("Erro ao calcular rota. Verifique os dados inseridos.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Calculadora de Rotas</h1>
      <div style={{ marginBottom: "10px" }}>
        <label>
          Origem:
          <input
            type="text"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            style={{ marginLeft: "10px" }}
          />
        </label>
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label>
          Destino:
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            style={{ marginLeft: "10px" }}
          />
        </label>
      </div>
      <button onClick={calculateRoute}>Calcular Rota</button>
      {routeInfo.duration && routeInfo.distance && (
        <div style={{ marginTop: "20px" }}>
          <h2>Detalhes da Rota:</h2>
          <p>
            <strong>Duração:</strong> {routeInfo.duration}
          </p>
          <p>
            <strong>Distância:</strong> {routeInfo.distance}
          </p>
        </div>
      )}
    </div>
  );
};

export default GoogleMap;
