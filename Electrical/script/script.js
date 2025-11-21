     

// Плавная прокрутка для навигационных ссылок
        document.querySelectorAll('nav a, .btn[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });

       
        // Модальное окно для категорий
        function showCategory(category) {
            const modal = document.getElementById('categoryModal');
            const modalTitle = document.getElementById('modalTitle');
            const modalContent = document.getElementById('modalContent');
            
            let title = '';
            let content = '';
            
            switch(category) {
                case 'cable':
                    title = 'Кабели и провода';
                    content = `
                        <p>Мы предлагаем широкий ассортимент кабельной продукции:</p>
                        <ul>
                            <li>Силовые кабели (ВВГ, АВВГ, NYM)</li>
                            <li>Кабели связи (витая пара, коаксиальные)</li>
                            <li>Специальные кабели (огнестойкие, безгалогенные)</li>
                            <li>Провода монтажные и установочные</li>
                        </ul>
                        <p>Все кабели сертифицированы и соответствуют ГОСТ.</p>
                    `;
                    break;
                case 'lighting':
                    title = 'Осветительное оборудование';
                    content = `
                        <p>Полный спектр осветительного оборудования:</p>
                        <ul>
                            <li>Светодиодные светильники и лампы</li>
                            <li>Промышленное и уличное освещение</li>
                            <li>Декоративное освещение</li>
                            <li>Системы управления освещением</li>
                        </ul>
                        <p>Подбор оптимального решения для ваших задач.</p>
                    `;
                    break;
                case 'automation':
                    title = 'Автоматика и щитовое оборудование';
                    content = `
                        <p>Комплексные решения для автоматизации:</p>
                        <ul>
                            <li>Автоматические выключатели и УЗО</li>
                            <li>Щитовое оборудование</li>
                            <li>Реле, контакторы, пускатели</li>
                            <li>Системы автоматизации зданий</li>
                        </ul>
                        <p>Оборудование от ведущих производителей.</p>
                    `;
                    break;
                case 'tools':
                    title = 'Инструменты и комплектующие';
                    content = `
                        <p>Все для монтажа и обслуживания:</p>
                        <ul>
                            <li>Ручной и электроинструмент</li>
                            <li>Измерительные приборы</li>
                            <li>Монтажные аксессуары</li>
                            <li>Клеммы, зажимы, соединители</li>
                        </ul>
                        <p>Только качественный инструмент от проверенных брендов.</p>
                    `;
                    break;
            }
            
            modalTitle.textContent = title;
            modalContent.innerHTML = content;
            modal.style.display = 'flex';
        }

        function closeModal() {
            document.getElementById('categoryModal').style.display = 'none';
        }

        // Закрытие модального окна при клике вне его
        window.addEventListener('click', function(e) {
            const modal = document.getElementById('categoryModal');
            if (e.target === modal) {
                closeModal();
            }
        });
        
        // Анимация при прокрутке
        const observerOptions = {
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Функция для перехода на страницу товара
        function viewProduct(productId) {
        // Сохраняем ID товара в sessionStorage для использования на странице товара
        sessionStorage.setItem('currentProduct', productId);
        // Переходим на страницу товара
        window.location.href = 'product.html';
        }

        // Функция для добавления в корзину (заглушка)
        function addToCart(button) {
        const productCard = button.closest('.product-card');
        const productName = productCard.querySelector('h3').textContent;
        const productPrice = productCard.querySelector('.product-price').textContent;
    
        // В реальном приложении здесь была бы логика добавления в корзину
        console.log(`Товар добавлен в корзину: ${productName} - ${productPrice}`);
    
        // Визуальный feedback
        const originalText = button.textContent;
        button.textContent = 'Добавлено!';
        button.style.background = '#4CAF50';
    
        setTimeout(() => {
        button.textContent = originalText;
        button.style.background = '';
         }, 2000);
        }

        // добавленные формы
          document.addEventListener('DOMContentLoaded', function() {
            // Элементы DOM
            const contactForm = document.getElementById('requestForm');
            const policyAgreement = document.getElementById('policyAgreement');
            const policyLink = document.getElementById('policyLink');
            const policyModal = document.getElementById('policyModal');
            const closeModal = document.getElementById('closeModal');
            const submitBtn = document.getElementById('submitBtn');
            const successMessage = document.getElementById('successMessage');
            
            // Элементы для валидации
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const nameError = document.getElementById('nameError');
            const emailError = document.getElementById('emailError');
            const policyError = document.getElementById('policyError');
            
            // Открытие модального окна с политикой
            policyLink.addEventListener('click', function() {
                policyModal.style.display = 'flex';
            });
            
            // Закрытие модального окна
            closeModal.addEventListener('click', function() {
                policyModal.style.display = 'none';
            });
            
            // Закрытие модального окна при клике вне его
            window.addEventListener('click', function(event) {
                if (event.target === policyModal) {
                    policyModal.style.display = 'none';
                }
            });
            
            // Валидация формы
            function validateForm() {
                let isValid = true;
                
                // Валидация имени
                if (nameInput.value.trim() === '') {
                    nameError.style.display = 'block';
                    isValid = false;
                } else {
                    nameError.style.display = 'none';
                }
                
                // Валидация email
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(emailInput.value)) {
                    emailError.style.display = 'block';
                    isValid = false;
                } else {
                    emailError.style.display = 'none';
                }
                
                // Валидация согласия с политикой
                if (!policyAgreement.checked) {
                    policyError.style.display = 'block';
                    isValid = false;
                } else {
                    policyError.style.display = 'none';
                }
                
                return isValid;
            }
            
            // Активация/деактивация кнопки отправки
            function toggleSubmitButton() {
                const isPolicyAgreed = policyAgreement.checked;
                submitBtn.disabled = !isPolicyAgreed;
            }
            
            // Обработка изменений в форме
            
            policyAgreement.addEventListener('change', function() {
                toggleSubmitButton();
                if (policyAgreement.checked) {
                    policyError.style.display = 'none';
                }
            });
            
            // Обработка отправки формы
            contactForm.addEventListener('submit', function(event) {
                event.preventDefault();
                
                if (validateForm()) {
                    // В реальном приложении здесь был бы AJAX-запрос к серверу
                    successMessage.style.display = 'block';
                    successMessage.classList.add('fade-in'); 
                    
                    contactForm.reset();
                    submitBtn.disabled = true;
                    
                    // Скрываем сообщение об успехе через 5 секунд
                    setTimeout(function() {
                        successMessage.style.display = 'none';
                        successMessage.classList.remove('fade-in');
                    }, 5000);
                }
            });
            
            // Инициализация - кнопка отправки изначально неактивна
            toggleSubmitButton();
        });

        // Наблюдаем за элементами для анимации
        document.querySelectorAll('.category-card, .product-card, .service-card').forEach(el => {
            el.style.opacity = 0;
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            observer.observe(el);

        });

       // Управление cookies уведомлением
          function initCookiesNotification() {
               // Проверяем, было ли уже принято соглашение
              const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    
              if (!cookiesAccepted) {
                  // Показываем уведомление через 2 секунды после загрузки страницы
                  setTimeout(() => {
                      const notification = document.getElementById('cookiesNotification');
                      notification.classList.add('show');
                  }, 2000);
              }
          }

          function acceptCookies() {
              // Сохраняем согласие в localStorage
              localStorage.setItem('cookiesAccepted', 'true');
    
              // Скрываем уведомление
              const notification = document.getElementById('cookiesNotification');
              notification.classList.remove('show');
    
              // Можно добавить отправку события в Analytics
              console.log('Cookies приняты пользователем');
    
              // Показываем подтверждение (опционально)
              showCookiesConfirmation();
          }

          function openCookiesPolicy() {
              // Закрываем текущее уведомление
              const notification = document.getElementById('cookiesNotification');
              notification.classList.remove('show');
    
              // Открываем модальное окно с политикой cookies
              openCookiesPolicyModal();
          }

          function showCookiesConfirmation() {
              // Создаем временное подтверждение
              const confirmation = document.createElement('div');
              confirmation.innerHTML = `
                  <div style="
                      position: fixed;
                      bottom: 20px;
                      right: 20px;
                      background: #4CAF50;
                      color: white;
                      padding: 10px 20px;
                      border-radius: 5px;
                      box-shadow: 0 3px 10px rgba(0,0,0,0.2);
                      z-index: 1001;
                      animation: slideIn 0.3s ease;
                  ">
                      ✅ Настройки cookies сохранены
                  </div>
              `;
    
              document.body.appendChild(confirmation);
    
                   // Удаляем через 3 секунды
                   setTimeout(() => {
                  confirmation.remove();
              }, 3000);
          }

          function openCookiesPolicyModal() {
              // Создаем модальное окно с политикой cookies
              const modal = document.createElement('div');
              modal.className = 'modal';
              modal.style.display = 'flex';
              modal.innerHTML = `
                  <div class="modal-content">
                      <span class="close-modal" onclick="this.parentElement.parentElement.remove()">&times;</span>
                      <h2>Политика использования cookies</h2>
                      <div style="max-height: 60vh; overflow-y: auto; padding-right: 10px;">
                          <h3>Что такое cookies?</h3>
                          <p>Cookies — это небольшие текстовые файлы, которые хранятся на вашем устройстве при посещении веб-сайтов.</p>
                
                          <h3>Какие cookies мы используем?</h3>
                          <ul>
                              <li><strong>Необходимые cookies:</strong> Обеспечивают работу основных функций сайта</li>
                              <li><strong>Аналитические cookies:</strong> Помогают нам понимать, как пользователи взаимодействуют с сайтом</li>
                              <li><strong>Функциональные cookies:</strong> Запоминают ваши preferences и настройки</li>
                          </ul>
                
                          <h3>Управление cookies</h3>
                               <p>Вы можете управлять настройками cookies через ваш браузер. Однако отключение некоторых cookies может ограничить функциональность сайта.</p>
                
                               <div style="margin-top: 20px; padding: 15px; background: #f8f9fa; border-radius: 5px;">
                                   <p><strong>Продолжая использовать наш сайт, вы соглашаетесь с использованием cookies в соответствии с этой политикой.</strong></p>
                               </div>
                      </div>
                      <div style="margin-top: 20px; display: flex; gap: 10px; justify-content: flex-end;">
                          <button class="btn btn-outline" onclick="this.closest('.modal').remove()">Закрыть</button>
                          <button class="btn" onclick="acceptCookiesFromModal(this)">Принять все</button>
                      </div>
                  </div>
                   `;
    
              document.body.appendChild(modal);
    
              // Закрытие при клике вне модального окна
              modal.addEventListener('click', function(e) {
                  if (e.target === modal) {
                      modal.remove();
                  }
              });
          }

          function acceptCookiesFromModal(button) {
              const modal = button.closest('.modal');
              acceptCookies();
              modal.remove();
          }

          // Функция для сброса cookies согласия (для тестирования)
               function resetCookiesConsent() {
                   localStorage.removeItem('cookiesAccepted');
                   console.log('Cookies согласие сброшено. Уведомление появится при следующей загрузке.');
               }

          // Инициализация при загрузке страницы
               document.addEventListener('DOMContentLoaded', function() {
                   initCookiesNotification();
          });
