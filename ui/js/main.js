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