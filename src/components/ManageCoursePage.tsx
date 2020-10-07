import React, { useState, useEffect } from "react";
import CourseForm from "./CourseForm";
import courseStore from "../stores/CourseStore";
import { toast } from "react-toastify";
import * as courseActions from "../actions/courseActions";
import { RouteComponentProps } from 'react-router-dom';
import { Course, FormErrors, OnSelectChangedEvent, OnSubmitEvent, OnTextChangedEvent } from '../models/models';
import { History, LocationState } from "history";

interface MyComponentProps extends RouteComponentProps<{ slug: string }> {
	history: History<LocationState>;
}

const ManageCoursePage = (props: MyComponentProps) => {
	const [errors, setErrors] = useState({});
	const [courses, setCourses] = useState(courseStore.getCourses());
	const [course, setCourse] = useState({
		id: null,
		slug: "",
		title: "",
		authorId: null,
		category: ""
	} as Course);

	useEffect(() => {
		courseStore.addChangeListener(onChange);
		const slug = props.match.params.slug; // from the path `/courses/:slug`
		if (courses.length === 0) {
			courseActions.loadCourses();
		} else if (slug) {
			const course = courseStore.getCourseBySlug(slug);
			if (course) {
				setCourse(course);
			}
		}
		return () => courseStore.removeChangeListener(onChange);
	}, [courses.length, props.match.params.slug]);

	function onChange() {
		setCourses(courseStore.getCourses());
	}

	function handleTextChange(e: OnTextChangedEvent) {
		setCourse({
			...course,
			[e.target.name]: e.target.value,
		});
	}

	function handleSelectChange(e: OnSelectChangedEvent) {
		setCourse({
			...course,
			[e.target.name]: +e.target.value,
		});
	}

	function formIsValid() {
		const _errors: FormErrors = {};

		if (!course.title) _errors.title = "Title is required";
		if (!course.authorId) _errors.authorId = "Author ID is required";
		if (!course.category) _errors.category = "Category is required";

		setErrors(_errors);
		// Form is valid if the errors object has no properties
		return Object.keys(_errors).length === 0;
	}

	function handleSubmit(event: OnSubmitEvent) {
		event.preventDefault();
		if (!formIsValid()) return;
		courseActions.saveCourse(course).then(() => {
			props.history.push("/courses");
			toast.success("Course saved.");
		});
	}

	return (
		<>
			<h2>Manage Course</h2>
			<CourseForm
				errors={errors}
				course={course}
				onTextChange={handleTextChange}
				onSelectChange={handleSelectChange}
				onSubmit={handleSubmit}
			/>
		</>
	);
};

export default ManageCoursePage;
