export interface MenuItem {
	id: number;
	title: string;
	path: string;
	icon: React.ReactNode;
	badge?: number;
	role: string;
}
