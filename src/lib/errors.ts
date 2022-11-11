import type { RequestEvent } from '@sveltejs/kit';

function sendToDiscord(content: string, fetchFn?: typeof fetch) {
	return (fetchFn || fetch)('/api/discord', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			content: content.trim()
		})
	});
}

export async function handleClientError(error: Error | string, extra?: any) {
	if ((error as any).message.startsWith('Not found:')) return;

	console.error(error);

	if (import.meta.env.MODE === 'development') return;

	if (typeof error === 'string')
		return sendToDiscord(`\`\`\`
Simple error: ${error}

${extra ? JSON.stringify(extra, null, 2) : ''}
\`\`\`
`);

	return sendToDiscord(`\`\`\`
${error.stack}

${extra ? JSON.stringify(extra, null, 2) : ''}
\`\`\`
	`);
}

export async function handleServerError(error: unknown, event: RequestEvent) {
	if ((error as any).message.startsWith('Not found:')) return;

	console.error(error);

	if (import.meta.env.MODE === 'development') return;

	await sendToDiscord(
		`\`\`\`
${(error as any).stack}

${JSON.stringify(event, null, 2)}
\`\`\`
	`,
		event.fetch
	);
}
