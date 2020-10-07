import React from "react";
import { OnTextChangedEvent } from '../../models/models';

function TextInput(props: {
	id: string,
	label: string,
	name: string,
	value: string,
	error?: string,
	onChange: (event: OnTextChangedEvent) => void,
}) {
	let wrapperClass = "form-group";
	if (props.error?.length) {
		wrapperClass += " has-error";
	}

	return (
		<div className={wrapperClass}>
			<label htmlFor={props.id}>{props.label}</label>
			<div className="field">
				<input
					id={props.id}
					type="text"
					onChange={props.onChange}
					name={props.name}
					className="form-control"
					value={props.value}
				/>
			</div>
			{props.error && <div className="alert alert-danger">{props.error}</div>}
		</div>
	);
}

export default TextInput;
