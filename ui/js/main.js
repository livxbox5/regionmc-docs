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
;
// ========== ПОЛНАЯ ЗАЩИТА ОТ ИНСТРУМЕНТОВ РАЗРАБОТЧИКА ==========
(function() {
    // Блокировка всех клавиш разработчика
    document.addEventListener('keydown', function(e) {
        const key = e.key;
        const ctrl = e.ctrlKey;
        const shift = e.shiftKey;
        const alt = e.altKey;
        const meta = e.metaKey;
        
        // F1 - F12
        if (key === 'F1' || key === 'F2' || key === 'F3' || key === 'F4' ||
            key === 'F5' || key === 'F6' || key === 'F7' || key === 'F8' ||
            key === 'F9' || key === 'F10' || key === 'F11' || key === 'F12') {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
        
        // Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C (DevTools)
        if (ctrl && shift && (key === 'I' || key === 'J' || key === 'C')) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
        
        // Ctrl+U (исходный код)
        if (ctrl && key === 'u') {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
        
        // Ctrl+S (сохранение)
        if (ctrl && key === 's') {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
        
        // Ctrl+R (обновление)
        if (ctrl && key === 'r') {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
        
        // Ctrl+Shift+R (жесткое обновление)
        if (ctrl && shift && key === 'R') {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
        
        // Ctrl+E, Ctrl+F (поиск)
        if (ctrl && (key === 'e' || key === 'f')) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
        
        // Ctrl+P (печать)
        if (ctrl && key === 'p') {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
        
        // Mac: Cmd+Option+I, Cmd+Option+J
        if (meta && alt && (key === 'I' || key === 'J')) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
        
        // Mac: Cmd+U
        if (meta && key === 'u') {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
        
        // Mac: Cmd+R
        if (meta && key === 'r') {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
    }, false);

    // Запрет правой кнопки мыши
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        e.stopPropagation();
        return false;
    }, false);

    // Запрет выделения текста (кроме кодовых блоков и таблиц)
    document.addEventListener('selectstart', function(e) {
        if (e.target.closest('.code-block') || e.target.closest('.data-table')) {
            return true;
        }
        e.preventDefault();
        return false;
    });

    // Запрет перетаскивания изображений
    document.addEventListener('dragstart', function(e) {
        e.preventDefault();
        return false;
    });

    // Отслеживание открытия DevTools через размер окна
    let devToolsOpen = false;
    
    const checkDevTools = function() {
        const widthDiff = window.outerWidth - window.innerWidth;
        const heightDiff = window.outerHeight - window.innerHeight;
        const widthThreshold = widthDiff > 200;
        const heightThreshold = heightDiff > 200;
        
        if (widthThreshold || heightThreshold) {
            if (!devToolsOpen) {
                devToolsOpen = true;
                document.body.innerHTML = '<div style="position:fixed;top:0;left:0;width:100%;height:100%;background:#0f0f1a;display:flex;align-items:center;justify-content:center;z-index:99999;flex-direction:column;"><div style="text-align:center;"><h1 style="color:#ffd700;font-size:2rem;">⚠️ Доступ ограничен</h1><p style="color:#fff;margin:1rem 0;">Инструменты разработчика отключены на этом сайте.</p><p style="color:#888;">Закройте DevTools (F12) и обновите страницу</p></div></div>';
                if (typeof console !== 'undefined' && console.clear) {
                    try { console.clear(); } catch(e) {}
                }
            }
        } else {
            devToolsOpen = false;
        }
    };
    
    setInterval(checkDevTools, 500);

    // Полное отключение консоли
    if (typeof console !== 'undefined') {
        const noop = function() {};
        const methods = ['log', 'debug', 'info', 'warn', 'error', 'table', 'trace', 'dir', 
                        'time', 'timeEnd', 'group', 'groupCollapsed', 'groupEnd', 'clear', 
                        'count', 'assert', 'profile', 'profileEnd', 'timeStamp', 'memory'];
        for (let i = 0; i < methods.length; i++) {
            if (console[methods[i]]) {
                console[methods[i]] = noop;
            }
        }
    }
    
    // Очистка консоли каждые 50 мс
    setInterval(function() {
        if (typeof console !== 'undefined' && console.clear) {
            try { console.clear(); } catch(e) {}
        }
    }, 50);

    // Защита от отладчика (debugger)
    function debuggerProtection() {
        function blockDebugger() {
            try {
                (function() {
                    const start = performance.now();
                    const end = performance.now();
                    if (end - start > 50) {
                        document.body.innerHTML = '<div style="position:fixed;top:0;left:0;width:100%;height:100%;background:#0f0f1a;display:flex;align-items:center;justify-content:center;z-index:99999;"><div style="text-align:center;"><h1 style="color:#ffd700;">⚠️ Отладка обнаружена</h1><p style="color:#fff;">Пожалуйста, закройте инструменты разработчика</p></div></div>';
                    }
                })();
            } catch(e) {}
            setTimeout(blockDebugger, 500);
        }
        blockDebugger();
    }
    debuggerProtection();
    
    // Предотвращение копирования содержимого страницы (кроме кода)
    document.addEventListener('copy', function(e) {
        if (e.target.closest('.code-block')) {
            return true;
        }
        e.preventDefault();
        return false;
    });
    
    // Защита от вставки скриптов через консоль
    setInterval(function() {
        const allElements = document.querySelectorAll('*');
        for (let i = 0; i < allElements.length; i++) {
            const el = allElements[i];
            if (el.hasAttribute && el.hasAttribute('onclick') && 
                (el.getAttribute('onclick').includes('console') || 
                 el.getAttribute('onclick').includes('debugger'))) {
                el.removeAttribute('onclick');
            }
        }
    }, 1000);
    
    // Маскировка консоли
    window.console = undefined;
    try { delete window.console; } catch(e) {}
    
})();

// ========== КНОПКИ КОПИРОВАНИЯ И АКТИВНАЯ НАВИГАЦИЯ ==========
document.addEventListener('DOMContentLoaded', () => {
    // Активная ссылка в навигации
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || 
            (currentPage === 'index.html' && linkPage === '../index.html') ||
            (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });

    // Кнопки копирования для всех блоков кода
    document.querySelectorAll('.code-block').forEach(block => {
        if (block.parentNode.querySelector('.copy-btn')) return;
        
        const btn = document.createElement('button');
        btn.textContent = '📋 Копировать';
        btn.className = 'copy-btn';
        btn.style.cssText = 'background:#ffd700;color:#1a1a2e;border:none;border-radius:6px;padding:0.3rem 0.8rem;cursor:pointer;font-size:0.8rem;margin-bottom:0.5rem;font-weight:bold;transition:all 0.2s;';
        btn.onmouseover = () => btn.style.background = '#ffed4a';
        btn.onmouseout = () => btn.style.background = '#ffd700';
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