const fs = require('fs');
const path = require('path');
const dir = 'src/content/possibilities/';

const newBenefits = {
  'ai-voice-agents.md': 'benefits:\n  - title: "Интеграция ИИ"\n    description: "Разработка голосового RAG агента для мгновенного ответа на базе знаний."\n  - title: "Экономия времени"\n    description: "Наш ИИ бот обслуживает клиентов без очередей и ожидания 24/7."\n  - title: "Глубокая аналитика"\n    description: "Транскрибация звонков с помощью современных LLM RAG моделей."\n  - title: "Легкое масштабирование"\n    description: "Быстрое внедрение искусственного интеллекта онлайн на любое количество телефонных линий."',
  'custom-ai-chatbots.md': 'benefits:\n  - title: "Точность ответов"\n    description: "Наш ИИ бот использует LLM RAG для поиска информации строго по вашей базе знаний."\n  - title: "Экспертная разработка"\n    description: "Создание умного чат-бота, который сохраняет контекст диалога с клиентом."\n  - title: "Быстрый запуск"\n    description: "Первый прототип ИИ на основе RAG технологии готов к внедрению за 5 минут."\n  - title: "Поддержка 24/7"\n    description: "Искусственный интеллект онлайн автоматизирует рутину, повышая лояльность клиентов."',
  'custom-integrations.md': 'benefits:\n  - title: "Интеграция с CRM"\n    description: "ИИ получает доступ к данным из вашей базы в реальном времени."\n  - title: "Синхронизация по API"\n    description: "Бесшовная разработка интеграций RAG чат бота с внутренними системами бизнеса."\n  - title: "Адаптивность решений"\n    description: "LLM RAG система подстраивается под ваши уникальные бизнес-задачи и протоколы."',
  'customer-analytics.md': 'benefits:\n  - title: "Глубинный ИИ анализ"\n    description: "Нейросеть выявляет потребности клиентов на основе данных RAG LLM аналитики."\n  - title: "Оценка качества"\n    description: "Умный чат бот и ИИ автоматически контролируют работу операторов."\n  - title: "Рост продаж"\n    description: "Искусственный интеллект формирует персональные рекомендации на базе знаний."',
  'industry-solutions.md': 'benefits:\n  - title: "Отраслевая экспертиза"\n    description: "Настройка RAG LLM систем для недвижимости, e-commerce и финтеха."\n  - title: "Свой язык общения"\n    description: "ИИ бот обучается на вашей базе знаний, понимая профессиональный сленг ниши."\n  - title: "Готовые шаблоны"\n    description: "Разработка ИИ решений онлайн ускоряет запуск вашего проекта."',
  'knowledge-agents.md': 'benefits:\n  - title: "Обучение на данных"\n    description: "RAG чат бот мгновенно находит точные ответы, опираясь на вашу базу знаний."\n  - title: "Экспертная архитектура"\n    description: "Разработка RAG агентов на базе LangChain и современных LLM моделей."\n  - title: "Эффективность команды"\n    description: "Искусственный интеллект сокращает время поиска информации для сотрудников."',
  'messaging-bots.md': 'benefits:\n  - title: "Омниканальность"\n    description: "Единый интерфейс, где ИИ бот обрабатывает запросы из всех мессенджеров."\n  - title: "Мгновенные ответы"\n    description: "Чат бот нейросеть отвечает клиентам онлайн на основе RAG архитектуры."\n  - title: "Умные интеграции"\n    description: "Разработка ботов с подключением API-действий и платежных систем."',
  'workflow-automation.md': 'benefits:\n  - title: "Оптимизация процессов"\n    description: "Автоматизация рутины с помощью внедрения LLM RAG систем."\n  - title: "Сложные сценарии"\n    description: "Разработка ИИ агентов на базе LangChain для нестандартных бизнес-задач."\n  - title: "Сокращение затрат"\n    description: "Умный чат бот уменьшает время обработки заявок до 80%."'
};

for (const [filename, replacement] of Object.entries(newBenefits)) {
  const filePath = path.join(dir, filename);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Use a simpler approach by just string splitting if regex is tricky with line endings
  // Replace anything between benefits: and faqs:
  const parts = content.split(/benefits:\r?\n/);
  if (parts.length === 2) {
    const afterBenefits = parts[1].split(/faqs:\r?\n/);
    if (afterBenefits.length === 2) {
       const newContent = parts[0] + replacement + '\nfaqs:\n' + afterBenefits[1];
       fs.writeFileSync(filePath, newContent, 'utf8');
       console.log('Updated ' + filename);
    } else {
       console.log('Failed to find faqs: in ' + filename);
    }
  } else {
    console.log('Failed to find benefits: in ' + filename);
  }
}
