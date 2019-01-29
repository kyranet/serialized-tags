declare module 'js-tags' {

	export class ArrayTag extends Array<JSTag> implements JSTag {
		public display(): this;
		public parse(element: unknown[]): this;
		public get(index: 'random' | number): JSTag | null;
		public first(): JSTag | null;
		public last(): JSTag | null;
		public random(): JSTag | null;
	}

	export class BlockTag extends Map<string, JSTag> implements JSTag {
		public display(): this;
		public parse(element: Record<string, unknown>): this;
	}

	export class StringTag implements JSTag {
		public constructor();
		public display(values?: unknown[]): string;
		public parse(element: string): this;
	}

	export class ValueTag<T = unknown> implements JSTag {
		public constructor();
		public value: T;
		public display(): T;
		public parse(element: T): this;
	}

	interface JSTag {
		display(): unknown;
		parse(element?: unknown): this;
	}

}
