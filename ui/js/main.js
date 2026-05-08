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
    document.addEventListener('keydown', function(e) {
        const key = e.key;
        const ctrl = e.ctrlKey;
        const shift = e.shiftKey;
        const alt = e.altKey;
        const meta = e.metaKey;
        
        if (key === 'F1' || key === 'F2' || key === 'F3' || key === 'F4' ||
            key === 'F5' || key === 'F6' || key === 'F7' || key === 'F8' ||
            key === 'F9' || key === 'F10' || key === 'F11' || key === 'F12') {
            e.preventDefault();
            return false;
        }
        if (ctrl && shift && (key === 'I' || key === 'J' || key === 'C')) {
            e.preventDefault();
            return false;
        }
        if (ctrl && key === 'u') { e.preventDefault(); return false; }
        if (ctrl && key === 's') { e.preventDefault(); return false; }
        if (ctrl && key === 'r') { e.preventDefault(); return false; }
        if (ctrl && shift && key === 'R') { e.preventDefault(); return false; }
        if (ctrl && (key === 'e' || key === 'f')) { e.preventDefault(); return false; }
        if (ctrl && key === 'p') { e.preventDefault(); return false; }
        if (meta && alt && (key === 'I' || key === 'J')) { e.preventDefault(); return false; }
        if (meta && key === 'u') { e.preventDefault(); return false; }
        if (meta && key === 'r') { e.preventDefault(); return false; }
    }, false);

    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        return false;
    }, false);

    document.addEventListener('selectstart', function(e) {
        if (e.target.closest('.code-block') || e.target.closest('.data-table')) return true;
        e.preventDefault();
        return false;
    });

    document.addEventListener('dragstart', function(e) {
        e.preventDefault();
        return false;
    });

    let devToolsOpen = false;
    const checkDevTools = function() {
        const widthDiff = window.outerWidth - window.innerWidth;
        const heightDiff = window.outerHeight - window.innerHeight;
        if (widthDiff > 200 || heightDiff > 200) {
            if (!devToolsOpen) {
                devToolsOpen = true;
                document.body.innerHTML = '<div style="position:fixed;top:0;left:0;width:100%;height:100%;background:#0f0f1a;display:flex;align-items:center;justify-content:center;z-index:99999;"><div style="text-align:center;"><h1 style="color:#ffd700;">⚠️ Доступ ограничен</h1><p style="color:#fff;">Закройте DevTools (F12) и обновите страницу</p></div></div>';
                if (typeof console !== 'undefined' && console.clear) console.clear();
            }
        } else {
            devToolsOpen = false;
        }
    };
    setInterval(checkDevTools, 500);

    if (typeof console !== 'undefined') {
        const noop = function() {};
        const methods = ['log', 'debug', 'info', 'warn', 'error', 'table', 'trace', 'dir', 
                        'time', 'timeEnd', 'group', 'groupCollapsed', 'groupEnd', 'clear', 
                        'count', 'assert', 'profile', 'profileEnd'];
        for (let i = 0; i < methods.length; i++) {
            if (console[methods[i]]) console[methods[i]] = noop;
        }
    }
    setInterval(() => { if (console.clear) console.clear(); }, 50);

    function debuggerProtection() {
        function blockDebugger() {
            try {
                const start = performance.now();
                const end = performance.now();
                if (end - start > 50) {
                    document.body.innerHTML = '<div style="position:fixed;top:0;left:0;width:100%;height:100%;background:#0f0f1a;display:flex;align-items:center;justify-content:center;z-index:99999;"><div style="text-align:center;"><h1 style="color:#ffd700;">⚠️ Отладка обнаружена</h1></div></div>';
                }
            } catch(e) {}
            setTimeout(blockDebugger, 500);
        }
        blockDebugger();
    }
    debuggerProtection();

    document.addEventListener('copy', function(e) {
        if (e.target.closest('.code-block')) return true;
        e.preventDefault();
        return false;
    });

    setInterval(() => {
        document.querySelectorAll('[onclick*="console"],[onclick*="debugger"]').forEach(el => el.removeAttribute('onclick'));
    }, 1000);

    try { delete window.console; } catch(e) {}
    window.console = undefined;
})();

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

    // Кнопки копирования для всех .code-block (с обработкой ошибок)
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