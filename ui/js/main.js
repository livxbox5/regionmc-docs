// ============================================================
// RegionMC Documentation - Основной JavaScript файл
// Версия: 2.0 - Полная документация
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    
    // ========== ПОДСВЕТКА ТЕКУЩЕЙ СТРАНИЦЫ ==========
    const currentPath = window.location.pathname;
    const currentFile = currentPath.split('/').pop() || 'index.html';
    
    document.querySelectorAll('.sidebar-nav a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentFile || 
            (currentFile === 'index.html' && href === 'index.html') ||
            (currentFile === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // ========== КНОПКИ КОПИРОВАНИЯ ==========
    document.querySelectorAll('.code-block').forEach(block => {
        if (block.parentNode.querySelector('.copy-btn')) return;
        
        const btn = document.createElement('button');
        btn.textContent = '📋 Копировать';
        btn.className = 'copy-btn';
        
        btn.addEventListener('click', async () => {
            const text = block.innerText;
            try {
                await navigator.clipboard.writeText(text);
                btn.textContent = '✅ Скопировано!';
                setTimeout(() => btn.textContent = '📋 Копировать', 2000);
            } catch(err) {
                btn.textContent = '❌ Ошибка';
                setTimeout(() => btn.textContent = '📋 Копировать', 2000);
            }
        });
        
        block.parentNode.insertBefore(btn, block);
    });
});

// ========== ПЕРЕКЛЮЧАТЕЛЬ ЯЗЫКА ==========
(function() {
    let currentLang = localStorage.getItem('regionmc_lang') || 'ru';
    
    const translations = {
        ru: {
            'nav_home': 'Главная',
            'nav_commands': 'Команды',
            'nav_permissions': 'Права',
            'nav_flags': 'Флаги',
            'nav_examples': 'Примеры',
            'nav_features': 'Возможности',
            'nav_config': 'Конфигурация',
            'nav_downloads': 'Скачать',
            'nav_donate': 'Поддержать',
            'nav_social': 'Соцсети',
            'hero_title': 'RegionMC',
            'hero_tagline': 'Мощная, гибкая и производительная система регионов для Minecraft',
            'hero_btn_commands': 'Все команды',
            'hero_btn_examples': 'Примеры',
            'hero_btn_flags': 'Флаги',
            'feature_protection': 'Защита региона',
            'feature_protection_desc': 'Блоки / сущности / контейнеры • Взрывы, огонь, PvP',
            'feature_flags': '36+ флагов',
            'feature_flags_desc': 'build, break, interact • mob-spawning, time-lock, blockcmd',
            'feature_members': 'Участники и владельцы',
            'feature_members_desc': 'Добавление/удаление • Полный контроль доступа',
            'feature_time': 'Блокировка времени',
            'feature_time_desc': 'День / ночь / заморозка • Визуальный эффект',
            'feature_wand': 'Палочка выделения',
            'feature_wand_desc': 'ЛКМ/ПКМ установка pos • Shift+ПКМ информация',
            'feature_limits': 'Лимиты регионов',
            'feature_limits_desc': 'Количество и размер • Настройка по группам',
            'footer_copyright': 'RegionMC Documentation © 2024 | Minecraft Plugin',
        },
        en: {
            'nav_home': 'Home',
            'nav_commands': 'Commands',
            'nav_permissions': 'Permissions',
            'nav_flags': 'Flags',
            'nav_examples': 'Examples',
            'nav_features': 'Features',
            'nav_config': 'Configuration',
            'nav_downloads': 'Downloads',
            'nav_donate': 'Donate',
            'nav_social': 'Social',
            'hero_title': 'RegionMC',
            'hero_tagline': 'Powerful, flexible and high-performance region system for Minecraft',
            'hero_btn_commands': 'All Commands',
            'hero_btn_examples': 'Examples',
            'hero_btn_flags': 'Flags',
            'feature_protection': 'Region Protection',
            'feature_protection_desc': 'Blocks / entities / containers • Explosions, fire, PvP',
            'feature_flags': '36+ Flags',
            'feature_flags_desc': 'build, break, interact • mob-spawning, time-lock, blockcmd',
            'feature_members': 'Members & Owners',
            'feature_members_desc': 'Add/remove • Full access control',
            'feature_time': 'Time Lock',
            'feature_time_desc': 'Day / night / freeze • Visual effect',
            'feature_wand': 'Selection Wand',
            'feature_wand_desc': 'LMB/RMB set pos • Shift+RMB info',
            'feature_limits': 'Region Limits',
            'feature_limits_desc': 'Count and size • Group configuration',
            'footer_copyright': 'RegionMC Documentation © 2024 | Minecraft Plugin',
        }
    };
    
    function translatePage(lang) {
        // Перевод навигации
        document.querySelectorAll('.sidebar-nav a span').forEach(span => {
            const text = span.innerText.trim();
            const navMap = {
                'Главная': 'nav_home', 'Home': 'nav_home',
                'Команды': 'nav_commands', 'Commands': 'nav_commands',
                'Права': 'nav_permissions', 'Permissions': 'nav_permissions',
                'Флаги': 'nav_flags', 'Flags': 'nav_flags',
                'Примеры': 'nav_examples', 'Examples': 'nav_examples',
                'Возможности': 'nav_features', 'Features': 'nav_features',
                'Конфигурация': 'nav_config', 'Configuration': 'nav_config',
                'Скачать': 'nav_downloads', 'Downloads': 'nav_downloads',
                'Поддержать': 'nav_donate', 'Donate': 'nav_donate',
                'Соцсети': 'nav_social', 'Social': 'nav_social'
            };
            const key = navMap[text];
            if (key && translations[lang][key]) {
                span.innerText = translations[lang][key];
            }
        });
        
        // Перевод футера
        const footer = document.querySelector('.wiki-footer p');
        if (footer) {
            footer.innerText = translations[lang]['footer_copyright'];
        }
        
        // Перевод главной страницы
        const heroTitle = document.querySelector('.hero h1');
        if (heroTitle) {
            heroTitle.innerHTML = translations[lang]['hero_title'] + ' <span class="version">v2.0</span>';
            const tagline = document.querySelector('.tagline');
            if (tagline) tagline.innerText = translations[lang]['hero_tagline'];
            
            const btns = document.querySelectorAll('.hero-buttons .btn');
            if (btns.length >= 3) {
                btns[0].innerText = translations[lang]['hero_btn_commands'];
                btns[1].innerText = translations[lang]['hero_btn_examples'];
                btns[2].innerText = translations[lang]['hero_btn_flags'];
            }
            
            const cards = document.querySelectorAll('.feature-card');
            if (cards.length >= 6) {
                const titles = ['feature_protection', 'feature_flags', 'feature_members', 'feature_time', 'feature_wand', 'feature_limits'];
                const descs = ['feature_protection_desc', 'feature_flags_desc', 'feature_members_desc', 'feature_time_desc', 'feature_wand_desc', 'feature_limits_desc'];
                cards.forEach((card, i) => {
                    const h3 = card.querySelector('h3');
                    if (h3 && titles[i]) h3.innerText = translations[lang][titles[i]];
                    const ul = card.querySelector('ul');
                    if (ul && descs[i]) {
                        const items = translations[lang][descs[i]].split(' • ');
                        ul.innerHTML = items.map(item => `<li>${item}</li>`).join('');
                    }
                });
            }
        }
        
        // Обновляем активный язык в меню
        document.querySelectorAll('.lang-dropdown a').forEach(link => {
            if (link.getAttribute('data-lang') === lang) {
                link.classList.add('active-lang');
            } else {
                link.classList.remove('active-lang');
            }
        });
        
        localStorage.setItem('regionmc_lang', lang);
    }
    
    document.querySelectorAll('.lang-dropdown a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            translatePage(this.getAttribute('data-lang'));
        });
    });
    
    translatePage(currentLang);
})();

// ========== КОНЕЦ ФАЙЛА ==========