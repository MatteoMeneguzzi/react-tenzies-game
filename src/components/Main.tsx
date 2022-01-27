import { Component } from "react";
import Die from "./Die";

interface State {
	dice: {
		value: number;
		isHeld: boolean;
		id: number;
	}[];
}

export default class Main extends Component<{}, State> {
	generateRandomIntegerInRange(min: number, max: number) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	allNewDice = () => {
		const numbersArray: {
			value: number;
			isHeld: boolean;
			id: number;
		}[] = [];

		for (let index = 0; index < 10; index++) {
			const number = {
				value: this.generateRandomIntegerInRange(1, 6),
				isHeld: false,
				id: Math.floor(Math.random() * 100000) + 1,
			};

			if (numbersArray.indexOf(number) === -1) {
				numbersArray.push(number);
			}
		}
		console.log(numbersArray[1]);

		return numbersArray;
	};
	state = {
		dice: this.allNewDice(),
	};

	rollDice = () => {
		this.setState((prevState) => {
			const prevDice = prevState.dice;
			const newDice = [];
			for (let index = 0; index < prevDice.length; index++) {
				const currentDie = prevDice[index];
				if (currentDie.isHeld === true) {
					newDice.push(currentDie);
				} else {
					const updatedDie = {
						...currentDie,
						isHeld: false,
						value: this.generateRandomIntegerInRange(1, 6),
						id: Math.floor(Math.random() * 100000) + 1,
					};
					newDice.push(updatedDie);
				}
			}
			return {
				...(prevState = {
					dice: newDice,
				}),
			};
		});
	};

	heldValue = (id: number) => {
		this.setState((prevState) => {
			const prevDice = prevState.dice;
			const newDice = [];
			for (let index = 0; index < prevDice.length; index++) {
				const currentDie = prevDice[index];
				if (currentDie.id === id) {
					const updatedDie = {
						...currentDie,
						isHeld: !currentDie.isHeld,
					};
					newDice.push(updatedDie);
				} else {
					newDice.push(currentDie);
				}
			}
			return {
				...(prevState = {
					dice: newDice,
				}),
			};
		});
		console.log(this.state.dice);
	};

	render() {
		const dice = this.state.dice;
		console.log(this.state);

		const diceList = dice.map((die, index) => {
			return (
				<Die
					data={die}
					key={index}
					id={die.id}
					isHeld={die.isHeld}
					heldDieValue={this.heldValue}
				/>
			);
		});
		return (
			<div className='main'>
				<div className='die-container'>{diceList}</div>
				<button onClick={this.rollDice}>roll</button>
			</div>
		);
	}
}
