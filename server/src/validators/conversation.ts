import * as yup from 'yup';

export const createMessageRequest = yup.object({
	conversationId: yup.number().required(),
	text: yup.string().required(),
});

