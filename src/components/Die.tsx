import { Component } from "react";

interface Props {
	data: { value: number; isHeld: boolean };
	heldDieValue: (id: number) => void;
	id: number;
	isHeld: boolean;
}

export default class Die extends Component<Props> {
	render() {
		console.log(this.props.data);
		const bgStyles = {
			backgroundColor: this.props.isHeld === true ? "#3ed68a" : "#d2d2b2",
		};
		return (
			<div
				style={bgStyles}
				className='die'
				onClick={() => this.props.heldDieValue(this.props.id)}
			>
				{this.props.data.value}
			</div>
		);
	}
}
