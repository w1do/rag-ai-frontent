import * as React from "react";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import type { AIChatProps } from "./model/types";
import { useChat } from "./hooks/useChat";
import "./AIChat.css";

const ASSISTANT_NAME = "Ассистент";
const USER_NAME = "Я";

export default function AIChat({
    title = "Чат с ИИ-ассистентом",
    subtitle = "Спросите что угодно — умный ИИ-агент BotSync ответит мгновенно",
    inputPlaceholder = "Напишите сообщение...",
    greeting = "Здравствуйте! Я — ИИ-ассистент BotSync. Чем могу помочь?",
    apiBase = import.meta.env.PUBLIC_API_BASE || "https://api.botsync.ru",
    chatId = Number(import.meta.env.PUBLIC_CHAT_ID) || 3,
}: AIChatProps) {
    const [finalChatId, setFinalChatId] = useState(chatId);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const params = new URLSearchParams(window.location.search);
            const id = params.get("id");
            if (id) {
                setFinalChatId(Number(id));
            }
        }
    }, [chatId]);

    const { messages, busy, info, actions, send } = useChat({ apiBase, chatId: finalChatId, greeting });

    const [draft, setDraft] = useState("");
    const messagesRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    // Автоскролл к последнему сообщению.
    useEffect(() => {
        const el = messagesRef.current;
        if (el) el.scrollTop = el.scrollHeight;
    }, [messages, busy]);

    // Авто-высота textarea под объём текста.
    useEffect(() => {
        const el = inputRef.current;
        if (!el) return;
        el.style.height = "auto";
        el.style.height = `${Math.min(el.scrollHeight, 140)}px`;
    }, [draft]);

    const submitDraft = () => {
        if (busy || !draft.trim()) return;
        void send(draft);
        setDraft("");
        inputRef.current?.focus();
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        submitDraft();
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            submitDraft();
        }
    };

    // Быстрый ввод: клик по кнопке-действию сразу отправляет вопрос.
    const handleAction = (text: string) => {
        if (busy) return;
        void send(text);
    };

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
                                                <div className="ai-chat__bubble">
                                                    <ReactMarkdown>
                                                        {m.text}
                                                    </ReactMarkdown>
                                                </div>
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
