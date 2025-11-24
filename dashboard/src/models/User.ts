export interface User {
	_id?: string;
	name: string;
	email: string;
	password?: string;
	confirmpassword?: string;
	policyAccepted?: boolean;
	role?: string;
	shopInfo?: {
		name?: string;
		description?: string;
		address?: string;
	};
	status?: string;
	createdAt?: string;
	updatedAt?: string;
}
