// Основной JavaScript для сайта
document.addEventListener('DOMContentLoaded', () => {
    // Активная ссылка
    const current = window.location.pathname.split('/').pop();
    document.querySelectorAll('.nav-links a').forEach(link => {
        if (link.getAttribute('href') === current) {
            link.classList.add('active');
        }
    });

    // Кнопки копирования для блоков кода
    document.querySelectorAll('.code-block').forEach(block => {
        const btn = document.createElement('button');
        btn.textContent = '📋 Копировать';
        btn.className = 'copy-btn';
        btn.addEventListener('click', () => {
            navigator.clipboard.writeText(block.innerText);
            btn.textContent = '✅ Скопировано!';
            setTimeout(() => btn.textContent = '📋 Копировать', 2000);
        });
        block.parentNode.insertBefore(btn, block);
    });
  });
    
    // Добавляем кнопку копирования для блоков кода
    const codeBlocks = document.querySelectorAll('.code-block, .example-block pre');
    codeBlocks.forEach(block => {
        const copyBtn = document.createElement('button');
        copyBtn.textContent = '📋 Копировать';
        copyBtn.className = 'copy-btn';
        copyBtn.style.cssText = `
            background: #ffd700;
            color: #1a1a2e;
            border: none;
            border-radius: 4px;
            padding: 0.3rem 0.8rem;
            cursor: pointer;
            font-size: 0.8rem;
            margin-bottom: 0.5rem;
            display: inline-block;
        `;
        
        copyBtn.addEventListener('click', () => {
            const text = block.innerText;
            navigator.clipboard.writeText(text).then(() => {
                copyBtn.textContent = '✅ Скопировано!';
                setTimeout(() => {
                    copyBtn.textContent = '📋 Копировать';
                }, 2000);
            });
        });
        
        block.parentNode.insertBefore(copyBtn, block);
    });
});
// ========== ЗАЩИТА ОТ ИНСТРУМЕНТОВ РАЗРАБОТЧИКА ==========
(function() {
    // Запрет F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
    document.addEventListener('keydown', function(e) {
        // F12
        if (e.key === 'F12') {
            e.preventDefault();
            return false;
        }
        // Ctrl+Shift+I (Windows/Linux)
        if (e.ctrlKey && e.shiftKey && e.key === 'I') {
            e.preventDefault();
            return false;
        }
        // Ctrl+Shift+J (Windows/Linux)
        if (e.ctrlKey && e.shiftKey && e.key === 'J') {
            e.preventDefault();
            return false;
        }
        // Ctrl+U (просмотр исходного кода)
        if (e.ctrlKey && e.key === 'u') {
            e.preventDefault();
            return false;
        }
        // Ctrl+Shift+C (инспектор элементов)
        if (e.ctrlKey && e.shiftKey && e.key === 'C') {
            e.preventDefault();
            return false;
        }
        // Cmd+Option+I (Mac)
        if (e.metaKey && e.altKey && e.key === 'I') {
            e.preventDefault();
            return false;
        }
        // Cmd+Option+J (Mac)
        if (e.metaKey && e.altKey && e.key === 'J') {
            e.preventDefault();
            return false;
        }
        // Cmd+U (Mac)
        if (e.metaKey && e.key === 'u') {
            e.preventDefault();
            return false;
        }
        // Ctrl+S (сохранение страницы)
        if (e.ctrlKey && e.key === 's') {
            e.preventDefault();
            return false;
        }
    });

    // Запрет правой кнопки мыши
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        return false;
    });

    // Отслеживание открытия DevTools через проверку размера окна
    let devToolsOpen = false;
    const checkDevTools = function() {
        const widthThreshold = window.outerWidth - window.innerWidth > 160;
        const heightThreshold = window.outerHeight - window.innerHeight > 160;
        if (widthThreshold || heightThreshold) {
            if (!devToolsOpen) {
                devToolsOpen = true;
                document.body.innerHTML = '<div style="position:fixed;top:0;left:0;width:100%;height:100%;background:#0f0f1a;display:flex;align-items:center;justify-content:center;z-index:9999;"><div style="text-align:center;"><h1 style="color:#ffd700;">⚠️ Доступ ограничен</h1><p style="color:#fff;">Инструменты разработчика отключены на этом сайте.</p></div></div>';
                console.clear();
            }
        } else {
            devToolsOpen = false;
        }
    };
    
    // Проверка каждые 500 мс
    setInterval(checkDevTools, 500);

    // Защита от console.log, console.clear и других методов
    if (typeof console !== 'undefined') {
        const noop = function() {};
        const methods = ['log', 'debug', 'info', 'warn', 'error', 'table', 'trace', 'dir', 'time', 'timeEnd', 'group', 'groupCollapsed', 'groupEnd', 'clear', 'count', 'assert'];
        for (let i = 0; i < methods.length; i++) {
            if (console[methods[i]]) {
                console[methods[i]] = noop;
            }
        }
    }

    // Защита от выделения текста (опционально)
    document.addEventListener('selectstart', function(e) {
        e.preventDefault();
        return false;
    });

    // Защита от перетаскивания изображений
    document.addEventListener('dragstart', function(e) {
        e.preventDefault();
        return false;
    });
})();

// ========== ОСТАЛЬНОЙ КОД (Активная навигация, кнопки копирования) ==========
document.addEventListener('DOMContentLoaded', () => {
    // Активная ссылка в навигации
    const currentPage = window.location.pathname.split('/').pop();
    if (currentPage && currentPage !== '') {
        document.querySelectorAll('.nav-links a').forEach(link => {
            const linkPage = link.getAttribute('href');
            if (linkPage === currentPage || (currentPage === 'index.html' && linkPage === '../index.html')) {
                link.classList.add('active');
            }
        });
    } else {
        document.querySelectorAll('.nav-links a').forEach(link => {
            if (link.getAttribute('href') === '../index.html' || link.getAttribute('href') === 'index.html') {
                link.classList.add('active');
            }
        });
    }

    // Кнопки копирования для блоков кода
    document.querySelectorAll('.code-block').forEach(block => {
        const btn = document.createElement('button');
        btn.textContent = '📋 Копировать';
        btn.className = 'copy-btn';
        btn.style.cssText = 'background:#ffd700;color:#1a1a2e;border:none;border-radius:4px;padding:0.2rem 0.5rem;cursor:pointer;font-size:0.8rem;margin-bottom:0.5rem;';
        btn.addEventListener('click', () => {
            const text = block.innerText;
            navigator.clipboard.writeText(text);
            btn.textContent = '✅ Скопировано!';
            setTimeout(() => btn.textContent = '📋 Копировать', 2000);
        });
        block.parentNode.insertBefore(btn, block);
    });
});