export interface UserInputProps {
	label: string;
	name: string;
	type?: "text" | "email" | "password" | "checkbox";
	placeholder?: string;
	value?: string | boolean;
	error?: string;
	onChange: React.ChangeEventHandler<HTMLInputElement>;
	inputRef?: React.RefObject<HTMLInputElement | null>;
}
