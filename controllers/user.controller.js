const { getAll, getById } = require("../schema/User.js");

exports.getAllPokemon = (req, res) => {
  try {
    const pokemons = getAll();
    res.status(201).json({ data: pokemons });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while get pokemons" });
  }
};

exports.getPokemon = (req, res) => {
  try {
    const { id } = req.params;
    const pokemon = getById(id);
    res.status(201).json({ data: pokemon });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while get pokemon" });
  }
};
