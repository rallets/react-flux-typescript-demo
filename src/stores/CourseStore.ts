import { EventEmitter } from 'events';
import Dispatcher from '../appDispatcher';
import actionTypes from '../actions/actionTypes';
import { Course } from '../models/models';

export interface CourseActionBase {
	actionType: string;
}

export interface DeleteCourseAction extends CourseActionBase {
	id: number;
}

export interface UpdateCourseAction extends CourseActionBase {
	id?: number;
	course: Course;
}

export interface CreateCourseAction extends CourseActionBase {
	course: Course;
}

export interface LoadCourseAction extends CourseActionBase {
	courses: Course[];
}

const CHANGE_EVENT = 'change';
let _courses: Course[] = [];

class CourseStore extends EventEmitter {
	addChangeListener(callback: (...args: any[]) => void) {
		this.on(CHANGE_EVENT, callback);
	}

	removeChangeListener(callback: (...args: any[]) => void) {
		this.removeListener(CHANGE_EVENT, callback);
	}

	emitChange() {
		this.emit(CHANGE_EVENT);
	}

	getCourses() {
		return _courses;
	}

	getCourseBySlug(slug: string) {
		return _courses.find((course) => course.slug === slug);
	}
}

const store = new CourseStore();

Dispatcher.register((payload: unknown) => {
	const action = payload as CourseActionBase;

	switch (action.actionType) {
		case actionTypes.DELETE_COURSE:
			_courses = _courses.filter(
				(course) => course.id !== (action as DeleteCourseAction).id
			);
			store.emitChange();
			break;

		case actionTypes.CREATE_COURSE:
			_courses.push((action as CreateCourseAction).course);
			store.emitChange();
			break;

		case actionTypes.UPDATE_COURSE:
			const updateAction = action as UpdateCourseAction;
			_courses = _courses.map((course) =>
				course.id === updateAction.course.id ? updateAction.course : course
			);
			store.emitChange();
			break;

		case actionTypes.LOAD_COURSES:
			_courses = (action as LoadCourseAction).courses;
			store.emitChange();
			break;
		default:
		// nothing to do here
	}
});

export default store;
