interface Product {
	id: number;
	name: string;
	price: string;
	description: string;
	provider_id: number;
	provider_name: string;
}

interface Link {
	url: string | null;
	label: string;
	active: boolean;
}

interface Meta {
	current_page: number;
	from: number;
	last_page: number;
	links: Link[];
	path: string;
	per_page: number;
	to: number;
	total: number;
}

interface IndexProductsResponseInterface {
	data: Product[];
	links: {
		first: string;
		last: string;
		prev: string | null;
		next: string | null;
	};
	meta: Meta;
}

export type { Product, Link, Meta, IndexProductsResponseInterface };