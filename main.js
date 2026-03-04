(function() {
    // Хранилище связок (логин -> пароль) и контент для каждой
    const CREDENTIALS = {
        asbugaye: {
            password: 'tulip',
            title: '💐 Аня',
            emoji: '🌷🌷🌷',
            greeting: 'С 8 марта, Аня!',
            desc: 'Говорят, за каждым успешным проектом стоит великая женщина. Теперь мы точно знаем, о ком это. Поздравляем! 🌷',
            imgUrl: 'Коврижных Аня.jpg',
        },
        sister: {
            password: 'rose',
            title: '🌸 сестрёнка',
            emoji: '🌹✨',
            greeting: 'С праздником, сестричка!',
            desc: 'Оставайся такой же яркой и вдохновляющей.',
            imgUrl: '',
        },
        girl: {
            password: 'mimosa',
            title: '💛 девушка',
            emoji: '🌼💫',
            greeting: 'С 8 марта, любимая!',
            desc: 'Ты — моё весеннее солнце. ❤️',
            imgUrl: '',
        },
        babushka: {
            password: 'lilac',
            title: '🪴 бабуля',
            emoji: '🌸🌿',
            greeting: 'С 8 марта, бабуля!',
            desc: 'Твоя забота греет лучше солнца.',
            imgUrl: '',
        }
    };

    // Элементы DOM
    const authCard = document.getElementById('authCard');
    const contentScreen = document.getElementById('contentScreen');
    const loginInput = document.getElementById('loginInput');
    const passwordInput = document.getElementById('passwordInput');
    const loginBtn = document.getElementById('loginBtn');
    const authError = document.getElementById('authError');
    const logoutBtn = document.getElementById('logoutBtn');
    const contentTitle = document.getElementById('contentTitle');
    const dynamicContent = document.getElementById('dynamicContent');
    
    // Элементы для поздравлений
    const congratsBtn = document.querySelector('.show-conratulations');
    const congratsHideBtn = document.querySelector('.hide-conratulations');
    const contentBox = document.querySelector('.content-screen');
    const congratsBox = document.querySelector('.conratulations-box');
    const floatingCongrats = document.querySelector('.floating-congratulations');
    const body = document.body;
    
    let currentUser = null;

    // Функция для копирования поздравлений в мобильный бокс
    function copyCongratulationsToMobile() {
        if (!congratsBox || !floatingCongrats) return;
        
        // Очищаем бокс
        congratsBox.innerHTML = '';
        
        // Добавляем кнопку "Вернуться"
        const hideBtn = document.createElement('button');
        hideBtn.className = 'hide-conratulations btn';
        hideBtn.style.cssText = 'width: fit-content; position: absolute; top: 10px; right: 10px; font-size: 14px; padding: 10px 18px; display: none;';
        hideBtn.textContent = 'Вернуться';
        congratsBox.appendChild(hideBtn);
        
        // Копируем все поздравления из плавающего блока
        const congratulations = floatingCongrats.querySelectorAll('.congratulation');
        congratulations.forEach(cong => {
            const clone = cong.cloneNode(true);
            // Убираем классы позиционирования для телефона
            clone.classList.remove(
                'congratulation-igor', 'congratulation-alex', 'congratulation-antonM',
                'congratulation-antonK', 'congratulation-kostya', 'congratulation-denis',
                'congratulation-max'
            );
            congratsBox.appendChild(clone);
        });
        
        // Обновляем ссылку на кнопку скрытия
        const newHideBtn = document.querySelector('.hide-conratulations');
        if (newHideBtn) {
            newHideBtn.addEventListener('click', function(e) {
                e.preventDefault();
                if (window.innerWidth <= 1147) {
                    if (contentBox) contentBox.style.display = 'block';
                    if (congratsBox) congratsBox.style.display = 'none';
                    body.classList.remove('congrats-open');
                }
            });
        }
    }

    // Функция входа
    const handleLogin = () => {
        const login = loginInput.value.trim().toLowerCase();
        const password = passwordInput.value.trim();

        if (CREDENTIALS[login] && CREDENTIALS[login].password === password) {
            authError.textContent = '';
            currentUser = login;

            authCard.classList.add('hidden');
            contentScreen.classList.remove('hidden');

            updateContentForUser(login);

            loginInput.value = '';
            passwordInput.value = '';

            // ПОКАЗЫВАЕМ плавающие поздравления на ПК после авторизации
            if (window.innerWidth > 1147) {
                if (floatingCongrats) {
                    floatingCongrats.classList.add('visible');
                }
            } else {
                // На телефоне подготавливаем бокс
                copyCongratulationsToMobile();
                if (congratsBox) congratsBox.style.display = 'none';
            }
            
            body.classList.remove('congrats-open');
            
        } else {
            authError.textContent = '🌱 неверная связка. попробуй ещё.';
        }
    };

    // обновить контент для юзера
    const updateContentForUser = (userKey) => {
        const user = CREDENTIALS[userKey];
        if (!user) return;

        contentTitle.textContent = user.title;

        const imgHtml = user.imgUrl ? `<div class="profileImg" style="background-image: url('${user.imgUrl}'); background-size: cover; background-position: center;"></div>` : '';
        
        dynamicContent.innerHTML = `
            ${imgHtml}
            <div class="emoji-large">${user.emoji}</div>
            <div class="message">${user.greeting}</div>
            <div class="description">${user.desc}</div>
            <a href="#" class="btn" style="pointer-events: none; opacity: 0.7;">🎉 Забрать подарок 🎉</a>                   
        `;
    };

    // обработчик кнопки вход
    loginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        handleLogin();
    });

    // enter в полях
    passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleLogin();
    });
    loginInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleLogin();
    });

    // выход
    logoutBtn.addEventListener('click', () => {
        contentScreen.classList.add('hidden');
        authCard.classList.remove('hidden');
        currentUser = null;
        
        // СКРЫВАЕМ плавающие поздравления при выходе
        if (floatingCongrats) {
            floatingCongrats.classList.remove('visible');
        }
        
        if (contentBox) contentBox.style.display = 'block';
        if (congratsBox) congratsBox.style.display = 'none';
        body.classList.remove('congrats-open');
    });

    // ОБРАБОТЧИК ДЛЯ КНОПКИ "ПОЗДРАВЛЕНИЯ"
    if (congratsBtn) {
        congratsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (window.innerWidth <= 1147) {
                // Убедимся, что в боксе есть поздравления
                if (congratsBox && congratsBox.children.length <= 1) {
                    copyCongratulationsToMobile();
                }
                
                if (contentBox) contentBox.style.display = 'none';
                if (congratsBox) congratsBox.style.display = 'block';
                body.classList.add('congrats-open');
            }
        });
    }

    // Обработчик изменения размера окна
    window.addEventListener('resize', function() {
        if (currentUser) {
            if (window.innerWidth <= 1147) {
                // Переключились на телефон - скрываем плавающие, показываем кнопку
                if (floatingCongrats) {
                    floatingCongrats.classList.remove('visible');
                }
                copyCongratulationsToMobile();
            } else {
                // Переключились на ПК - показываем плавающие
                if (floatingCongrats) {
                    floatingCongrats.classList.add('visible');
                }
                if (contentBox) contentBox.style.display = 'block';
                if (congratsBox) congratsBox.style.display = 'none';
                body.classList.remove('congrats-open');
            }
        }
    });

    // при загрузке страницы сброс
    window.addEventListener('load', () => {
        authCard.classList.remove('hidden');
        contentScreen.classList.add('hidden');
        if (congratsBox) congratsBox.style.display = 'none';
        if (floatingCongrats) {
            floatingCongrats.classList.remove('visible'); // Скрыты до авторизации
        }
    });

})();