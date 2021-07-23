import React from 'react';
import pokemons from './data';
import Pokemon from './Pokemon';
import PropTypes from 'prop-types'

class Pokedex extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			pokemonIndex: 0,
			pokemonType: 'all',
			renderPokemon: [],
		};

		this.nextPokemon = this.nextPokemon.bind(this);
		this.filteredPokemon = this.filteredPokemon.bind(this);
		this.setPokemonState = this.setPokemonState.bind(this);
	}

	nextPokemon = () => {
		this.setState((beforeState) => ({
			pokemonIndex: beforeState.pokemonIndex +1,
		}));
		if(this.state.pokemonIndex=== 
			(this.state.pokemonType === 'all' ?
			pokemons.length : this.state.renderPokemon.length) - 1) {
			this.setState({ pokemonIndex: 0 });
		};
	}

	filteredPokemon = (target) => {
		if(target !== 'all') {
			const pokeFiltered = pokemons.filter((pokemon) => pokemon.type === target);
			return pokeFiltered;
		}

		return pokemons;
	}

	setPokemonState({ target }) {
		this.setState({ pokemonType: target.innerHTML, pokemonIndex: 0, renderPokemon: this.filteredPokemon(target.innerHTML) });
	}

	pokemonTypeArray = () => {
		const pokemonSet = new Set(pokemons.map(({ type }) => type));
		return Array.from(pokemonSet);
	}

	render() {
		const { pokemons } = this.props;
		const { pokemonIndex, renderPokemon } = this.state;
		return (
			<div>
				<div className="pokedex">
					{<Pokemon key={pokemons.id} pokemon={renderPokemon.length === 0 ? pokemons[pokemonIndex] : renderPokemon[pokemonIndex]} />}
				</div>
				<div className="type-buttons">
					<button onClick={ this.setPokemonState }>All</button>
					{this.pokemonTypeArray().map((item) => 
					<button onClick={ this.setPokemonState }>{ item }</button>
					)}
				</div>
				<div className="next-button">
					<button onClick={ this.nextPokemon }>Next Pokemon</button>
				</div>
			</div>
		);
	}
}

export default Pokedex;