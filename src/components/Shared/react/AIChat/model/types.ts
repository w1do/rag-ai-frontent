export type Role = "user" | "bot";

export interface ChatMessage {
    id: number;
    role: Role;
    text: string;
    isError?: boolean;
}

export interface InitData {
    welcome_message?: string;
    actions?: string[];
    company_name?: string;
    phone?: string;
    description?: string;
    social_networks?: Record<string, string>;
}

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
