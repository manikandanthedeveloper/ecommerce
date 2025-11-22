export interface PaginationProps {
	pageNumber: number;
	setPageNumber: (page: number) => void;
	totalItem: number;
	parPage: number;
	showItem: number;
}
