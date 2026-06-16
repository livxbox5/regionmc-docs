/**
 * RegionMC — Статистика с Modrinth
 * Автоматически обновляет данные каждые 60 секунд
 * API: https://api.modrinth.com/v2/project/regionmc
 */

(function() {
    'use strict';

    const PROJECT_SLUG = 'regionmc';
    const API_URL = `https://api.modrinth.com/v2/project/${PROJECT_SLUG}`;
    const REFRESH_INTERVAL = 60000; // 60 секунд

    // Элементы для заполнения
    const elements = {
        downloads: document.getElementById('statDownloads'),
        followers: document.getElementById('statFollowers'),
        versions: document.getElementById('statVersions'),
        status: document.getElementById('statStatus'),
        updated: document.getElementById('statUpdated'),
        gameVersions: document.getElementById('statGameVersions'),
        updateTime: document.getElementById('statUpdateTime')
    };

    // Проверяем, есть ли все элементы на странице
    const hasContainer = Object.values(elements).every(el => el !== null);
    if (!hasContainer) {
        // Если блока статистики нет на странице — тихо выходим
        return;
    }

    /**
     * Форматирует дату в локальный формат
     */
    function formatDate(dateString) {
        if (!dateString) return '—';
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('ru-RU', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });
        } catch {
            return dateString;
        }
    }

    /**
     * Форматирует число с разделителями тысяч
     */
    function formatNumber(num) {
        if (num === undefined || num === null) return '—';
        return num.toLocaleString('ru-RU');
    }

    /**
     * Получает статус проекта на русском
     */
    function getStatusText(status) {
        const map = {
            'approved': '✅ Одобрен',
            'archived': '📦 В архиве',
            'draft': '📝 Черновик',
            'unlisted': '🔒 Скрыт',
            'processing': '⏳ В обработке'
        };
        return map[status] || status || '—';
    }

    /**
     * Загружает данные с API Modrinth
     */
    async function fetchStats() {
        try {
            const response = await fetch(API_URL);

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const data = await response.json();

            // Заполняем карточки
            elements.downloads.textContent = formatNumber(data.downloads);
            elements.downloads.classList.remove('stat-loading');

            elements.followers.textContent = formatNumber(data.followers);
            elements.followers.classList.remove('stat-loading');

            elements.versions.textContent = data.versions ? data.versions.length : '—';
            elements.versions.classList.remove('stat-loading');

            elements.status.textContent = getStatusText(data.status);
            elements.status.classList.remove('stat-loading');

            elements.updated.textContent = formatDate(data.updated);
            elements.updated.classList.remove('stat-loading');

            // Показываем первую поддерживаемую версию (или несколько)
            if (data.game_versions && data.game_versions.length > 0) {
                const versions = data.game_versions.slice(0, 4).join(', ');
                elements.gameVersions.textContent = versions + (data.game_versions.length > 4 ? '…' : '');
            } else {
                elements.gameVersions.textContent = '—';
            }
            elements.gameVersions.classList.remove('stat-loading');

            // Время последнего обновления статистики
            const now = new Date();
            elements.updateTime.textContent = `🕐 Обновлено: ${now.toLocaleTimeString('ru-RU')}`;

        } catch (error) {
            console.warn('[RegionMC Stats] Не удалось загрузить статистику:', error);

            // Показываем ошибку в карточках
            const errorText = '⚠️ Ошибка';
            elements.downloads.textContent = errorText;
            elements.downloads.classList.remove('stat-loading');
            elements.followers.textContent = errorText;
            elements.followers.classList.remove('stat-loading');
            elements.versions.textContent = errorText;
            elements.versions.classList.remove('stat-loading');
            elements.status.textContent = errorText;
            elements.status.classList.remove('stat-loading');
            elements.updated.textContent = errorText;
            elements.updated.classList.remove('stat-loading');
            elements.gameVersions.textContent = errorText;
            elements.gameVersions.classList.remove('stat-loading');

            elements.updateTime.textContent = '⚠️ Не удалось загрузить данные';
        }
    }

    // Первая загрузка
    fetchStats();

    // Автообновление каждые 60 секунд
    setInterval(fetchStats, REFRESH_INTERVAL);

})();