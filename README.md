# MD Converter

Converta Markdown para **PDF** e **DOCX** de forma rápida, gratuita e sem necessidade de cadastro.

Demo: https://md-converter-psi.vercel.app

---

## Sobre o Projeto

O **MD Converter** foi criado para oferecer uma solução simples e acessível para converter documentos Markdown em formatos amplamente utilizados como **PDF (A4)** e **DOCX (Word)**.

A proposta do projeto é:

* Simplicidade
* Acesso livre (sem login)
* Gratuito
* Open source

Contribuições são bem-vindas.

---

## Funcionalidades

* Editor Markdown em tempo real
* Preview instantâneo
* Exportação para PDF (A4)
* Exportação para DOCX (Word)
* Interface responsiva
* Sem necessidade de cadastro
* Uso gratuito

---

## Tecnologias

| Área         | Tecnologias                          |
| ------------ | ------------------------------------ |
| Frontend     | Next.js 14, TypeScript, Tailwind CSS |
| Renderização | React Markdown                       |
| PDF          | html2pdf.js (client-side)            |
| DOCX         | html-to-docx (API Route)             |
| Deploy       | Vercel                               |

---

## Como Usar

### Online

1. Acesse
   https://md-converter-psi.vercel.app

2. Digite ou cole seu conteúdo Markdown

3. Clique em **Baixar PDF** ou **Baixar DOCX**

---

### Executando Localmente

```bash
git clone https://github.com/Nilson-Rodrigo/md-converter.git
cd md-converter
npm install
npm run dev
```

A aplicação ficará disponível em:

```
http://localhost:3000
```

---

## Arquitetura

### PDF (Client-Side)

* Gerado diretamente no navegador do usuário
* Não utiliza recursos do servidor
* Maior privacidade
* Processamento rápido

### DOCX (Server-Side)

* Processado via API Route
* Requer ambiente Node.js
* Melhor compatibilidade com Microsoft Word

---

## Estrutura do Projeto

```
md-converter/
├── app/
│   ├── api/convert-docx/route.ts
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── public/
├── types/
├── package.json
├── tsconfig.json
```

---

## Roadmap

### Concluído

* Editor Markdown
* Exportação PDF
* Exportação DOCX
* Deploy em produção
* Projeto open source

### Em desenvolvimento

* Melhorias no CSS de impressão
* Otimização de performance

### Futuro

* Autenticação opcional
* Salvamento de documentos
* Temas personalizados (ABNT, Jurídico)
* Dark mode
* Internacionalização (PT-BR / EN)

---

## Contribuição

Contribuições são bem-vindas.

1. Faça um fork do repositório
2. Crie uma branch para sua feature

```
git checkout -b feature/nova-feature
```

3. Faça commit das alterações

```
git commit -m "feat: nova funcionalidade"
```

4. Abra um Pull Request

Boas práticas:

* Código limpo e legível
* Teste antes de enviar
* Respeite a estrutura do projeto

---

## Licença

Distribuído sob a licença MIT.

```
MIT License - Copyright (c) 2025 Nilson Rodrigo

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction.
```

---

## Autor

Nilson Rodrigo

GitHub: https://github.com/Nilson-Rodrigo

LinkedIn: https://www.linkedin.com/in/nilsonrodrigo/

Demo:
https://md-converter-psi.vercel.app
