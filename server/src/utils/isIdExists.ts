export function isIdExists(id?: number): id is number {
	return typeof id === 'number';
}