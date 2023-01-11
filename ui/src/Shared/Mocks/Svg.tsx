import React, { forwardRef } from 'react';
import type { SVGProps }     from 'react';

const SvgrMock = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
	(props, ref) => <svg ref={ref} {...props} />,
);
SvgrMock.displayName = 'SvgrMock';

export default SvgrMock;
