import { useCallback, useEffect, useRef, useState } from "react";
import { marked } from "marked";
import "./AIChat.css";

export interface AIChatProps {
    title?: string;
    subtitle?: string;
    inputPlaceholder?: string;
    greeting?: string;
    /** Базовый адрес API (без завершающего слэша). Пусто = тот же origin. */
    apiBase?: string;
    /** Идентификатор share-chat сессии. */
    chatId?: number | string;
}

type Role = "user" | "bot";

interface ChatMessage {
    id: number;
    role: Role;
    text: string;
    isError?: boolean;
}

interface InitData {
    welcome_message?: string;
    actions?: string[];
    company_name?: string;
    phone?: string;
    description?: string;
    social_networks?: Record<string, string>;
}

marked.setOptions({ breaks: true, gfm: true });

const ASSISTANT_NAME = "Ассистент";
const USER_NAME = "Я";
const REQUEST_TIMEOUT = 30000;

export default function AIChat({
    title = "Чат с ИИ-ассистентом",
    subtitle = "Спросите что угодно — умный ИИ-агент BotSync ответит мгновенно",
    inputPlaceholder = "Напишите сообщение...",
    greeting = "Здравствуйте! Я — ИИ-ассистент BotSync. Чем могу помочь?",
    apiBase = "http://localhost/",
    chatId = 2,
}: AIChatProps) {
    // Нормализуем базовый адрес: убираем завершающий слэш, чтобы не получить
    // двойной слэш (http://localhost//share-chat/...), который ломает запрос.
    const base = apiBase.replace(/\/+$/, "");
    const endpoint = `${base}/share-chat/${chatId}/message`;
    const initEndpoint = `${base}/share-chat/${chatId}/init`;

    const [messages, setMessages] = useState<ChatMessage[]>(
        greeting ? [{ id: 0, role: "bot", text: greeting }] : []
    );
    const [draft, setDraft] = useState("");
    const [busy, setBusy] = useState(false);
    const [info, setInfo] = useState<InitData | null>(null);
    const [actions, setActions] = useState<string[]>([]);

    const idRef = useRef(1);
    const messagesRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    const scrollToBottom = useCallback(() => {
        const el = messagesRef.current;
        if (el) el.scrollTop = el.scrollHeight;
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages, busy, scrollToBottom]);

    // Авто-высота textarea под объём текста.
    useEffect(() => {
        const el = inputRef.current;
        if (!el) return;
        el.style.height = "auto";
        el.style.height = `${Math.min(el.scrollHeight, 140)}px`;
    }, [draft]);

    const addMessage = useCallback((role: Role, text: string, isError = false) => {
        setMessages((prev) => [...prev, { id: idRef.current++, role, text, isError }]);
    }, []);

    // Инициализация чата: приветствие, быстрые действия и данные о компании.
    useEffect(() => {
        let cancelled = false;
        (async () => {
            try {
                const res = await fetch(initEndpoint, {
                    method: "GET",
                    headers: { accept: "application/json", "X-CSRF-TOKEN": "" },
                });
                if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
                const data: InitData = await res.json();
                if (cancelled) return;

                setInfo(data);
                if (Array.isArray(data.actions)) setActions(data.actions);
                if (data.welcome_message) {
                    // Заменяем стартовое приветствие текстом из init.
                    setMessages([{ id: 0, role: "bot", text: data.welcome_message }]);
                }
            } catch (err) {
                console.error("[AIChat] Ошибка инициализации", initEndpoint, err);
            }
        })();
        return () => {
            cancelled = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initEndpoint]);

    const send = useCallback(async (override?: string) => {
        const question = (override ?? draft).trim();
        if (!question || busy) return;

        addMessage("user", question);
        setDraft("");
        setBusy(true);

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
            const answer =
                data?.answer ?? data?.message ?? "Извините, я не смог обработать ответ.";
            addMessage("bot", String(answer));
        } catch (err) {
            // Реальную причину выводим в консоль — помогает отличить
            // сетевую/CORS-ошибку от таймаута или ошибки сервера.
            console.error("[AIChat] Ошибка запроса к", endpoint, err);
            const aborted = err instanceof DOMException && err.name === "AbortError";
            addMessage(
                "bot",
                aborted
                    ? "Ассистент не ответил вовремя. Пожалуйста, попробуйте ещё раз."
                    : "Не удалось связаться с ассистентом. Пожалуйста, попробуйте ещё раз.",
                true
            );
        } finally {
            window.clearTimeout(timeoutId);
            setBusy(false);
            inputRef.current?.focus();
        }
    }, [draft, busy, endpoint, addMessage]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        void send();
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            void send();
        }
    };

    // Быстрый ввод: клик по кнопке-действию сразу отправляет вопрос.
    const handleAction = useCallback(
        (text: string) => {
            if (busy) return;
            void send(text);
        },
        [busy, send]
    );

    return (
        <section className="ai-chat-section">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-9 col-xl-8">
                        <div className="ai-chat">
                            <div className="ai-chat__header">
                                <div className="ai-chat__avatar" aria-hidden="true">
                                    <i className="fa-solid fa-robot"></i>
                                    <span className="ai-chat__status-dot"></span>
                                </div>
                                <div className="ai-chat__heading">
                                    <h3 className="ai-chat__title">{info?.company_name || title}</h3>
                                    <p className="ai-chat__subtitle">{info?.description || subtitle}</p>
                                    {info?.phone && (
                                        <a className="ai-chat__phone" href={`tel:${info.phone.replace(/\s+/g, "")}`}>
                                            <i className="fa-solid fa-phone"></i> {info.phone}
                                        </a>
                                    )}
                                </div>
                                <span className="ai-chat__online">
                                    <span className="ai-chat__online-dot"></span> Онлайн
                                </span>
                            </div>

                            <div
                                className="ai-chat__messages"
                                ref={messagesRef}
                                role="log"
                                aria-live="polite"
                                aria-label="История сообщений чата"
                            >
                                {messages.map((m) => (
                                    <div key={m.id} className={`ai-chat__row ai-chat__row--${m.role}`}>
                                        <div className="ai-chat__content">
                                            <span className="ai-chat__name">
                                                {m.role === "bot" ? ASSISTANT_NAME : USER_NAME}
                                            </span>
                                            {m.role === "bot" && !m.isError ? (
                                                <div
                                                    className="ai-chat__bubble"
                                                    dangerouslySetInnerHTML={{
                                                        __html: marked.parse(m.text) as string,
                                                    }}
                                                />
                                            ) : (
                                                <div
                                                    className={
                                                        "ai-chat__bubble" +
                                                        (m.isError ? " ai-chat__bubble--error" : "")
                                                    }
                                                >
                                                    {m.text}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}

                                {busy && (
                                    <div className="ai-chat__row ai-chat__row--bot ai-chat__row--typing">
                                        <div className="ai-chat__content">
                                            <span className="ai-chat__name">Ассистент печатает</span>
                                            <div className="ai-chat__bubble">
                                                <span className="ai-chat__typing">
                                                    <span></span>
                                                    <span></span>
                                                    <span></span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {actions.length > 0 && (
                                <div className="ai-chat__actions" role="group" aria-label="Быстрые вопросы">
                                    {actions.map((a, i) => (
                                        <button
                                            key={i}
                                            type="button"
                                            className="ai-chat__action"
                                            onClick={() => handleAction(a)}
                                            disabled={busy}
                                        >
                                            {a}
                                        </button>
                                    ))}
                                </div>
                            )}

                            <form className="ai-chat__form" autoComplete="off" onSubmit={handleSubmit}>
                                <div className="ai-chat__input-wrap">
                                    <textarea
                                        ref={inputRef}
                                        className="ai-chat__input"
                                        name="question"
                                        rows={1}
                                        placeholder={inputPlaceholder}
                                        aria-label="Текст сообщения"
                                        value={draft}
                                        onChange={(e) => setDraft(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                    />
                                    <button
                                        type="submit"
                                        className="ai-chat__send"
                                        aria-label="Отправить сообщение"
                                        disabled={busy || !draft.trim()}
                                    >
                                        <i className="fa-solid fa-paper-plane"></i>
                                    </button>
                                </div>
                                <p className="ai-chat__hint">
                                    Нажмите <kbd>Enter</kbd> для отправки, <kbd>Shift</kbd>+<kbd>Enter</kbd> — новая строка
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
