# Design System — Setor de Marketing

Tokens e componentes **realmente em uso** no site (`app/globals.css` + `app/layout.tsx`).
Voz visual: dark (`#080808`) + um único acento **lime** (`#d5ff40`), títulos Bebas em CAIXA ALTA, alto contraste, lime com parcimônia (acento, não preenchimento).

---

## Cores

### Marca
| Token | Valor | Uso |
|---|---|---|
| `--lime` | `#d5ff40` | Acento principal, CTAs, destaques |
| `--lime-text` | `#0f1a00` | Texto sobre lime |
| `--lime-dim` | `rgba(213,255,64,.12)` | Preenchimentos sutis |
| `--lime-glow` | `rgba(213,255,64,.28)` | Halos / brilho |

### Superfícies
| Token | Valor |
|---|---|
| `--ds-bg` | `#080808` |
| `--ds-surface` | `#111111` |
| `--ds-border` | `rgba(255,255,255,0.08)` |
| `--ds-border-hover` | `rgba(255,255,255,0.2)` |

### Texto
| Token | Valor |
|---|---|
| `--ds-text` | `#ffffff` |
| `--ds-text-secondary` | `rgba(255,255,255,0.5)` |
| `--ds-text-tertiary` | `rgba(255,255,255,0.25)` |

### Legado (em desuso)
| Token | Valor |
|---|---|
| `--gold` | `#c9a76c` |

---

## Tipografia

| Fonte | Token | Papel | Pesos |
|---|---|---|---|
| Bebas Neue | `--font-bebas` | Títulos / display (sempre CAIXA ALTA) | 400 |
| DM Sans | `--font-dm` | Corpo, labels, botões, UI | 300 / 400 / 500 |
| Syne | `--font-syne` | Títulos de card | 400 / 600 / 700 / 800 |
| Cormorant Garamond | `--font-cormorant` | Acento editorial (legado) | 300–600 |

### Classes
- `.ds-display` — Bebas, `clamp(4rem, 12vw, 10rem)`, line-height 0.92, tracking 0.02em, uppercase
- `.ds-heading` — Bebas, uppercase, line-height 0.95, tracking 0.02em (tamanho por uso)
- `.ds-card-title` — Syne 800, 1rem, uppercase, tracking 0.04em
- `.ds-label` — DM Sans 700, 0.65rem, tracking 0.22em, uppercase, branco 50%
- `.ds-body` — DM Sans 300, line-height 1.75, branco 50%
- Headline do hero — Bebas `clamp(3rem, 5vw, 5rem)` desktop / `clamp(2.6rem, 11vw, 3.5rem)` mobile

---

## Botões

### `.ds-btn-primary`
Fundo `--lime`, texto `--lime-text`, DM Sans 700, 0.8rem, tracking 0.08em, uppercase, padding `0.9rem 2rem`, raio `999px` (pill).
**Hover:** opacidade 0.88 + `translateY(-2px)`.

### `.ds-btn-secondary`
Transparente, texto branco, borda `rgba(255,255,255,0.25)`, mesmo formato.
**Hover:** borda `rgba(255,255,255,0.6)` + fundo `rgba(255,255,255,0.05)`.

---

## Tokens de forma

| Token | Valor |
|---|---|
| `--ds-radius-card` | `20px` |
| `--ds-radius-btn` | `999px` (pill) |
| `--ds-radius-sm` | `8px` |

---

## Efeitos-assinatura

- **Glow lime** radial suave (halos atrás dos dispositivos, brilho dos botões)
- **Marquee/ticker** lime (loop ~30s) com frases de provocação
- **Botões magnéticos** (desktop, `pointer:fine`)
- **Reveal no scroll** + stagger (`.reveal` / `.reveal-stagger`)
- **Portfólio interativo:** parallax com inércia (lerp) + spotlight que segue o cursor + hover que levanta/destaca + entrada animada
- **CTA flutuante** (pill lime fixo, aparece após o hero)
- **Scroll nativo** (sem Lenis — mais leve) + `prefers-reduced-motion` respeitado

---

## Princípios

1. **Lime é acento, não fundo.** Usar com parcimônia — um ponto de tensão, não um banho de cor.
2. **Títulos gritam, corpo sussurra.** Bebas em caixa alta nos títulos; DM Sans leve (300) e cinza no corpo.
3. **Dark sempre.** Tudo vive sobre `#080808`; contraste e respiro fazem o trabalho.
4. **Movimento serve à leitura.** Efeitos sutis, com easing premium; nada que atrapalhe ou pese.
