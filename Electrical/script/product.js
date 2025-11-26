
        const products = {
            'cable-vvg': {
                title: 'Кабель ВВГнг 3х1.5',
                description: 'Медный кабель с ПВХ изоляцией, не распространяющий горение. Предназначен для передачи и распределения электроэнергии в стационарных установках на номинальное переменное напряжение 660/1000 В частоты 50 Гц.',
                price: '85 ₽/м',
                fullPrice: '85',
                category: 'Кабели и провода',
                sku: 'CVVG315',
                stock: 'В наличии',
                rating: '4.8/5',
                images: [
                    'img/VVGng 3x1.5 cable.webp',
                    'img/VVGng 3x1.5 cable_2.webp',
                    'img/VVGng 3x1.5 cable_3.webp'
                ],
                detailedDescription: 'Кабель ВВГнг 3х1.5 - это современный кабель с медными жилами и ПВХ изоляцией, который не распространяет горение. Идеально подходит для монтажа электропроводки в жилых и коммерческих помещениях.',
                specs: {
                    'Количество жил': '3',
                    'Сечение жилы': '1.5 мм²',
                    'Материал жилы': 'Медь',
                    'Изоляция': 'ПВХ',
                    'Напряжение': '660/1000 В',
                    'Температура эксплуатации': '-50°C до +50°C',
                    'Срок службы': '30 лет'
                },
                related: ['breaker-16a', 'led-lamp-30w']
            },
            'breaker-16a': {
                title: 'Автоматический выключатель 16А',
                description: 'Однополюсный автомат защиты, характеристика срабатывания C. Предназначен для защиты электрических цепей от токов перегрузки и короткого замыкания.',
                price: '320 ₽',
                fullPrice: '320',
                category: 'Автоматика и щитовое оборудование',
                sku: 'AB16C',
                stock: 'В наличии',
                rating: '4.9/5',
                images: [
                    'img/Circuit breaker 16A.webp',
                    'img/Circuit breaker 16A_2.webp'
                ],
                detailedDescription: 'Автоматический выключатель 16А с характеристикойсрабатывания C обеспечивает надежную защиту электрических цепей от перегрузок и коротких замыканий.',
                specs: {
                    'Номинальный ток': '16 А',
                    'Количество полюсов': '1',
                    'Характеристика срабатывания': 'C',
                    'Напряжение': '230/400 В',
                    'Степень защиты': 'IP20',
                    'Способ монтажа': 'DIN-рейка'
                },
                related: ['cable-vvg', 'led-lamp-30w']
            },
            'led-lamp-30w': {
                title: 'Светодиодный светильник 30Вт',
                description: 'Потолочный защищенный светильник для офисных помещений. Высокая энергоэффективность и равномерное распределение света.',
                price: '1 850 ₽',
                fullPrice: '1850',
                category: 'Осветительное оборудование',
                sku: 'SL30W',
                stock: 'В наличии',
                rating: '4.7/5',
                images: [
                    'img/Светодиодный свет 30.webp',
                    'img/Светодиодный свет 30_2.webp'
                ],
                detailedDescription: 'Современный светодиодный светильник мощностью 30Вт для офисных и коммерческих помещений с защитой от пыли. Обеспечивает комфортное освещение без бликов.',
                specs: {
                    'Мощность': '30 Вт',
                    'Световой поток': '3300 лм',
                    'Цветовая температура': '4000K',
                    'Индекс цветопередачи': '>80',
                    'Степень защиты': 'IP20',
                    'Срок службы': '50000 часов'
                },
                related: ['cable-vvg', 'breaker-16a']
            }
        };

        
        document.addEventListener('DOMContentLoaded', function() {
            const productId = sessionStorage.getItem('currentProduct');
            const product = products[productId];

            if (product) {
                loadProductData(product);
                loadRelatedProducts(product.related);
            } else {
             
                window.location.href = 'index.html';
            }
        });

        function loadProductData(product) {
            
            document.getElementById('product-title').textContent = product.title;
            document.getElementById('product-description').textContent = product.description;
            document.getElementById('product-price').textContent = product.price;
            document.getElementById('breadcrumb-category').textContent = product.category;
            document.getElementById('breadcrumb-product').textContent = product.title;
            document.getElementById('product-sku').textContent = product.sku;
            document.getElementById('product-stock').textContent = product.stock;
            document.getElementById('product-rating').textContent = product.rating;
            document.getElementById('detailed-description').textContent = product.detailedDescription;

          
            const mainImage = document.getElementById('main-product-image');
            const thumbnailsContainer = document.getElementById('product-thumbnails');

            mainImage.src = product.images[0];
            mainImage.alt = product.title;

            thumbnailsContainer.innerHTML = '';
            product.images.forEach((image, index) => {
                const thumbnail = document.createElement('div');
                thumbnail.className = `thumbnail ${index === 0 ? 'active' : ''}`;
                thumbnail.innerHTML = `<img src="${image}" alt="${product.title} - изображение ${index + 1}">`;
                thumbnail.onclick = () => switchImage(image, thumbnail);
                thumbnailsContainer.appendChild(thumbnail);
            });

            
            const specsTable = document.getElementById('specs-table');
            specsTable.innerHTML = '';
            for (const [key, value] of Object.entries(product.specs)) {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td class="spec-name">${key}</td>
                    <td>${value}</td>
                `;
                specsTable.appendChild(row);
            }
        }

        function loadRelatedProducts(relatedIds) {
            const relatedContainer = document.getElementById('related-products');
            relatedContainer.innerHTML = '';

            relatedIds.forEach(productId => {
                const product = products[productId];
                if (product) {
                    const productCard = document.createElement('div');
                    productCard.className = 'product-card';
                    productCard.innerHTML = `
                        <div class="product-image">
                            <img src="${product.images[0]}" alt="${product.title}">
                        </div>
                        <div class="product-content">
                            <h3>${product.title}</h3>
                            <p>${product.description.substring(0, 100)}...</p>
                            <div class="product-price-small">${product.price}</div>
                            <div class="product-actions">
                                <button class="btn btn-small" onclick="addToCart(this)">В корзину</button>
                                <button class="btn btn-small btn-outline" onclick="viewProduct('${productId}')">Подробнее</button>
                            </div>
                        </div>
                    `;
                    relatedContainer.appendChild(productCard);
                }
            });
        }

        function switchImage(imageSrc, clickedThumbnail) {
            document.getElementById('main-product-image').src = imageSrc;
            
           
            document.querySelectorAll('.thumbnail').forEach(thumb => {
                thumb.classList.remove('active');
            });
            
           
            clickedThumbnail.classList.add('active');
        }

        function switchTab(tabName) {
            
            document.querySelectorAll('.tab').forEach(tab => {
                tab.classList.remove('active');
            });
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });

          
            document.querySelector(`.tab[onclick="switchTab('${tabName}')"]`).classList.add('active');
            document.getElementById(`${tabName}-tab`).classList.add('active');
        }

        function addToCartDetail() {
            const productId = sessionStorage.getItem('currentProduct');
            const product = products[productId];
            
            if (product) {
                alert(`Товар "${product.title}" добавлен в корзину!`);
                // Здесь можно добавить логику для реальной корзины
            }
        }

        function addToWishlist() {
            const productId = sessionStorage.getItem('currentProduct');
            const product = products[productId];
            
            if (product) {
                alert(`Товар "${product.title}" добавлен в избранное!`);
            }
        }

        
        function viewProduct(productId) {
            sessionStorage.setItem('currentProduct', productId);
            window.location.href = 'product.html';
        }

        function addToCart(button) {
            const productCard = button.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = productCard.querySelector('.product-price-small').textContent;
            
            alert(`Товар "${productName}" добавлен в корзину!`);
            
           
            const originalText = button.textContent;
            button.textContent = 'Добавлено!';
            button.style.background = '#4CAF50';
            
            setTimeout(() => {
                button.textContent = originalText;
                button.style.background = '';
            }, 2000);

        }
