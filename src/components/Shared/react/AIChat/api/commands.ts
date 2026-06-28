import { REQUEST_TIMEOUT } from "./endpoints";

/**
 * Command (CQRS): отправка вопроса ассистенту.
 * POST /share-chat/{chatId}/message — возвращает текст ответа бота.
 */
export async function sendMessage(endpoint: string, question: string): Promise<string> {
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

    try {
        const res = await fetch(endpoint, {
            method: "POST",
            headers: {
                accept: "application/json",
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": "",
            },
            body: JSON.stringify({ question }),
            signal: controller.signal,
        });

        if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);

        const data = await res.json();
        return String(data?.answer ?? data?.message ?? "Извините, я не смог обработать ответ.");
    } finally {
        window.clearTimeout(timeoutId);
    }
}
