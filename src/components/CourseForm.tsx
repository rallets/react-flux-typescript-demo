import React from "react";
import TextInput from "./common/TextInput";
import { Course, FormErrors, OnSubmitEvent, OnSelectChangedEvent, OnTextChangedEvent } from '../models/models';

function CourseForm(props: {
	onSubmit: (event: OnSubmitEvent) => void,
	onTextChange: (event: OnTextChangedEvent) => void,
	onSelectChange: (event: OnSelectChangedEvent) => void,
	course: Course,
	errors: FormErrors
}) {
	return (
		<form onSubmit={props.onSubmit}>
			<TextInput
				id="title"
				label="Title"
				onChange={props.onTextChange}
				name="title"
				value={props.course.title}
				error={props.errors.title}
			/>

			<div className="form-group">
				<label htmlFor="author">Author</label>
				<div className="field">
					<select
						id="author"
						name="authorId"
						onChange={props.onSelectChange}
						value={props.course.authorId || undefined}
						className="form-control"
					>
						<option value="" />
						<option value="1">Cory House</option>
						<option value="2">Scott Allen</option>
					</select>
				</div>
				{props.errors.authorId && (
					<div className="alert alert-danger">{props.errors.authorId}</div>
				)}
			</div>

			<TextInput
				id="category"
				label="Category"
				name="category"
				onChange={props.onTextChange}
				value={props.course.category}
				error={props.errors.category}
			/>

			<input type="submit" value="Save" className="btn btn-primary" />
		</form>
	);
}

export default CourseForm;
