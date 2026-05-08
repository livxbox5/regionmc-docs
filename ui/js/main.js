// ========== АКТИВНАЯ ССЫЛКА В САЙДБАРЕ И КНОПКИ КОПИРОВАНИЯ ==========
document.addEventListener('DOMContentLoaded', () => {
    // Подсветка текущей страницы в сайдбаре
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

    // Кнопки копирования для всех .code-block
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
    
    // Словарь переводов для ВСЕХ страниц
    const translations = {
        ru: {
            // Навигация
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
            
            // Главная страница (hero)
            'hero_title': 'RegionMC',
            'hero_tagline': 'Мощная, гибкая и производительная система регионов для Minecraft',
            'hero_btn_commands': 'Все команды',
            'hero_btn_examples': 'Примеры',
            'hero_btn_flags': 'Флаги',
            
            // Карточки на главной
            'feature_protection': 'Защита региона',
            'feature_protection_desc': 'Блоки / сущности / контейнеры • Взрывы, огонь, PvP',
            'feature_flags': '30+ флагов',
            'feature_flags_desc': 'build, break, interact • mob-spawning, time-lock',
            'feature_members': 'Участники и владельцы',
            'feature_members_desc': 'Добавление/удаление • Полный контроль доступа',
            'feature_time': 'Блокировка времени',
            'feature_time_desc': 'День / ночь / заморозка • Визуальный эффект',
            'feature_wand': 'Палочка выделения',
            'feature_wand_desc': 'ЛКМ/ПКМ установка pos • Shift+ПКМ информация',
            'feature_limits': 'Лимиты регионов',
            'feature_limits_desc': 'Количество и размер • Настройка по группам',
            
            // Страница команд
            'commands_title': 'Все команды',
            'commands_subtitle': 'Полный список команд RegionMC (алиасы: /region, /rg, /regionmc)',
            'commands_basic': '📍 Основные',
            'commands_members': '👥 Управление участниками',
            'commands_flags': '🚩 Флаги и настройки',
            'commands_admin': '🛠️ Административные',
            'cmd_help': '/rg help',
            'cmd_help_desc': 'Показать справку',
            'cmd_pos1': '/rg pos1',
            'cmd_pos1_desc': 'Установить первую позицию',
            'cmd_pos2': '/rg pos2',
            'cmd_pos2_desc': 'Установить вторую позицию',
            'cmd_claim': '/rg claim <name>',
            'cmd_claim_desc': 'Создать регион',
            'cmd_delete': '/rg delete <name>',
            'cmd_delete_desc': 'Удалить регион',
            'cmd_info': '/rg info [name]',
            'cmd_info_desc': 'Информация о регионе',
            'cmd_list': '/rg list',
            'cmd_list_desc': 'Список ваших регионов',
            'cmd_wand': '/rg wand',
            'cmd_wand_desc': 'Получить палочку выделения',
            'cmd_limit': '/rg limit',
            'cmd_limit_desc': 'Показать ваши лимиты',
            'cmd_addmember': '/rg addmember <region> <player>',
            'cmd_addmember_desc': 'Добавить участника',
            'cmd_removemember': '/rg removemember <region> <player>',
            'cmd_removemember_desc': 'Удалить участника',
            'cmd_addowner': '/rg addowner <region> <player>',
            'cmd_addowner_desc': 'Добавить владельца',
            'cmd_removeowner': '/rg removeowner <region> <player>',
            'cmd_removeowner_desc': 'Удалить владельца',
            'cmd_flag': '/rg flag <region> <flag> <value>',
            'cmd_flag_desc': 'Установить флаг',
            'cmd_priority': '/rg priority <region> <int>',
            'cmd_priority_desc': 'Установить приоритет',
            'cmd_expand': '/rg expand <blocks> <direction>',
            'cmd_expand_desc': 'Расширить регион',
            'cmd_show': '/rg show <region>',
            'cmd_show_desc': 'Показать границы',
            'cmd_hide': '/rg hide <region>',
            'cmd_hide_desc': 'Скрыть границы',
            'cmd_reload': '/rg reload',
            'cmd_reload_desc': 'Перезагрузить плагин',
            'cmd_testplaceholders': '/rg testplaceholders',
            'cmd_testplaceholders_desc': 'Тест PlaceholderAPI',
            'cmd_bypass': '/rg bypass',
            'cmd_bypass_desc': 'Вкл/выкл обход защиты',
            
            // Страница прав
            'permissions_title': 'Права (Permissions)',
            'permissions_subtitle': 'Все разрешения для тонкой настройки доступа',
            'perm_basic': '📋 Базовые команды',
            'perm_members': '👥 Управление участниками',
            'perm_flags_settings': '⚙️ Флаги и настройки',
            'perm_flags_list': '🚩 Права Флагов',
            'perm_admin': '👑 Административные',
            'perm_warning': '⚠️ Нужно выдать права regionmc.command.region и regionmc.command.help',
            'perm_tip': '💡 Права выдаются через LuckPerms: /lp user игрок permission set regionmc.flags.pvp true',
            'perm_tip_all': '💡 Все права можно назначать через LuckPerms, PermissionsEx или любой другой менеджер прав.',
            
            // Страница флагов
            'flags_title': 'Все флаги региона',
            'flags_subtitle': 'Полный список флагов и их значений (allow/deny или специальные значения)',
            'flags_basic': '🏗️ Основные флаги защиты',
            'flags_access': '🚪 Доступ и перемещение',
            'flags_explosions': '💥 Взрывы и стихия',
            'flags_containers': '📦 Контейнеры и сущности',
            'flags_special': '⏰ Специальные флаги',
            'flags_usage': '💡 Использование: /rg flag <регион> <флаг> <значение>. Пример: /rg flag home pvp deny',
            
            // Футер
            'footer_copyright': 'RegionMC Documentation © 2024 | Minecraft Plugin',
            'footer_download': 'RegionMC Documentation © 2024 | Minecraft Plugin',
            
            // donate.html
            'donate_title': 'Поддержать автора',
            'donate_subtitle': 'Разработка плагинов требует времени и усилий. Ваша поддержка поможет делать RegionMC ещё лучше!',
            'donate_yoomoney': 'ЮMoney',
            'donate_yoomoney_desc': 'Поддержка Автора напрямую без посредника.',
            'donate_yoomoney_btn': 'Поддержать через ЮMoney',
            'donate_donationalerts': 'DonationAlerts',
            'donate_donationalerts_desc': 'Международная платформа для донатов. Поддержка через карты и другие способы.',
            'donate_donationalerts_btn': 'Поддержать через DonationAlerts',
            'donate_other': '🌟 Другие способы поддержки',
            'donate_star': '⭐ Поставьте звезду на GitHub – это бесплатно и очень помогает!',
            'donate_review': '📝 Оставьте отзыв на Modrinth',
            'donate_share': '💬 Расскажите о плагине друзьям',
            'donate_issues': '🐛 Сообщайте об ошибках и предлагайте идеи в Issues на GitHub',
            'donate_thanks_title': '❤️ Спасибо, что используете RegionMC!',
            'donate_thanks_text': 'Каждый донат, даже самый маленький, мотивирует меня продолжать разработку и делать плагин лучше.',
            'donate_thanks_footer': 'Все средства идут на развитие проекта, покупку кофе ☕ и поддержание серверов для тестирования.',
            
            // downloads.html
            'downloads_title': 'Скачать RegionMC',
            'downloads_subtitle': 'Выберите удобный способ загрузки плагина',
            'downloads_modrinth': '🎮 Modrinth (Рекомендуется)',
            'downloads_modrinth_desc': 'Официальная страница плагина на Modrinth — самый удобный способ скачать и отслеживать обновления',
            'downloads_modrinth_btn': 'Скачать с Modrinth',
            'downloads_github': '🐙 GitHub',
            'downloads_github_desc': 'Исходный код и релизы на GitHub',
            'downloads_github_btn': 'GitHub Releases',
            'downloads_versions': '📦 Поддерживаемые версии',
            'downloads_versions_desc': 'Сервера: Paper / Purpur / Spigot',
            'downloads_install': '🛠️ Установка',
            'downloads_install_tip': '💡 После установки выдайте права игрокам через LuckPerms. Пример: /lp user Steve permission set regionmc.command.claim true',
            'downloads_soon': 'Пока нету',
            'latest': 'Последняя версия',
            'auto_update': 'Авто-обновления',
            'stats': 'Статистика загрузок',
            'rating': 'Отзывы и рейтинг',
            'source': 'Исходный код',
            'history': 'История изменений',
            'issues': 'Отчеты об ошибках',
            
            // social.html
            'social_title': 'Социальные сети',
            'social_subtitle': 'Следите за обновлениями, задавайте вопросы и получайте поддержку',
            'social_discord': 'Discord Сервер',
            'social_discord_desc': 'Поддержка, общение, новости и помощь с плагином',
            'social_discord_btn': 'Присоединиться',
            'social_modrinth_author': 'Modrinth (Автор)',
            'social_modrinth_author_desc': 'Профиль разработчика на Modrinth',
            'social_modrinth_author_btn': 'Профиль KillerYT',
            'social_modrinth_plugin': 'RegionMC на Modrinth',
            'social_modrinth_plugin_desc': 'Страница плагина со всеми версиями',
            'social_modrinth_plugin_btn': 'Скачать',
            'social_github': 'GitHub',
            'social_github_desc': 'Исходный код, релизы и разработка',
            'social_github_btn': 'GitHub KillerYT',
            'social_help_title': '🆘 Нужна помощь?',
            'social_help_text': 'Мы всегда рады помочь с установкой, настройкой или возникшими вопросами!',
            'social_help_discord': 'Задать вопрос в Discord',
            'social_help_issue': 'Сообщить об ошибке',
            'social_help_review': 'Оставить отзыв',
            'social_links': '🔗 Быстрые ссылки',
            
            // examples.html
            'examples_title': 'Примеры использования',
            'examples_subtitle': 'Пошаговые инструкции для создания и настройки регионов',
            'example_private': '🔹 Создание личного привата',
            'example_expand': '🔹 Расширение региона',
            'example_pvp': '🔹 Настройка PvP арены',
            'example_time': '🔹 Вечный день в регионе',
            'example_protection': '🔹 Защита от криперов и огня',
            'example_wand': '🔹 Получение палочки выделения',
            'example_info': '🔹 Информация и список',
            'example_priority': '🔹 Приоритет регионов (при пересечении)',
            
            // features.html
            'features_title': 'Возможности RegionMC',
            'features_subtitle': 'Полный обзор функционала плагина',
            'feature_full_protection': '🏰 Полная защита региона',
            'feature_full_protection_items': 'Защита от разрушения/строительства • Защита от взрывов (криперы, TNT) • Контроль использования контейнеров, дверей • Предотвращение распространения огня и лавы',
            'feature_access': '👥 Управление доступом',
            'feature_access_items': 'Владельцы (полный контроль) • Участники (могут строить/разрушать) • Поддержка оффлайн-игроков по UUID',
            'feature_30flags': '🚩 30+ настраиваемых флагов',
            'feature_30flags_items': 'pvp, mob-spawning, entry, exit • use-items, chest-access • time-lock (день/ночь/заморозка) • greeting, farewell, blockcmd',
            'feature_tools': '🛠️ Инструменты работы',
            'feature_tools_items': 'Палочка выделения • Предмет проверки регионов • Визуализация границ (частицы)',
            'feature_limits': '📊 Гибкие лимиты',
            'feature_limits_items': 'Максимальное количество регионов на игрока • Максимальный объём региона • Настройка по группам через права',
            'feature_performance': '💾 Производительность и хранение',
            'feature_performance_items': 'SQLite (по умолчанию) или MySQL • Кэширование регионов • Автоматическое резервное копирование',
            'feature_worlds': '🌍 Поддержка миров',
            'feature_worlds_items': 'Работа во всех мирах • Автоматическое создание глобального региона • Возможность отключить регионы в конкретном мире',
            'feature_visual': '🎨 Визуальные эффекты',
            'feature_visual_items': 'Границы регионов (частицы) • Уведомления о входе/выходе • Цветные сообщения (HEX и градиенты)',
            'feature_api': '🔧 API и расширяемость',
            'feature_api_items': 'События региона • PlaceholderAPI поддержка • REST API (опционально)',
            
            // configuration.html
            'config_title': 'Конфигурация',
            'config_subtitle': 'Основные настройки плагина (файл config.yml)',
            'config_main': '📁 Основные настройки',
            'config_flags': '🚩 Флаги по умолчанию',
            'config_wand': '🛠️ Палочка выделения',
            'config_database': '💾 База данных',
            'config_tip': '💡 Полная конфигурация доступна в файле config.yml после установки плагина.',
        },
        en: {
            // Navigation
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
            
            // Home page
            'hero_title': 'RegionMC',
            'hero_tagline': 'Powerful, flexible and high-performance region system for Minecraft',
            'hero_btn_commands': 'All Commands',
            'hero_btn_examples': 'Examples',
            'hero_btn_flags': 'Flags',
            
            'feature_protection': 'Region Protection',
            'feature_protection_desc': 'Blocks / entities / containers • Explosions, fire, PvP',
            'feature_flags': '30+ Flags',
            'feature_flags_desc': 'build, break, interact • mob-spawning, time-lock',
            'feature_members': 'Members & Owners',
            'feature_members_desc': 'Add/remove • Full access control',
            'feature_time': 'Time Lock',
            'feature_time_desc': 'Day / night / freeze • Visual effect',
            'feature_wand': 'Selection Wand',
            'feature_wand_desc': 'LMB/RMB set pos • Shift+RMB info',
            'feature_limits': 'Region Limits',
            'feature_limits_desc': 'Count and size • Group configuration',
            
            // Commands page
            'commands_title': 'All Commands',
            'commands_subtitle': 'Full list of RegionMC commands (aliases: /region, /rg, /regionmc)',
            'commands_basic': '📍 Basic',
            'commands_members': '👥 Member Management',
            'commands_flags': '🚩 Flags & Settings',
            'commands_admin': '🛠️ Administrative',
            'cmd_help': '/rg help',
            'cmd_help_desc': 'Show help',
            'cmd_pos1': '/rg pos1',
            'cmd_pos1_desc': 'Set first position',
            'cmd_pos2': '/rg pos2',
            'cmd_pos2_desc': 'Set second position',
            'cmd_claim': '/rg claim <name>',
            'cmd_claim_desc': 'Create region',
            'cmd_delete': '/rg delete <name>',
            'cmd_delete_desc': 'Delete region',
            'cmd_info': '/rg info [name]',
            'cmd_info_desc': 'Region info',
            'cmd_list': '/rg list',
            'cmd_list_desc': 'Your regions list',
            'cmd_wand': '/rg wand',
            'cmd_wand_desc': 'Get selection wand',
            'cmd_limit': '/rg limit',
            'cmd_limit_desc': 'Show your limits',
            'cmd_addmember': '/rg addmember <region> <player>',
            'cmd_addmember_desc': 'Add member',
            'cmd_removemember': '/rg removemember <region> <player>',
            'cmd_removemember_desc': 'Remove member',
            'cmd_addowner': '/rg addowner <region> <player>',
            'cmd_addowner_desc': 'Add owner',
            'cmd_removeowner': '/rg removeowner <region> <player>',
            'cmd_removeowner_desc': 'Remove owner',
            'cmd_flag': '/rg flag <region> <flag> <value>',
            'cmd_flag_desc': 'Set flag',
            'cmd_priority': '/rg priority <region> <int>',
            'cmd_priority_desc': 'Set priority',
            'cmd_expand': '/rg expand <blocks> <direction>',
            'cmd_expand_desc': 'Expand region',
            'cmd_show': '/rg show <region>',
            'cmd_show_desc': 'Show borders',
            'cmd_hide': '/rg hide <region>',
            'cmd_hide_desc': 'Hide borders',
            'cmd_reload': '/rg reload',
            'cmd_reload_desc': 'Reload plugin',
            'cmd_testplaceholders': '/rg testplaceholders',
            'cmd_testplaceholders_desc': 'Test PlaceholderAPI',
            'cmd_bypass': '/rg bypass',
            'cmd_bypass_desc': 'Toggle protection bypass',
            
            // Permissions page
            'permissions_title': 'Permissions',
            'permissions_subtitle': 'All permissions for fine-tuning access',
            'perm_basic': '📋 Basic Commands',
            'perm_members': '👥 Member Management',
            'perm_flags_settings': '⚙️ Flags & Settings',
            'perm_flags_list': '🚩 Flag Permissions',
            'perm_admin': '👑 Administrative',
            'perm_warning': '⚠️ You need to grant permissions 1 and 2 from the list',
            'perm_tip': '💡 Permissions are given via LuckPerms: /lp user player permission set regionmc.flags.pvp true',
            'perm_tip_all': '💡 All permissions can be assigned via LuckPerms, PermissionsEx or any other permission manager.',
            
            // Flags page
            'flags_title': 'All Region Flags',
            'flags_subtitle': 'Full list of flags and their values (allow/deny or special values)',
            'flags_basic': '🏗️ Basic Protection Flags',
            'flags_access': '🚪 Access & Movement',
            'flags_explosions': '💥 Explosions & Environment',
            'flags_containers': '📦 Containers & Entities',
            'flags_special': '⏰ Special Flags',
            'flags_usage': '💡 Usage: /rg flag <region> <flag> <value>. Example: /rg flag home pvp deny',
            
            // Footer
            'footer_copyright': 'RegionMC Documentation © 2024 | Minecraft Plugin',
            'footer_download': 'RegionMC Documentation © 2024 | Minecraft Plugin',
            
            // donate.html
            'donate_title': 'Support the Author',
            'donate_subtitle': 'Plugin development takes time and effort. Your support will help make RegionMC even better!',
            'donate_yoomoney': 'YooMoney',
            'donate_yoomoney_desc': 'Direct support of the Author without intermediaries.',
            'donate_yoomoney_btn': 'Support via YooMoney',
            'donate_donationalerts': 'DonationAlerts',
            'donate_donationalerts_desc': 'International platform for donations. Support via cards and other methods.',
            'donate_donationalerts_btn': 'Support via DonationAlerts',
            'donate_other': '🌟 Other Ways to Support',
            'donate_star': '⭐ Star on GitHub – it\'s free and very helpful!',
            'donate_review': '📝 Leave a review on Modrinth',
            'donate_share': '💬 Tell friends about the plugin',
            'donate_issues': '🐛 Report bugs and suggest ideas on GitHub Issues',
            'donate_thanks_title': '❤️ Thank you for using RegionMC!',
            'donate_thanks_text': 'Every donation, even the smallest, motivates me to continue development and make the plugin better.',
            'donate_thanks_footer': 'All funds go to project development, buying coffee ☕ and maintaining test servers.',
            
            // downloads.html
            'downloads_title': 'Download RegionMC',
            'downloads_subtitle': 'Choose a convenient way to download the plugin',
            'downloads_modrinth': '🎮 Modrinth (Recommended)',
            'downloads_modrinth_desc': 'Official plugin page on Modrinth — the easiest way to download and track updates',
            'downloads_modrinth_btn': 'Download from Modrinth',
            'downloads_github': '🐙 GitHub',
            'downloads_github_desc': 'Source code and releases on GitHub',
            'downloads_github_btn': 'GitHub Releases',
            'downloads_versions': '📦 Supported Versions',
            'downloads_versions_desc': 'Servers: Paper / Purpur / Spigot',
            'downloads_install': '🛠️ Installation',
            'downloads_install_tip': '💡 After installation, grant permissions to players via LuckPerms. Example: /lp user Steve permission set regionmc.command.claim true',
            'downloads_soon': 'Not yet',
            'latest': 'Latest version',
            'auto_update': 'Auto-updates',
            'stats': 'Download statistics',
            'rating': 'Reviews & Rating',
            'source': 'Source code',
            'history': 'Changelog',
            'issues': 'Bug reports',
            
            // social.html
            'social_title': 'Social Networks',
            'social_subtitle': 'Follow updates, ask questions and get support',
            'social_discord': 'Discord Server',
            'social_discord_desc': 'Support, communication, news and plugin help',
            'social_discord_btn': 'Join',
            'social_modrinth_author': 'Modrinth (Author)',
            'social_modrinth_author_desc': 'Developer profile on Modrinth',
            'social_modrinth_author_btn': 'KillerYT Profile',
            'social_modrinth_plugin': 'RegionMC on Modrinth',
            'social_modrinth_plugin_desc': 'Plugin page with all versions',
            'social_modrinth_plugin_btn': 'Download',
            'social_github': 'GitHub',
            'social_github_desc': 'Source code, releases and development',
            'social_github_btn': 'GitHub KillerYT',
            'social_help_title': '🆘 Need help?',
            'social_help_text': 'We are always happy to help with installation, configuration or any questions!',
            'social_help_discord': 'Ask a question on Discord',
            'social_help_issue': 'Report a bug',
            'social_help_review': 'Leave a review',
            'social_links': '🔗 Quick Links',
            
            // examples.html
            'examples_title': 'Usage Examples',
            'examples_subtitle': 'Step-by-step instructions for creating and configuring regions',
            'example_private': '🔹 Creating a personal private',
            'example_expand': '🔹 Expanding a region',
            'example_pvp': '🔹 Setting up a PvP arena',
            'example_time': '🔹 Eternal day in the region',
            'example_protection': '🔹 Protection from creepers and fire',
            'example_wand': '🔹 Getting a selection wand',
            'example_info': '🔹 Information and list',
            'example_priority': '🔹 Region priority (when intersecting)',
            
            // features.html
            'features_title': 'RegionMC Features',
            'features_subtitle': 'Complete overview of plugin functionality',
            'feature_full_protection': '🏰 Complete Region Protection',
            'feature_full_protection_items': 'Destruction/building protection • Explosion protection (creepers, TNT) • Container/door/lever control • Fire and lava spread prevention',
            'feature_access': '👥 Access Management',
            'feature_access_items': 'Owners (full control) • Members (can build/destroy) • Offline player support by UUID',
            'feature_30flags': '🚩 30+ Configurable Flags',
            'feature_30flags_items': 'pvp, mob-spawning, entry, exit • use-items, chest-access • time-lock (day/night/freeze) • greeting, farewell, blockcmd',
            'feature_tools': '🛠️ Work Tools',
            'feature_tools_items': 'Selection wand • Region check item • Border visualization (particles)',
            'feature_limits': '📊 Flexible Limits',
            'feature_limits_items': 'Max regions per player • Max region volume • Group configuration via permissions',
            'feature_performance': '💾 Performance & Storage',
            'feature_performance_items': 'SQLite (default) or MySQL • Region caching • Automatic backup',
            'feature_worlds': '🌍 World Support',
            'feature_worlds_items': 'Works in all worlds • Automatic global region creation • Ability to disable regions in a specific world',
            'feature_visual': '🎨 Visual Effects',
            'feature_visual_items': 'Region borders (particles) • Entry/exit notifications • Colored messages (HEX and gradients)',
            'feature_api': '🔧 API & Extensibility',
            'feature_api_items': 'Region events • PlaceholderAPI support • REST API (optional)',
            
            // configuration.html
            'config_title': 'Configuration',
            'config_subtitle': 'Main plugin settings (config.yml file)',
            'config_main': '📁 Main Settings',
            'config_flags': '🚩 Default Flags',
            'config_wand': '🛠️ Selection Wand',
            'config_database': '💾 Database',
            'config_tip': '💡 Full configuration is available in the config.yml file after installing the plugin.',
        }
    };
    
    // Функция перевода всей страницы
    function translatePage(lang) {
        console.log('Перевод на язык:', lang);
        
        // === ПЕРЕВОД НАВИГАЦИИ (сайдбар) ===
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
        
        // === ПЕРЕВОД ФУТЕРА ===
        const footer = document.querySelector('.wiki-footer p');
        if (footer) {
            footer.innerText = translations[lang]['footer_copyright'];
        }
        
        // === ОПРЕДЕЛЯЕМ ТИП СТРАНИЦЫ ПО ЗАГОЛОВКУ ===
        const pageTitle = document.querySelector('.page-header h1');
        const heroTitle = document.querySelector('.hero h1');
        
        // Главная страница
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
            
            // Карточки возможностей
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
        
        // Страница команд
        else if (pageTitle && pageTitle.innerText.includes('Команды') || pageTitle && pageTitle.innerText.includes('Commands')) {
            pageTitle.innerText = translations[lang]['commands_title'];
            const subtitle = document.querySelector('.page-header p');
            if (subtitle) subtitle.innerText = translations[lang]['commands_subtitle'];
            
            const sectionTitles = document.querySelectorAll('.section-card h2');
            if (sectionTitles.length >= 4) {
                sectionTitles[0].innerText = translations[lang]['commands_basic'];
                sectionTitles[1].innerText = translations[lang]['commands_members'];
                sectionTitles[2].innerText = translations[lang]['commands_flags'];
                sectionTitles[3].innerText = translations[lang]['commands_admin'];
            }
            
            // Перевод таблиц
            const tables = document.querySelectorAll('.data-table');
            tables.forEach(table => {
                const rows = table.querySelectorAll('tr');
                rows.forEach(row => {
                    const cells = row.querySelectorAll('td');
                    if (cells.length >= 3) {
                        const cmdText = cells[0].innerText.trim();
                        const cmdMap = {
                            '/rg help': 'cmd_help',
                            '/rg pos1': 'cmd_pos1',
                            '/rg pos2': 'cmd_pos2',
                            '/rg claim <name>': 'cmd_claim',
                            '/rg delete <name>': 'cmd_delete',
                            '/rg info [name]': 'cmd_info',
                            '/rg list': 'cmd_list',
                            '/rg wand': 'cmd_wand',
                            '/rg limit': 'cmd_limit',
                            '/rg addmember <region> <player>': 'cmd_addmember',
                            '/rg removemember <region> <player>': 'cmd_removemember',
                            '/rg addowner <region> <player>': 'cmd_addowner',
                            '/rg removeowner <region> <player>': 'cmd_removeowner',
                            '/rg flag <region> <flag> <value>': 'cmd_flag',
                            '/rg priority <region> <int>': 'cmd_priority',
                            '/rg expand <blocks> <direction>': 'cmd_expand',
                            '/rg show <region>': 'cmd_show',
                            '/rg hide <region>': 'cmd_hide',
                            '/rg reload': 'cmd_reload',
                            '/rg testplaceholders': 'cmd_testplaceholders',
                            '/rg bypass': 'cmd_bypass'
                        };
                        const descMap = {
                            'Показать справку': 'cmd_help_desc', 'Show help': 'cmd_help_desc',
                            'Установить первую позицию': 'cmd_pos1_desc', 'Set first position': 'cmd_pos1_desc',
                            'Установить вторую позицию': 'cmd_pos2_desc', 'Set second position': 'cmd_pos2_desc',
                            'Создать регион': 'cmd_claim_desc', 'Create region': 'cmd_claim_desc',
                            'Удалить регион': 'cmd_delete_desc', 'Delete region': 'cmd_delete_desc',
                            'Информация о регионе': 'cmd_info_desc', 'Region info': 'cmd_info_desc',
                            'Список ваших регионов': 'cmd_list_desc', 'Your regions list': 'cmd_list_desc',
                            'Получить палочку выделения': 'cmd_wand_desc', 'Get selection wand': 'cmd_wand_desc',
                            'Показать ваши лимиты': 'cmd_limit_desc', 'Show your limits': 'cmd_limit_desc',
                            'Добавить участника': 'cmd_addmember_desc', 'Add member': 'cmd_addmember_desc',
                            'Удалить участника': 'cmd_removemember_desc', 'Remove member': 'cmd_removemember_desc',
                            'Добавить владельца': 'cmd_addowner_desc', 'Add owner': 'cmd_addowner_desc',
                            'Удалить владельца': 'cmd_removeowner_desc', 'Remove owner': 'cmd_removeowner_desc',
                            'Установить флаг': 'cmd_flag_desc', 'Set flag': 'cmd_flag_desc',
                            'Установить приоритет': 'cmd_priority_desc', 'Set priority': 'cmd_priority_desc',
                            'Расширить регион': 'cmd_expand_desc', 'Expand region': 'cmd_expand_desc',
                            'Показать границы': 'cmd_show_desc', 'Show borders': 'cmd_show_desc',
                            'Скрыть границы': 'cmd_hide_desc', 'Hide borders': 'cmd_hide_desc',
                            'Перезагрузить плагин': 'cmd_reload_desc', 'Reload plugin': 'cmd_reload_desc',
                            'Тест PlaceholderAPI': 'cmd_testplaceholders_desc', 'Test PlaceholderAPI': 'cmd_testplaceholders_desc',
                            'Вкл/выкл обход защиты': 'cmd_bypass_desc', 'Toggle protection bypass': 'cmd_bypass_desc'
                        };
                        const cmdKey = cmdMap[cmdText];
                        if (cmdKey && translations[lang][cmdKey]) {
                            cells[0].innerHTML = `<span class="command-name">${translations[lang][cmdKey]}</span>`;
                        }
                        const descKey = descMap[cells[1]?.innerText.trim()];
                        if (descKey && translations[lang][descKey]) {
                            cells[1].innerText = translations[lang][descKey];
                        }
                        if (cells[2]) {
                            const permText = cells[2].innerText;
                            if (permText === 'regionmc.command.help') cells[2].innerText = 'regionmc.command.help';
                            if (permText === 'regionmc.command.pos') cells[2].innerText = 'regionmc.command.pos';
                            if (permText === 'regionmc.command.claim') cells[2].innerText = 'regionmc.command.claim';
                            if (permText === 'regionmc.command.delete') cells[2].innerText = 'regionmc.command.delete';
                            if (permText === 'regionmc.command.info') cells[2].innerText = 'regionmc.command.info';
                            if (permText === 'regionmc.command.list') cells[2].innerText = 'regionmc.command.list';
                            if (permText === 'regionmc.command.wand') cells[2].innerText = 'regionmc.command.wand';
                            if (permText === 'regionmc.command.limit') cells[2].innerText = 'regionmc.command.limit';
                            if (permText === 'regionmc.command.addmember') cells[2].innerText = 'regionmc.command.addmember';
                            if (permText === 'regionmc.command.removemember') cells[2].innerText = 'regionmc.command.removemember';
                            if (permText === 'regionmc.command.addowner') cells[2].innerText = 'regionmc.command.addowner';
                            if (permText === 'regionmc.command.removeowner') cells[2].innerText = 'regionmc.command.removeowner';
                            if (permText === 'regionmc.command.flag') cells[2].innerText = 'regionmc.command.flag';
                            if (permText === 'regionmc.command.priority') cells[2].innerText = 'regionmc.command.priority';
                            if (permText === 'regionmc.command.expand') cells[2].innerText = 'regionmc.command.expand';
                            if (permText === 'regionmc.command.show') cells[2].innerText = 'regionmc.command.show';
                            if (permText === 'regionmc.command.reload') cells[2].innerText = 'regionmc.command.reload';
                            if (permText === 'regionmc.command.testplaceholders') cells[2].innerText = 'regionmc.command.testplaceholders';
                            if (permText === 'regionmc.bypass') cells[2].innerText = 'regionmc.bypass';
                        }
                    }
                });
            });
        }
        
        // Страница прав
        else if (pageTitle && pageTitle.innerText.includes('Права') || pageTitle && pageTitle.innerText.includes('Permissions')) {
            pageTitle.innerText = translations[lang]['permissions_title'];
            const subtitle = document.querySelector('.page-header p');
            if (subtitle) subtitle.innerText = translations[lang]['permissions_subtitle'];
            
            const sectionTitles = document.querySelectorAll('.section-card h2');
            if (sectionTitles.length >= 5) {
                sectionTitles[0].innerText = translations[lang]['perm_basic'];
                sectionTitles[1].innerText = translations[lang]['perm_members'];
                sectionTitles[2].innerText = translations[lang]['perm_flags_settings'];
                sectionTitles[3].innerText = translations[lang]['perm_flags_list'];
                sectionTitles[4].innerText = translations[lang]['perm_admin'];
            }
            
            const tips = document.querySelectorAll('.tip');
            if (tips.length >= 2) {
                if (tips[0] && tips[0].innerHTML.includes('⚠️')) tips[0].innerHTML = translations[lang]['perm_warning'];
                if (tips[1]) tips[1].innerHTML = translations[lang]['perm_tip'];
                if (tips[2]) tips[2].innerHTML = translations[lang]['perm_tip_all'];
            }
        }
        
        // Страница флагов
        else if (pageTitle && pageTitle.innerText.includes('Флаги') || pageTitle && pageTitle.innerText.includes('Flags')) {
            pageTitle.innerText = translations[lang]['flags_title'];
            const subtitle = document.querySelector('.page-header p');
            if (subtitle) subtitle.innerText = translations[lang]['flags_subtitle'];
            
            const sectionTitles = document.querySelectorAll('.section-card h2');
            if (sectionTitles.length >= 5) {
                sectionTitles[0].innerText = translations[lang]['flags_basic'];
                sectionTitles[1].innerText = translations[lang]['flags_access'];
                sectionTitles[2].innerText = translations[lang]['flags_explosions'];
                sectionTitles[3].innerText = translations[lang]['flags_containers'];
                sectionTitles[4].innerText = translations[lang]['flags_special'];
            }
            
            const tip = document.querySelector('.tip');
            if (tip) tip.innerHTML = translations[lang]['flags_usage'];
        }
        
        // Страница примеров
        else if (pageTitle && (pageTitle.innerText.includes('Примеры') || pageTitle.innerText.includes('Examples'))) {
            pageTitle.innerText = translations[lang]['examples_title'];
            const subtitle = document.querySelector('.page-header p');
            if (subtitle) subtitle.innerText = translations[lang]['examples_subtitle'];
            
            const exampleTitles = document.querySelectorAll('.section-card h2');
            if (exampleTitles.length >= 8) {
                exampleTitles[0].innerText = translations[lang]['example_private'];
                exampleTitles[1].innerText = translations[lang]['example_expand'];
                exampleTitles[2].innerText = translations[lang]['example_pvp'];
                exampleTitles[3].innerText = translations[lang]['example_time'];
                exampleTitles[4].innerText = translations[lang]['example_protection'];
                exampleTitles[5].innerText = translations[lang]['example_wand'];
                exampleTitles[6].innerText = translations[lang]['example_info'];
                exampleTitles[7].innerText = translations[lang]['example_priority'];
            }
        }
        
        // Страница возможностей
        else if (pageTitle && (pageTitle.innerText.includes('Возможности') || pageTitle.innerText.includes('Features'))) {
            pageTitle.innerText = translations[lang]['features_title'];
            const subtitle = document.querySelector('.page-header p');
            if (subtitle) subtitle.innerText = translations[lang]['features_subtitle'];
            
            const featureCards = document.querySelectorAll('.feature-card');
            if (featureCards.length >= 9) {
                const titles = [
                    'feature_full_protection', 'feature_access', 'feature_30flags',
                    'feature_tools', 'feature_limits', 'feature_performance',
                    'feature_worlds', 'feature_visual', 'feature_api'
                ];
                const items = [
                    'feature_full_protection_items', 'feature_access_items', 'feature_30flags_items',
                    'feature_tools_items', 'feature_limits_items', 'feature_performance_items',
                    'feature_worlds_items', 'feature_visual_items', 'feature_api_items'
                ];
                featureCards.forEach((card, i) => {
                    const h3 = card.querySelector('h3');
                    if (h3 && titles[i]) h3.innerText = translations[lang][titles[i]];
                    const ul = card.querySelector('ul');
                    if (ul && items[i]) {
                        const itemsList = translations[lang][items[i]].split(' • ');
                        ul.innerHTML = itemsList.map(item => `<li>${item}</li>`).join('');
                    }
                });
            }
        }
        
        // Страница конфигурации
        else if (pageTitle && (pageTitle.innerText.includes('Конфигурация') || pageTitle.innerText.includes('Configuration'))) {
            pageTitle.innerText = translations[lang]['config_title'];
            const subtitle = document.querySelector('.page-header p');
            if (subtitle) subtitle.innerText = translations[lang]['config_subtitle'];
            
            const configTitles = document.querySelectorAll('.section-card h2');
            if (configTitles.length >= 4) {
                configTitles[0].innerText = translations[lang]['config_main'];
                configTitles[1].innerText = translations[lang]['config_flags'];
                configTitles[2].innerText = translations[lang]['config_wand'];
                configTitles[3].innerText = translations[lang]['config_database'];
            }
            
            const tip = document.querySelector('.tip');
            if (tip) tip.innerHTML = translations[lang]['config_tip'];
        }
        
        // Страница донатов
        else if (pageTitle && (pageTitle.innerText.includes('Поддержать') || pageTitle.innerText.includes('Support'))) {
            pageTitle.innerText = translations[lang]['donate_title'];
            const subtitle = document.querySelector('.page-header p');
            if (subtitle) subtitle.innerText = translations[lang]['donate_subtitle'];
            
            const donateCards = document.querySelectorAll('.donate-card h3');
            if (donateCards.length >= 2) {
                donateCards[0].innerText = translations[lang]['donate_yoomoney'];
                donateCards[1].innerText = translations[lang]['donate_donationalerts'];
            }
            const donateDesc = document.querySelectorAll('.donate-card p');
            if (donateDesc.length >= 2) {
                donateDesc[0].innerText = translations[lang]['donate_yoomoney_desc'];
                donateDesc[1].innerText = translations[lang]['donate_donationalerts_desc'];
            }
            const donateBtns = document.querySelectorAll('.donate-card .donate-btn');
            if (donateBtns.length >= 2) {
                donateBtns[0].innerHTML = donateBtns[0].innerHTML.replace(/.*/, '🟡 ' + translations[lang]['donate_yoomoney_btn']);
                donateBtns[1].innerHTML = donateBtns[1].innerHTML.replace(/.*/, '🧡 ' + translations[lang]['donate_donationalerts_btn']);
            }
            
            const otherTitle = document.querySelector('.section-card h2');
            if (otherTitle && otherTitle.innerText.includes('Способы') || otherTitle && otherTitle.innerText.includes('Other')) {
                otherTitle.innerText = translations[lang]['donate_other'];
            }
            const otherItems = document.querySelectorAll('.section-card ul li');
            if (otherItems.length >= 4) {
                otherItems[0].innerHTML = translations[lang]['donate_star'];
                otherItems[1].innerHTML = translations[lang]['donate_review'];
                otherItems[2].innerHTML = translations[lang]['donate_share'];
                otherItems[3].innerHTML = translations[lang]['donate_issues'];
            }
            
            const thanksTitle = document.querySelector('.thanks-block h2');
            if (thanksTitle) thanksTitle.innerText = translations[lang]['donate_thanks_title'];
            const thanksText = document.querySelector('.thanks-block p');
            if (thanksText) thanksText.innerText = translations[lang]['donate_thanks_text'];
            const thanksFooter = document.querySelector('.thanks-block p:last-child');
            if (thanksFooter && thanksFooter !== thanksText) thanksFooter.innerText = translations[lang]['donate_thanks_footer'];
        }
        
        // Страница скачивания
        else if (pageTitle && (pageTitle.innerText.includes('Скачать') || pageTitle.innerText.includes('Download'))) {
            pageTitle.innerText = translations[lang]['downloads_title'];
            const subtitle = document.querySelector('.page-header p');
            if (subtitle) subtitle.innerText = translations[lang]['downloads_subtitle'];
            
            const downloadTitles = document.querySelectorAll('.section-card h2');
            if (downloadTitles.length >= 4) {
                downloadTitles[0].innerText = translations[lang]['downloads_modrinth'];
                downloadTitles[1].innerText = translations[lang]['downloads_github'];
                downloadTitles[2].innerText = translations[lang]['downloads_versions'];
                downloadTitles[3].innerText = translations[lang]['downloads_install'];
            }
            
            const modrinthBtn = document.querySelector('.btn-primary');
            if (modrinthBtn && modrinthBtn.innerText.includes('Скачать')) {
                modrinthBtn.innerText = '🟢 ' + translations[lang]['downloads_modrinth_btn'];
            }
            
            const githubBtn = document.querySelector('.btn-secondary');
            if (githubBtn && githubBtn.innerText.includes('GitHub')) {
                githubBtn.innerText = '🐙 ' + translations[lang]['downloads_github_btn'];
            }
            
            const tip = document.querySelector('.tip');
            if (tip) tip.innerHTML = translations[lang]['downloads_install_tip'];
        }
        
        // Страница соцсетей
        else if (pageTitle && (pageTitle.innerText.includes('Соцсети') || pageTitle.innerText.includes('Social'))) {
            pageTitle.innerText = translations[lang]['social_title'];
            const subtitle = document.querySelector('.page-header p');
            if (subtitle) subtitle.innerText = translations[lang]['social_subtitle'];
            
            const socialCards = document.querySelectorAll('.section-card h3');
            if (socialCards.length >= 4) {
                socialCards[0].innerText = translations[lang]['social_discord'];
                socialCards[1].innerText = translations[lang]['social_modrinth_author'];
                socialCards[2].innerText = translations[lang]['social_modrinth_plugin'];
                socialCards[3].innerText = translations[lang]['social_github'];
            }
            
            const helpTitle = document.querySelector('.section-card h2');
            if (helpTitle && helpTitle.innerText.includes('Нужна помощь')) {
                helpTitle.innerText = translations[lang]['social_help_title'];
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
        
        // Сохраняем язык
        localStorage.setItem('regionmc_lang', lang);
        currentLang = lang;
    }
    
    // Обработчики клика по языкам
    document.querySelectorAll('.lang-dropdown a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const lang = this.getAttribute('data-lang');
            translatePage(lang);
        });
    });
    
    // Применяем язык при загрузке
    translatePage(currentLang);
})();