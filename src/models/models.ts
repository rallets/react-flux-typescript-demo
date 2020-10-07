import { FormEvent } from 'react';

export interface Course {
	id: number | null;
	title: string;
	slug: string;
	authorId: number | null;
	category: string;
}

export interface Author {
	id: number | null;
	name: string;
}

export type OnSubmitEvent = FormEvent<HTMLFormElement>;
export type OnTextChangedEvent = React.ChangeEvent<HTMLInputElement>;
export type OnSelectChangedEvent = React.ChangeEvent<HTMLSelectElement>;

export interface FormErrors {
	[key: string]: string;
}
