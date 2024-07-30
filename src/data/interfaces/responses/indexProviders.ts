interface Provider {
	id: number;
	name: string;
	address: string;
	phone: string;
	description: string;
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

interface IndexProvidersResponseInterface {
	data: Provider[];
	links: {
		first: string;
		last: string;
		prev: string | null;
		next: string | null;
	};
	meta: Meta;
}

export type { Provider, Link, Meta, IndexProvidersResponseInterface };