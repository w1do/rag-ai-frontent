import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ChatMessage, InitData, Role } from "../model/types";
import { buildEndpoints } from "../api/endpoints";
import { fetchInit } from "../api/queries";
import { sendMessage } from "../api/commands";

interface UseChatOptions {
    apiBase: string;
    chatId: number | string;
    greeting?: string;
}

/**
 * Хук-«фасад» чата: инкапсулирует состояние сообщений, инициализацию (query)
 * и отправку вопроса (command), отдавая компоненту только данные и действия.
 */
export function useChat({ apiBase, chatId, greeting }: UseChatOptions) {
    const endpoints = useMemo(() => buildEndpoints(apiBase, chatId), [apiBase, chatId]);

    const [messages, setMessages] = useState<ChatMessage[]>(
        greeting ? [{ id: 0, role: "bot", text: greeting }] : []
    );
    const [busy, setBusy] = useState(false);
    const [info, setInfo] = useState<InitData | null>(null);
    const [actions, setActions] = useState<string[]>([]);

    const idRef = useRef(1);

    const addMessage = useCallback((role: Role, text: string, isError = false) => {
        setMessages((prev) => [...prev, { id: idRef.current++, role, text, isError }]);
    }, []);

    // Инициализация чата: приветствие, быстрые действия и данные о компании.
    useEffect(() => {
        let cancelled = false;
        (async () => {
            try {
                const data = await fetchInit(endpoints.init);
                if (cancelled) return;
                setInfo(data);
                if (Array.isArray(data.actions)) setActions(data.actions);
                if (data.welcome_message) {
                    setMessages([{ id: 0, role: "bot", text: data.welcome_message }]);
                }
            } catch (err) {
                console.error("[AIChat] Ошибка инициализации", endpoints.init, err);
            }
        })();
        return () => {
            cancelled = true;
        };
    }, [endpoints.init]);

    const send = useCallback(
        async (question: string) => {
            const text = question.trim();
            if (!text || busy) return;

            addMessage("user", text);
            setBusy(true);
            try {
                const answer = await sendMessage(endpoints.message, text);
                addMessage("bot", answer);
            } catch (err) {
                console.error("[AIChat] Ошибка запроса к", endpoints.message, err);
                const aborted = err instanceof DOMException && err.name === "AbortError";
                addMessage(
                    "bot",
                    aborted
                        ? "Ассистент не ответил вовремя. Пожалуйста, попробуйте ещё раз."
                        : "Не удалось связаться с ассистентом. Пожалуйста, попробуйте ещё раз.",
                    true
                );
            } finally {
                setBusy(false);
            }
        },
        [busy, endpoints.message, addMessage]
    );

    return { messages, busy, info, actions, send };
}
