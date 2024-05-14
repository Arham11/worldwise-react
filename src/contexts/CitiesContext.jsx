import { createContext, useContext, useEffect, useState } from "react";

const BASE_URL = "http://localhost:8000";

// 1) Create a Context
const CityContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [currentCity, setCurrentCity] = useState({});

  useEffect(function () {
    async function fetchCities() {
      try {
        setIsLoading(true);
        let res = await fetch(`${BASE_URL}/cities`);
        let data = await res.json();
        setCities(data);
      } catch {
        throw new Error("Something went wrong");
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  async function getCity(id) {
    try {
      setIsLoading(true);
      let res = await fetch(`${BASE_URL}/cities/${id}`);
      let data = await res.json();
      setCurrentCity(data);
    } catch {
      throw new Error("Something went wrong in fetching city");
    } finally {
      setIsLoading(false);
    }
  }

  /**
   * create a newCity
   * @param {*} newCity
   */
  async function createCity(newCity) {
    try {
      setIsLoading(true);
      let res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      let data = await res.json();
      setCities((cities) => [...cities, data]);
    } catch {
      throw new Error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteCity(city) {
    setIsLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/cities/${city.id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
      });
      const data = await res.json();
      setCities((cities) => cities.filter((c) => c.id !== city.id));
    } catch (err) {
      throw new Error("Something went wrong while deleting the City");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CityContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CityContext.Provider>
  );
}

function useCities() {
  const context = useContext(CityContext);
  if (context === undefined)
    throw new Error("CitiesContext was used outside the CitiesProvider");
  return context;
}

export { CitiesProvider, useCities };
