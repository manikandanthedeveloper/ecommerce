export interface DecodedToken {
	exp: number;
	role: string;
	[i: string]: unknown;
}
