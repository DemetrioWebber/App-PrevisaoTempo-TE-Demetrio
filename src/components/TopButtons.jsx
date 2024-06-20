import React from "react";

const TopButtons = ({setQuery}) => {
  const cities = [
    {
      id: 1,
      title: "Passo Fundo",
    },
    {
      id: 2,
      title: "Porto Alegre",
    },
    {
      id: 3,
      title: "São Paulo",
    },
    {
      id: 4,
      title: "Lagoa Vermelha",
    },
  ];
  return (
    <div className="flex items-center justify-around my-1">
      {cities.map((city) => (
        <button key={city.id} className="text-white text-lg font-medium" onClick={ () => setQuery({q : city.title})}>{city.title}</button>
      ))}
    </div>
  );
};

export default TopButtons;
