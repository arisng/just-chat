import type { ChatMessage } from "./storage";

export interface WebhookRequest {
	message: string;
	timestamp: string;
	sessionId: string;
	context: {
		url: string;
	};
	history?: ChatMessage[];
}

export interface WebhookResponse {
  response: string;
}

export class WebhookService {
	private readonly url: string;
	private controller: AbortController | null = null;

	constructor(webhookUrl: string) {
		this.url = webhookUrl;
	}

	public async sendMessage(request: WebhookRequest): Promise<WebhookResponse> {
		// Cancel any existing request
		if (this.controller) {
			this.controller.abort();
		}

		this.controller = new AbortController();

		try {
			const response = await fetch(this.url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(request),
				signal: this.controller.signal,
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();
			this.controller = null;
			return data;
		} catch (error) {
			if (error instanceof Error && error.name === "AbortError") {
				throw new Error("Request cancelled");
			}
			throw error;
		}
	}

	public cancelRequest(): void {
		if (this.controller) {
			this.controller.abort();
			this.controller = null;
		}
	}
}
