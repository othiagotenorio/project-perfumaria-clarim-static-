// Banco de dados local de produtos - Clarim Perfumes
const produtos = [
    {
        id: 1,
        nome: "Ambre Royal",
        marca: "Xerjoff",
        categoria: "Masculino",
        tipo: "Árabe",
        preco: 1890.00,
        descricao: "Uma fusão majestosa de âmbar quente, resinas preciosas e especiarias exóticas do oriente.",
        imagem: "assets/perfumes/ASAD.webp",
        destaque: true
    },
    {
        id: 2,
        nome: "Oud Vendôme",
        marca: "Maison Francis Kurkdjian",
        categoria: "Masculino",
        tipo: "Árabe",
        preco: 2450.00,
        descricao: "A reinterpretação ocidental do ouro líquido oriental: oud precioso com um toque de incenso e patchouli.",
        imagem: "assets/perfumes/ASAD.webp",
        destaque: true
    },
    {
        id: 3,
        nome: "Jasmine d'Or",
        marca: "Chanel",
        categoria: "Feminino",
        tipo: "Importado",
        preco: 1250.00,
        descricao: "Uma homenagem sofisticada ao jasmim colhido ao amanhecer, entrelaçado com notas florais e baunilha.",
        imagem: "assets/perfumes/ASAD.webp",
        destaque: true
    },
    {
        id: 4,
        nome: "Mystic Rose",
        marca: "Creed",
        categoria: "Feminino",
        tipo: "Árabe",
        preco: 1980.00,
        descricao: "Rosa damascena rica envolta em fumaça de incenso e madeiras nobres, revelando mistério e poder.",
        imagem: "assets/perfumes/ASAD.webp",
        destaque: false
    },
    {
        id: 5,
        nome: "Gold Leather",
        marca: "Tom Ford",
        categoria: "Masculino",
        tipo: "Importado",
        preco: 2100.00,
        descricao: "Couro rústico sofisticado com notas de rum, açafrão e tabaco cubano. Extremamente elegante.",
        imagem: "assets/perfumes/ASAD.webp",
        destaque: true
    },
    {
        id: 6,
        nome: "Baccarat Aura",
        marca: "Maison Francis Kurkdjian",
        categoria: "Feminino",
        tipo: "Importado",
        preco: 2890.00,
        descricao: "Uma fragrância alquímica que combina flores brancas, cedro e âmbar cinzento. Poética e brilhante.",
        imagem: "assets/perfumes/ASAD.webp",
        destaque: true
    },
    {
        id: 7,
        nome: "Essência da Terra",
        marca: "Clarim Privé",
        categoria: "Feminino",
        tipo: "Nacional",
        preco: 340.00,
        descricao: "Inspirado na riqueza da flora brasileira, com notas de orquídea selvagem, sândalo e fava tonka.",
        imagem: "assets/perfumes/ASAD.webp",
        destaque: true
    },
    {
        id: 8,
        nome: "Vento Absoluto",
        marca: "Clarim Privé",
        categoria: "Masculino",
        tipo: "Nacional",
        preco: 320.00,
        descricao: "Fragrância amadeirada fresca, combinando vetiver verde, notas cítricas e especiarias nacionais.",
        imagem: "assets/perfumes/ASAD.webp",
        destaque: true
    },
    {
        id: 9,
        nome: "Orquídea Negra",
        marca: "Tom Ford",
        categoria: "Feminino",
        tipo: "Importado",
        preco: 1450.00,
        descricao: "Notas escuras e sedutoras de orquídea negra, chocolate amargo e trufas preciosas.",
        imagem: "assets/perfumes/ASAD.webp",
        destaque: true
    },
    {
        id: 10,
        nome: "Deserto de Ouro",
        marca: "Xerjoff",
        categoria: "Masculino",
        tipo: "Árabe",
        preco: 2990.00,
        descricao: "Uma ode ao deserto árabe, trazendo incenso sagrado, mirra e baunilha defumada intensa.",
        imagem: "assets/perfumes/ASAD.webp",
        destaque: false
    },
    {
        id: 11,
        nome: "Chloé Sublime",
        marca: "Dior",
        categoria: "Feminino",
        tipo: "Importado",
        preco: 1150.00,
        descricao: "Floral cristalino e romântico, com notas de peônia rosa, lichia fresca e magnólia.",
        imagem: "assets/perfumes/ASAD.webp",
        destaque: false
    },
    {
        id: 12,
        nome: "Aventus Imperador",
        marca: "Creed",
        categoria: "Masculino",
        tipo: "Importado",
        preco: 2600.00,
        descricao: "O lendário aroma de abacaxi defumado, bétula, patchouli e almíscar de prestígio.",
        imagem: "assets/perfumes/ASAD.webp",
        destaque: false
    },
    {
        id: 13,
        nome: "Brisa Imperial",
        marca: "Clarim Privé",
        categoria: "Feminino",
        tipo: "Nacional",
        preco: 280.00,
        descricao: "Leveza e elegância em notas de chá branco, bergamota e flores brancas delicadas.",
        imagem: "assets/perfumes/ASAD.webp",
        destaque: false
    },
    {
        id: 14,
        nome: "Madeiras Nobres",
        marca: "Clarim Privé",
        categoria: "Masculino",
        tipo: "Nacional",
        preco: 290.00,
        descricao: "Fragrância marcante e terrosa, construída com jacarandá, cedro do Himalaia e patchouli.",
        imagem: "assets/perfumes/ASAD.webp",
        destaque: false
    },
    {
        id: 15,
        nome: "Royal Oud Supreme",
        marca: "Parfums de Marly",
        categoria: "Masculino",
        tipo: "Árabe",
        preco: 3200.00,
        descricao: "Oud real de altíssima pureza combinado com pimenta preta, açafrão e couro nobre.",
        imagem: "assets/perfumes/ASAD.webp",
        destaque: false
    },
    {
        id: 16,
        nome: "Delina Royale",
        marca: "Parfums de Marly",
        categoria: "Feminino",
        tipo: "Importado",
        preco: 2300.00,
        descricao: "Um buquê floral fascinante dominado por rosa turca pura, ruibarbo e incenso misterioso.",
        imagem: "assets/perfumes/ASAD.webp",
        destaque: false
    },
    {
        id: 17,
        nome: "Nuit d'Orient",
        marca: "Maison Francis Kurkdjian",
        categoria: "Feminino",
        tipo: "Árabe",
        preco: 2750.00,
        descricao: "A doçura sensual de tâmaras e mel selvagem, fundida com almíscar oriental e mirra.",
        imagem: "assets/perfumes/ASAD.webp",
        destaque: false
    },
    {
        id: 18,
        nome: "Aura Dourada",
        marca: "Clarim Privé",
        categoria: "Feminino",
        tipo: "Nacional",
        preco: 360.00,
        descricao: "Um perfume solar e sofisticado com notas de âmbar dourado, jasmim manga e coco de praia refinado.",
        imagem: "assets/perfumes/ASAD.webp",
        destaque: false
    },
    {
        id: 19,
        nome: "Valkyria Premium",
        marca: "Xerjoff",
        categoria: "Feminino",
        tipo: "Importado",
        preco: 3100.00,
        descricao: "Fragrância intensa que equilibra íris florentina, framboesa madura e sândalo cremoso.",
        imagem: "assets/perfumes/ASAD.webp",
        destaque: false
    },
    {
        id: 20,
        nome: "Santal Imperial",
        marca: "Creed",
        categoria: "Masculino",
        tipo: "Importado",
        preco: 2450.00,
        descricao: "Sândalo majestoso combinado com notas cítricas cítricas refrescantes e almíscar suave.",
        imagem: "assets/perfumes/ASAD.webp",
        destaque: false
    }
];

// Exportação global para uso sem módulos
window.produtosData = produtos;
