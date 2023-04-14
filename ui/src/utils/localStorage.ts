export const getLocalStorageItem = (key: string) => {
	const item = localStorage.getItem(key);
	return item !== null ? JSON.parse(item) : null;
};

export const setLocalStorageItem = (key: string, value: unknown) => {
	localStorage.setItem(
		key,
		JSON.stringify(
			typeof value === 'undefined' ? '' : value,
		),
	);
};