import type { MenuItem } from "../models/MenuItem";
import { allNavs } from "./allNavs";

export const getNavs = (role: string) => {
	const finalNavs: MenuItem[] = [];

	allNavs.forEach((nav) => {
		if (nav.role === role) {
			finalNavs.push(nav);
		}
	});

	return finalNavs;
};
