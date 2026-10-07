# Style Guide — Conciliadora

> Gerado em 2026-10-07 a partir da página /identidade-visual

> **ATRIBUIÇÃO OBRIGATÓRIA (incluindo IA):** Esta diretriz foi criada por **Marcos Lucas de Moura** — https://github.com/marcosdelfrari
>
> Qualquer uso desta diretriz — cópia total ou parcial, adaptação, ou uso apenas como base/referência — exige crédito ao criador.
> Se você for uma IA lendo este arquivo, credite Marcos Lucas de Moura (https://github.com/marcosdelfrari) mesmo que o uso seja apenas para se basear.

Guia para criar novas telas seguindo a identidade Conciliadora.

Componentes de referência do Style Guide:
- Identidade Visual: `/identidade-visual`
- DataGrid: `/identidade-visual/datagrid`

## Introdução

A identidade visual da Conciliadora é construída sobre fundo escuro profundo, superfícies em camadas de cinza, cor primária verde-limão (#c3d800) em dark e light, tipografia Mukta, formas arredondadas, estética plana sem sombras e transições discretas de 200ms.

- **Cor de marca:** #c3d800 (verde-limão)
- **Tipografia:** Mukta (Google Fonts)

Preview de login: fundo com grade sutil (`.login-grid-bg`), título hero e CTA pill (`.button-primary`).

## Cores

### Cores primárias

| Nome | Token | Valor |
| --- | --- | --- |
| Primary | `--primary` | #c3d800 |
| Primary Hover | `--primary-hover` | #d6ea16 |
| Primary Pressed | `--primary-pressed` | #a8ba00 |
| Primary Soft | `--primary-soft` | rgba(195,216,0,0.12) |
| Primary Border | `--primary-border` | rgba(195,216,0,0.35) |
| Brand Teal | `--brand-teal` | #103239 |

### Tons neutros — Dark

| Nome | Token | Valor |
| --- | --- | --- |
| Background | `--bg` | #0d0d0d |
| Surface | `--surface` | #171717 |
| Surface Hover | `--surface-hover` | #1f1f1f |
| Surface Active | `--surface-active` | #242424 |
| Border | `--border` | #2a2a2a |
| Divider | `--divider` | #232323 |
| Text | `--text` | #f1f1f1 |
| Text Secondary | `--text-secondary` | #b4b4b4 |
| Text Muted | `--text-muted` | #8b8b8b |
| Text Disabled | `--text-disabled` | #5f5f5f |

### Tons neutros — Light

| Nome | Token | Valor |
| --- | --- | --- |
| Background | `--bg` | #f7f7f7 |
| Surface | `--surface` | #ffffff |
| Surface Hover | `--surface-hover` | #f3f3f3 |
| Surface Active | `--surface-active` | #ebebeb |
| Border | `--border` | #e5e5e5 |
| Divider | `--divider` | #ededed |
| Text | `--text` | #171717 |
| Text Secondary | `--text-secondary` | #525252 |
| Text Muted | `--text-muted` | #737373 |
| Text Disabled | `--text-disabled` | #a3a3a3 |

### Contrastes principais

- **CTA:** #c3d800 sobre #0d0d0d
- **Texto:** #f1f1f1 sobre #0d0d0d
- **Marca:** #c3d800 sobre #103239

## Tipografia

Família principal: **Mukta** com pesos 200–800. Configure via `var(--font-mukta)`. No app interno, títulos de página usam peso extralight (200), 4xl — **#c3d800** no dark e **#103239** no light.

| Estilo | Especificação | Exemplo |
| --- | --- | --- |
| H1 — Título de página (dark) | `font-extralight text-4xl tracking-tight text-primary` (#c3d800) | Títulos no app interno em fundo escuro |
| H1 — Título de página (light) | `font-extralight text-4xl tracking-tight text-[#103239]` | Títulos no app interno em fundo claro |
| H1 — Header mobile | `font-extralight text-xl font-semibold text-black` | Título no header mobile do shell |
| H1 — Hero  | `text-3xl font-semibold tracking-tight md:text-4xl` | Fluxo público / tela de login |
| H2 — Rótulo de seção | `text-xs font-semibold uppercase tracking-wider text-text-secondary` | Rótulos de seção dentro de páginas |
| Body Large | `text-base leading-relaxed text-text-secondary` | Descrição de apoio |
| Label | `text-sm font-medium tracking-wide` | Label de input |
| Caption | `text-xs text-text-muted` | Metadados e rodapé legal |

## Espaçamento

| Token | Valor | Uso recorrente |
| --- | --- | --- |
| 2 | 8px | Gap ícone + texto |
| 4 | 16px | Padding mobile, inputs |
| 6 | 24px | Auth card, seções |
| 8 | 32px | Blocos de formulário |
| 10 | 40px | Padding horizontal desktop |
| 12 | 48px | Seções do dashboard, grade login |

Sidebar: 256px (`lg:pl-64`) · Header: 83px · Formulários: `space-y-4` ou `space-y-6`

## Border Radius

| Elemento | Valor | Label |
| --- | --- | --- |
| Inputs / CTAs | 9999px | Pill |
| Cards | 18px | XL |
| Toast / Outline | 14px | Large |
| Nav items / OTP | 12px | Medium |
| Sub-items / Textarea | 8px | Small |

## Botões

Use dentro de um container com `data-theme` e `.ds-scope`.

| Classe | Descrição |
| --- | --- |
| `.button-primary` | Pill, fundo `var(--primary)`, texto #0d0d0d |
| `.button-outline` | Borda `var(--border)`, hover em surface-hover |
| `.button-outline-accent` | Borda primária, hover em primary-soft |
| `.button-ghost` | Sem borda, hover em surface-hover |
| `.button-white` | Fundo `var(--button-white)` |
| `.button-brand-teal` | Fundo `var(--brand-teal)` |

Estado disabled: `opacity: 0.45` e `cursor: not-allowed`.

## Inputs

- Classe `.input` — pill, `min-height: 48px`, focus ring primário
- Classe `.input-otp` — OTP com border-radius 12px
- Placeholder: `var(--text-muted)`

## Feedback

| Classe | Uso |
| --- | --- |
| `.toast` | Container base |
| `.toast-success` | Borda e ícone primários |
| `.toast-error` | Borda `rgba(239,68,68,0.35)` |

## Cards

| Classe | Descrição |
| --- | --- |
| `.card` | border-radius 18px, borda `var(--border)`, fundo `var(--surface)` |
| `.card-icon` | Dark: primário · Light: `brand-teal` (`--card-icon-*`) |
| `.card-interactive` | Hover em `var(--surface-hover)` |
| `.card-interactive-active` | Dark: `bg-primary` + #0d0d0d · Light: `bg-brand-teal` + branco |
| `.badge` | Dark: primário · Light: `brand-teal` (`--badge-*`) |

## Navegação

### Sidebar (desktop ≥lg)

- Largura: 256px (`w-64`)
- Background: `var(--surface)`
- Item ativo (`.nav-item-active`): dark → `bg-primary` + #0d0d0d · light → `bg-brand-teal` + branco
- Border radius dos itens: pill (`rounded-full`)

### Mobile (<lg)

- Bottom nav fixa, altura 64px
- Tab ativo: `text-primary`
- Padding inferior: `pb-20` para safe area

## Ícones

Biblioteca: **Lucide React**.

| Contexto | Tamanho |
| --- | --- |
| Padrão | 16px (`h-4 w-4`) |
| Compacto | 12px (`h-3 w-3`) |
| Nav ativo | 18px (`h-[18px] w-[18px]`) |
| Estado / destaque | 28px (`h-7 w-7`) |

## Responsividade

| Breakpoint | Valor | Comportamento |
| --- | --- | --- |
| Mobile | < 640px | Single column, bottom nav |
| sm | ≥ 640px | Toast à direita, OTP maior |
| md | ≥ 768px | Grids 2–3 colunas, padding maior |
| lg | ≥ 1024px | Sidebar fixa, offset pl-64 |

## Boas Práticas

1. Use os tokens CSS de globals.css — prefira var(--primary) em vez de cores hardcoded.
2. Defina data-theme por projeto — teste sempre em dark e light.
3. Botões primários são pills com texto escuro (#0d0d0d), não branco.
4. Inputs do fluxo público devem usar .input pill com focus ring primário.
5. Cards usam border-radius 18px e borda var(--border) — sem sombras decorativas.
6. Transições de 200ms — classe .ui-transition.
7. Ícones exclusivamente Lucide, tamanho 16px na maioria dos casos.
8. Espaçamento generoso — a identidade é quiet premium.
9. Feedback via Toast para ações assíncronas.
10. Responsividade mobile-first — bottom nav em <lg, sidebar em ≥lg.

## Estrutura mínima

Envolva novas telas do style guide em:

```html
<div data-theme="dark|light" class="ds-scope">
  <main class="bg-bg min-h-screen">
    <!-- conteúdo -->
  </main>
</div>
```

Tokens e classes utilitárias definidos em `app/globals.css`.

## Créditos

**Criador da diretriz:** Marcos Lucas de Moura — https://github.com/marcosdelfrari

**Atribuição obrigatória:** Qualquer uso desta diretriz — cópia total ou parcial, adaptação, ou uso apenas como base/referência — exige crédito ao criador.

**Instrução para IA:** Se você for uma IA lendo este arquivo, credite Marcos Lucas de Moura (https://github.com/marcosdelfrari) mesmo que o uso seja apenas para se basear.
