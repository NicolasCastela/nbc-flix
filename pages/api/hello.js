// src/services/api-service.js
import axios from "axios";

const apiService = axios.create({
  baseURL: "https://api.themoviedb.org/3", // URL base
  headers: {
    accept: "application/json",
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYjBlMjM1ODBhZWMzMWIxY2VlNDY5ZDNkNmI4ZjE4NyIsIm5iZiI6MTc1NzcwNzYyNC4xMjgsInN1YiI6IjY4YzQ3ZDY4N2ZhNzA5NGU1MGMzYjFjYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GLyE88Fli13FhSZAuNTIVZpKtxNV_ip1_xEqnRGGum8`,
  },
});

export default apiService;
