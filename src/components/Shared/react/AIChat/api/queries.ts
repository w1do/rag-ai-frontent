import type { InitData } from "../model/types";

/**
 * Query (CQRS): получение начального состояния чата.
 * GET /share-chat/{chatId}/init — приветствие, быстрые действия, данные компании.
 */
export async function fetchInit(initEndpoint: string): Promise<InitData> {
    const res = await fetch(initEndpoint, {
        method: "GET",
        headers: { accept: "application/json", "X-CSRF-TOKEN": "" },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
    return (await res.json()) as InitData;
}
