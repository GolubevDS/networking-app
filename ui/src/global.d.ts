declare module '*.scss' {
	interface IClassNames {
		[className: string]: string;
	}

	const classnames: IClassNames;
	export = classnames;
}

declare module '*.svg' {
	import { ReactElement, SVGProps } from 'react';
	const content: (props: SVGProps<SVGElement>) => ReactElement;
	export default content;
}
