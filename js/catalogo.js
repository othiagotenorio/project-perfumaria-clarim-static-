/**
 * Clarim Perfumes - Catalog Scripts
 * Handles dynamic product rendering, multi-filtering, sorting,
 * pagination, product details modal, and WhatsApp checkout integration.
 */

document.addEventListener("DOMContentLoaded", () => {
    // Check if we are on the catalog page. If not, exit script.
    const catalogGrid = document.getElementById("catalog-grid");
    if (!catalogGrid) return;

    // --- STATE MANAGEMENT ---
    let allProducts = window.produtosData || [];
    let filteredProducts = [...allProducts];
    let currentPage = 1;
    const itemsPerPage = 12;

    // Filters state
    let searchFilter = "";
    let categoryFilter = "todos";
    let originFilter = "todos";
    let sortBy = "preco-asc"; // default sorting

    // Parse URL parameters for pre-filtering (from home page categories)
    const urlParams = new URLSearchParams(window.location.search);
    const catParam = urlParams.get('categoria');
    const origParam = urlParams.get('origem');

    if (catParam) {
        categoryFilter = catParam;
        // Update the radio buttons checked state
        setTimeout(() => {
            const radios = document.getElementsByName("categoria");
            radios.forEach(radio => {
                if (radio.value.toLowerCase() === catParam.toLowerCase()) {
                    radio.checked = true;
                }
            });
        }, 0);
    }

    if (origParam) {
        originFilter = origParam;
        // Update the radio buttons checked state
        setTimeout(() => {
            const radios = document.getElementsByName("origem");
            radios.forEach(radio => {
                if (radio.value.toLowerCase() === origParam.toLowerCase()) {
                    radio.checked = true;
                }
            });
        }, 0);
    }

    // --- SELECTORS ---
    const searchInput = document.getElementById("search-input");
    const categoryRadios = document.getElementsByName("categoria");
    const originRadios = document.getElementsByName("origem");
    const sortSelect = document.getElementById("sort-select");
    const paginationContainer = document.getElementById("pagination");
    const resultsCountEl = document.getElementById("results-count");
    const totalCountEl = document.getElementById("total-count");

    // --- INIT ---
    if (totalCountEl) {
        totalCountEl.textContent = allProducts.length;
    }
    applyFiltersAndRender();

    // --- EVENT LISTENERS ---
    
    // Real-time Text Search (Name and Brand)
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            searchFilter = e.target.value.toLowerCase().trim();
            currentPage = 1; // Reset to page 1
            applyFiltersAndRender();
        });
    }

    // Category Filter (Radios)
    categoryRadios.forEach(radio => {
        radio.addEventListener("change", (e) => {
            categoryFilter = e.target.value;
            currentPage = 1; // Reset to page 1
            applyFiltersAndRender();
        });
    });

    // Origin/Type Filter (Radios)
    originRadios.forEach(radio => {
        radio.addEventListener("change", (e) => {
            originFilter = e.target.value;
            currentPage = 1; // Reset to page 1
            applyFiltersAndRender();
        });
    });

    // Sort Select
    if (sortSelect) {
        sortSelect.addEventListener("change", (e) => {
            sortBy = e.target.value;
            applyFiltersAndRender();
        });
    }

    // --- LOGIC FUNCTIONS ---

    function applyFiltersAndRender() {
        // 1. Filter products
        filteredProducts = allProducts.filter(product => {
            // Search text match
            const matchesSearch = product.nome.toLowerCase().includes(searchFilter) || 
                                  product.marca.toLowerCase().includes(searchFilter);
            
            // Category match
            const matchesCategory = categoryFilter === "todos" || 
                                    product.categoria.toLowerCase() === categoryFilter.toLowerCase() ||
                                    product.categoria.toLowerCase() === "compartilhável";
            
            // Origin match
            const matchesOrigin = originFilter === "todos" || 
                                  product.tipo.toLowerCase() === originFilter.toLowerCase();

            return matchesSearch && matchesCategory && matchesOrigin;
        });

        // 2. Sort products
        if (sortBy === "preco-asc") {
            filteredProducts.sort((a, b) => a.preco - b.preco);
        } else if (sortBy === "preco-desc") {
            filteredProducts.sort((a, b) => b.preco - a.preco);
        } else if (sortBy === "alfabeto") {
            filteredProducts.sort((a, b) => a.nome.localeCompare(b.nome));
        }

        // Update results counter
        if (resultsCountEl) {
            resultsCountEl.textContent = filteredProducts.length;
        }

        // Render products grid & pagination
        renderGrid();
        renderPagination();
    }

    function renderGrid() {
        catalogGrid.innerHTML = "";

        if (filteredProducts.length === 0) {
            catalogGrid.innerHTML = `
                <div class="no-results animate-on-scroll animated">
                    <div class="no-results-icon">
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            <line x1="8" y1="11" x2="14" y2="11"></line>
                        </svg>
                    </div>
                    <h3>Nenhum perfume encontrado</h3>
                    <p>Tente alterar seus filtros ou refine sua busca por marca ou fragrância.</p>
                </div>
            `;
            return;
        }

        // Paginate products
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

        paginatedProducts.forEach(product => {
            const card = document.createElement("article");
            card.className = "product-card animate-on-scroll animated";
            
            // Premium formatter for prices in BRL
            const formattedPrice = product.preco.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            });

            // Prefilled WhatsApp message
            const whatsAppText = encodeURIComponent(`Olá! Gostaria de saber mais informações e como comprar o perfume "${product.nome}" da marca "${product.marca}" (${product.tipo}), que vi no catálogo do site Clarim Perfumes.`);
            const whatsAppLink = `https://wa.me/5500000000000?text=${whatsAppText}`;

            card.innerHTML = `
                <span class="product-tag">${product.tipo}</span>
                <div class="product-image-container">
                    <img src="${product.imagem}" alt="${product.nome} - ${product.marca}" class="product-img" loading="lazy">
                </div>
                <div class="product-info">
                    <span class="product-brand">${product.marca}</span>
                    <h3 class="product-name">${product.nome}</h3>
                    <span class="product-category">${product.categoria}</span>
                    <div class="product-price">${formattedPrice}</div>
                    <div class="product-actions">
                        <a href="${whatsAppLink}" target="_blank" class="btn btn-emerald btn-buy">Comprar</a>
                        <button class="btn btn-secondary btn-details" data-id="${product.id}">Detalhes</button>
                    </div>
                </div>
            `;

            // Event listener for opening detail Modal
            card.querySelector(".btn-details").addEventListener("click", () => {
                openProductModal(product);
            });

            catalogGrid.appendChild(card);
        });
    }

    function renderPagination() {
        paginationContainer.innerHTML = "";

        const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
        if (totalPages <= 1) return; // No pagination needed for 1 page

        // 1. Previous button
        const prevBtn = document.createElement("button");
        prevBtn.className = `page-btn prev ${currentPage === 1 ? 'disabled' : ''}`;
        prevBtn.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
            </svg> Anterior
        `;
        if (currentPage > 1) {
            prevBtn.addEventListener("click", () => {
                currentPage--;
                applyFiltersAndRender();
                window.scrollTo({ top: 200, behavior: "smooth" });
            });
        }
        paginationContainer.appendChild(prevBtn);

        // 2. Page numbers
        for (let i = 1; i <= totalPages; i++) {
            const pageBtn = document.createElement("button");
            pageBtn.className = `page-btn ${currentPage === i ? 'active' : ''}`;
            pageBtn.textContent = i;
            pageBtn.addEventListener("click", () => {
                currentPage = i;
                applyFiltersAndRender();
                window.scrollTo({ top: 200, behavior: "smooth" });
            });
            paginationContainer.appendChild(pageBtn);
        }

        // 3. Next button
        const nextBtn = document.createElement("button");
        nextBtn.className = `page-btn next ${currentPage === totalPages ? 'disabled' : ''}`;
        nextBtn.innerHTML = `
            Próximo <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
        `;
        if (currentPage < totalPages) {
            nextBtn.addEventListener("click", () => {
                currentPage++;
                applyFiltersAndRender();
                window.scrollTo({ top: 200, behavior: "smooth" });
            });
        }
        paginationContainer.appendChild(nextBtn);
    }

    // --- PRODUCT MODAL FUNCTIONALITY ---
    function openProductModal(product) {
        // Create modal element if it doesn't exist
        let modal = document.getElementById("product-modal");
        if (!modal) {
            modal = document.createElement("div");
            modal.id = "product-modal";
            modal.className = "modal-overlay";
            
            // Add basic modal stylesheet inline if not in style.css for safe decoupling
            const style = document.createElement("style");
            style.textContent = `
                .modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(18, 18, 18, 0.9);
                    backdrop-filter: blur(15px);
                    -webkit-backdrop-filter: blur(15px);
                    z-index: 1100;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    opacity: 0;
                    visibility: hidden;
                    transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
                    padding: 2rem;
                }
                .modal-overlay.open {
                    opacity: 1;
                    visibility: visible;
                }
                .modal-box {
                    max-width: 800px;
                    width: 100%;
                    background: #1a1a1a;
                    border: 1px solid rgba(212, 175, 55, 0.2);
                    border-radius: 8px;
                    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.8);
                    position: relative;
                    overflow: hidden;
                    display: grid;
                    grid-template-columns: 1.1fr 1.3fr;
                    transform: translateY(30px);
                    transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
                }
                .modal-overlay.open .modal-box {
                    transform: translateY(0);
                }
                .modal-close {
                    position: absolute;
                    top: 15px;
                    right: 15px;
                    background: rgba(18, 18, 18, 0.7);
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #fff;
                    cursor: pointer;
                    z-index: 20;
                    border: 1px solid rgba(212, 175, 55, 0.1);
                    transition: all 0.2s ease;
                }
                .modal-close:hover {
                    color: #D4AF37;
                    border-color: #D4AF37;
                    transform: rotate(90deg);
                }
                .modal-image-wrapper {
                    height: 100%;
                    background: #0d0d0d;
                }
                .modal-image-wrapper img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
                .modal-details {
                    padding: 3rem;
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                    justify-content: center;
                }
                .modal-brand {
                    font-size: 0.8rem;
                    text-transform: uppercase;
                    color: #D4AF37;
                    letter-spacing: 2px;
                    font-weight: 500;
                }
                .modal-name {
                    font-family: 'Cormorant Garamond', 'Playfair Display', serif;
                    font-size: 2.5rem;
                    font-weight: 300;
                    line-height: 1.1;
                }
                .modal-tags {
                    display: flex;
                    gap: 0.75rem;
                    font-size: 0.75rem;
                }
                .modal-tag {
                    background: rgba(253, 251, 247, 0.05);
                    padding: 0.2rem 0.6rem;
                    border-radius: 4px;
                    border: 1px solid rgba(253, 251, 247, 0.1);
                    color: rgba(253, 251, 247, 0.8);
                }
                .modal-tag.origin {
                    background: #0F3E2C;
                    border-color: #0F3E2C;
                    color: #FFF;
                }
                .modal-description {
                    font-size: 0.9rem;
                    color: rgba(253, 251, 247, 0.6);
                    line-height: 1.6;
                    margin: 0.5rem 0;
                }
                .modal-price {
                    font-family: 'Cormorant Garamond', 'Playfair Display', serif;
                    font-size: 2.2rem;
                    color: #E5C158;
                    font-weight: 600;
                }
                .modal-actions {
                    margin-top: 1rem;
                }
                .modal-actions .btn {
                    width: 100%;
                    padding: 1rem;
                }

                @media (max-width: 768px) {
                    .modal-overlay {
                        padding: 1rem;
                    }
                    .modal-box {
                        grid-template-columns: 1fr;
                        max-height: 90vh;
                        overflow-y: auto;
                    }
                    .modal-image-wrapper {
                        height: 250px;
                    }
                    .modal-details {
                        padding: 1.5rem;
                    }
                    .modal-name {
                        font-size: 2rem;
                    }
                }
            `;
            document.head.appendChild(style);
            document.body.appendChild(modal);
        }

        const formattedPrice = product.preco.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });

        // Prefilled WhatsApp message
        const whatsAppText = encodeURIComponent(`Olá! Gostaria de comprar o perfume "${product.nome}" da marca "${product.marca}" (${product.tipo}) no valor de ${formattedPrice}, que vi no catálogo do site Clarim Perfumes.`);
        const whatsAppLink = `https://wa.me/5500000000000?text=${whatsAppText}`;

        modal.innerHTML = `
            <div class="modal-box">
                <span class="modal-close">&times;</span>
                <div class="modal-image-wrapper">
                    <img src="${product.imagem}" alt="${product.nome}">
                </div>
                <div class="modal-details">
                    <span class="modal-brand">${product.marca}</span>
                    <h2 class="modal-name">${product.nome}</h2>
                    <div class="modal-tags">
                        <span class="modal-tag origin">${product.tipo}</span>
                        <span class="modal-tag">${product.categoria}</span>
                    </div>
                    <p class="modal-description">${product.descricao}</p>
                    <div class="modal-price">${formattedPrice}</div>
                    <div class="modal-actions">
                        <a href="${whatsAppLink}" target="_blank" class="btn btn-emerald">Comprar pelo WhatsApp</a>
                    </div>
                </div>
            </div>
        `;

        // Disable scrolling when modal is open
        document.body.style.overflow = "hidden";

        // Open modal
        setTimeout(() => {
            modal.classList.add("open");
        }, 50);

        // Close handlers
        const closeBtn = modal.querySelector(".modal-close");
        const closeModal = () => {
            modal.classList.remove("open");
            document.body.style.overflow = "";
            setTimeout(() => {
                modal.innerHTML = "";
            }, 400);
        };

        closeBtn.addEventListener("click", closeModal);
        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
});
