import dispatcher from '../appDispatcher';
import * as courseApi from '../api/courseApi';
import actionTypes from './actionTypes';
import { Course } from '../models/models';
import {
	CreateCourseAction,
	DeleteCourseAction,
	LoadCourseAction,
	UpdateCourseAction,
} from '../stores/CourseStore';

export function saveCourse(course: Course) {
	return courseApi.saveCourse(course).then((savedCourse) => {
		// Hey dispatcher, go tell all the stores that a course was just created.
		course.id
			? dispatcher.dispatch({
					actionType: actionTypes.UPDATE_COURSE,
					course: savedCourse,
			  } as UpdateCourseAction)
			: dispatcher.dispatch({
					actionType: actionTypes.CREATE_COURSE,
					course: savedCourse,
			  } as CreateCourseAction);
	});
}

export function loadCourses() {
	return courseApi.getCourses().then((courses) => {
		dispatcher.dispatch({
			actionType: actionTypes.LOAD_COURSES,
			courses: courses,
		} as LoadCourseAction);
	});
}

export function deleteCourse(id: number) {
	return courseApi.deleteCourse(id).then(() => {
		dispatcher.dispatch({
			actionType: actionTypes.DELETE_COURSE,
			id: id,
		} as DeleteCourseAction);
	});
}
