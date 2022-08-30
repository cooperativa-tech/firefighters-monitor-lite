import type { RequestEvent } from '@sveltejs/kit';

function sendToDiscord(content: string) {
	return fetch('/api/discord', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			content: content.trim()
		})
	});
}

export async function handleError(error: Error | string, extra?: any) {
	console.error(error);

	//if (import.meta.env.MODE === 'development') return;

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

export async function handleServerError(error: Error & { frame?: string }, event: RequestEvent) {
	console.error(error);

	if (import.meta.env.MODE === 'development') return;

	await sendToDiscord(`\`\`\`
${error.stack}

${JSON.stringify(event, null, 2)}
\`\`\`
	`);
}
