'use client'

import { useState } from 'react'

/* ─── Holographic 3D Object (CSS only) ─── */
function HolographicOrb({ size = 260 }: { size?: number }) {
  return (
    <div
      style={{
        position: 'relative',
        width: size,
        height: size,
        animation: 'float 6s ease-in-out infinite',
      }}
    >
      {/* Outer glow */}
      <div
        style={{
          position: 'absolute',
          inset: -30,
          borderRadius: '50%',
          background:
            'radial-gradient(circle at 40% 40%, rgba(120,80,255,0.25) 0%, rgba(0,200,255,0.15) 40%, transparent 70%)',
          filter: 'blur(20px)',
          animation: 'pulse-glow 3s ease-in-out infinite',
        }}
      />
      {/* Main orb */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          background:
            'conic-gradient(from 180deg at 40% 40%, #7B2FF7 0deg, #00D4FF 90deg, #FF6BFF 180deg, #00FFA3 270deg, #7B2FF7 360deg)',
          opacity: 0.9,
        }}
      />
      {/* Glass highlight */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          background:
            'radial-gradient(circle at 30% 25%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.08) 40%, transparent 65%)',
        }}
      />
      {/* Inner depth */}
      <div
        style={{
          position: 'absolute',
          inset: 12,
          borderRadius: '50%',
          background:
            'radial-gradient(circle at 60% 65%, rgba(0,0,20,0.6) 0%, transparent 70%)',
        }}
      />
      {/* Rim light */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          boxShadow:
            'inset 0 0 0 1px rgba(255,255,255,0.18), 0 0 40px rgba(123,47,247,0.4), 0 0 80px rgba(0,212,255,0.2)',
        }}
      />
    </div>
  )
}

/* ─── Holographic Cube ─── */
function HolographicCube({ size = 120 }: { size?: number }) {
  return (
    <div
      style={{
        position: 'relative',
        width: size,
        height: size,
        animation: 'float 8s ease-in-out infinite',
        animationDelay: '1.5s',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '24px',
          background:
            'linear-gradient(135deg, rgba(255,107,255,0.3) 0%, rgba(0,212,255,0.3) 50%, rgba(0,255,163,0.2) 100%)',
          border: '1px solid rgba(255,255,255,0.2)',
          backdropFilter: 'blur(10px)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '24px',
          background:
            'radial-gradient(circle at 30% 25%, rgba(255,255,255,0.4) 0%, transparent 50%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '24px',
          boxShadow:
            'inset 0 0 0 1px rgba(255,255,255,0.15), 0 0 30px rgba(255,107,255,0.3)',
        }}
      />
    </div>
  )
}

/* ─── Section Divider ─── */
function SectionHeader({ label, title }: { label: string; title: string }) {
  return (
    <div style={{ marginBottom: '3rem' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          marginBottom: '0.75rem',
        }}
      >
        <span
          className="ds-label"
          style={{ color: 'rgba(255,255,255,0.3)' }}
        >
          {label}
        </span>
        <div
          style={{
            flex: 1,
            height: '1px',
            background: 'rgba(255,255,255,0.08)',
          }}
        />
      </div>
      <h2
        className="ds-heading"
        style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)' }}
      >
        {title}
      </h2>
    </div>
  )
}

/* ─── Color Swatch ─── */
function Swatch({
  token,
  value,
  preview,
}: {
  token: string
  value: string
  preview?: string
}) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
      }}
    >
      <div
        style={{
          width: '100%',
          height: 72,
          borderRadius: 12,
          background: preview ?? value,
          border: '1px solid rgba(255,255,255,0.08)',
        }}
      />
      <div>
        <div
          className="ds-label"
          style={{ color: '#fff', marginBottom: '0.2rem' }}
        >
          {token}
        </div>
        <div
          className="ds-body"
          style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.35)' }}
        >
          {value}
        </div>
      </div>
    </div>
  )
}

/* ─── Portfolio Card ─── */
function PortfolioCard({
  title,
  url,
  tag,
  color,
}: {
  title: string
  url: string
  tag: string
  color: string
}) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'var(--ds-surface)',
        border: `1px solid ${hovered ? 'rgba(255,255,255,0.2)' : 'var(--ds-border)'}`,
        borderRadius: 'var(--ds-radius-card)',
        overflow: 'hidden',
        transition: 'all 0.35s ease',
        transform: hovered ? 'translateY(-6px) scale(1.01)' : 'none',
        boxShadow: hovered ? '0 32px 64px rgba(0,0,0,0.6)' : 'none',
        cursor: 'pointer',
      }}
    >
      {/* Image / preview area */}
      <div
        style={{
          width: '100%',
          height: 180,
          background: `linear-gradient(135deg, ${color}33 0%, ${color}11 100%)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(circle at 30% 40%, ${color}44 0%, transparent 60%)`,
          }}
        />
        <div
          style={{
            fontFamily: 'var(--font-bebas)',
            fontSize: '4rem',
            color: color,
            opacity: 0.3,
            letterSpacing: '0.05em',
            userSelect: 'none',
          }}
        >
          {title.substring(0, 2).toUpperCase()}
        </div>
        <span
          className="ds-label"
          style={{
            position: 'absolute',
            top: '1rem',
            left: '1rem',
            color: color,
            background: `${color}22`,
            border: `1px solid ${color}44`,
            padding: '0.3rem 0.7rem',
            borderRadius: 999,
          }}
        >
          {tag}
        </span>
      </div>
      {/* Info */}
      <div style={{ padding: '1.5rem' }}>
        <div
          style={{
            fontFamily: 'var(--font-syne)',
            fontWeight: 800,
            fontSize: '1rem',
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            color: 'var(--ds-text)',
            marginBottom: '0.4rem',
          }}
        >
          {title}
        </div>
        <div className="ds-body" style={{ fontSize: '0.8rem' }}>
          {url}
        </div>
        <div
          style={{
            marginTop: '1.25rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span className="ds-label" style={{ color: 'rgba(255,255,255,0.25)' }}>
            Ver projeto
          </span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            style={{
              transform: hovered ? 'translate(3px,-3px)' : 'none',
              transition: 'transform 0.25s ease',
            }}
          >
            <path
              d="M3 13L13 3M13 3H7M13 3V9"
              stroke="rgba(255,255,255,0.4)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}

/* ─── Form Card ─── */
function FormCard() {
  return (
    <div
      className="ds-card"
      style={{ maxWidth: 480, background: '#0d0d0d' }}
    >
      <div className="ds-label" style={{ marginBottom: '1.5rem', color: 'rgba(255,255,255,0.3)' }}>
        Orçamento — Formulário
      </div>
      <h3
        className="ds-heading"
        style={{ fontSize: '1.3rem', marginBottom: '1.75rem' }}
      >
        Fale com a gente
      </h3>
      {[
        { label: 'Nome', placeholder: 'Seu nome completo', type: 'text' },
        { label: 'WhatsApp', placeholder: '(38) 9 0000-0000', type: 'tel' },
      ].map((f) => (
        <div key={f.label} style={{ marginBottom: '1.25rem' }}>
          <label
            className="ds-label"
            style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: 'rgba(255,255,255,0.4)',
            }}
          >
            {f.label}
          </label>
          <input
            type={f.type}
            placeholder={f.placeholder}
            readOnly
            style={{
              width: '100%',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 10,
              padding: '0.85rem 1rem',
              color: '#fff',
              fontFamily: 'var(--font-dm)',
              fontSize: '0.88rem',
              outline: 'none',
            }}
          />
        </div>
      ))}
      <div style={{ marginBottom: '1.25rem' }}>
        <label
          className="ds-label"
          style={{
            display: 'block',
            marginBottom: '0.5rem',
            color: 'rgba(255,255,255,0.4)',
          }}
        >
          Serviço
        </label>
        <select
          style={{
            width: '100%',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 10,
            padding: '0.85rem 1rem',
            color: 'rgba(255,255,255,0.5)',
            fontFamily: 'var(--font-dm)',
            fontSize: '0.88rem',
            outline: 'none',
            appearance: 'none' as any,
          }}
        >
          <option value="">Selecione um serviço</option>
          <option>Site / Landing Page</option>
          <option>Identidade Visual</option>
          <option>Instagram</option>
          <option>IA &amp; Automação</option>
        </select>
      </div>
      <div style={{ marginBottom: '1.75rem' }}>
        <label
          className="ds-label"
          style={{
            display: 'block',
            marginBottom: '0.5rem',
            color: 'rgba(255,255,255,0.4)',
          }}
        >
          Descrição
        </label>
        <textarea
          placeholder="Conte um pouco sobre seu projeto..."
          readOnly
          rows={3}
          style={{
            width: '100%',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 10,
            padding: '0.85rem 1rem',
            color: '#fff',
            fontFamily: 'var(--font-dm)',
            fontSize: '0.88rem',
            outline: 'none',
            resize: 'none',
          }}
        />
      </div>
      <button className="ds-btn-primary" style={{ width: '100%' }}>
        Enviar mensagem →
      </button>
    </div>
  )
}

/* ─── Nav Example ─── */
function NavExample() {
  return (
    <div
      style={{
        background: 'rgba(8,8,8,0.85)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        padding: '1.1rem 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 16,
        border: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      {/* Logo */}
      <img src="/logo.png" alt="Setor de Marketing" style={{ height: '52px', width: 'auto', objectFit: 'contain' }} />
      {/* Links */}
      <div style={{ display: 'flex', gap: '2.5rem' }}>
        {['Serviços', 'Portfólio', 'Sobre', 'Contato'].map((link) => (
          <span
            key={link}
            className="ds-label"
            style={{
              color: 'rgba(255,255,255,0.45)',
              cursor: 'pointer',
              transition: 'color 0.2s',
            }}
          >
            {link}
          </span>
        ))}
      </div>
      {/* CTA */}
      <button className="ds-btn-primary" style={{ padding: '0.65rem 1.4rem', fontSize: '0.72rem' }}>
        Começar
      </button>
    </div>
  )
}

/* ─── Animation Demo ─── */
function AnimationDemo({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div
      style={{
        background: 'var(--ds-surface)',
        border: '1px solid var(--ds-border)',
        borderRadius: 16,
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1.5rem',
      }}
    >
      {children}
      <span className="ds-label" style={{ color: 'rgba(255,255,255,0.3)' }}>
        {label}
      </span>
    </div>
  )
}

/* ─── Main Page ─── */
export default function DesignSystemPage() {
  return (
    <div
      style={{
        background: 'var(--ds-bg)',
        minHeight: '100vh',
        fontFamily: 'var(--font-dm)',
        overflowX: 'hidden',
      }}
    >
      {/* ──────────────── HEADER ──────────────── */}
      <header
        style={{
          padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 5vw, 4rem)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background glow */}
        <div
          style={{
            position: 'absolute',
            top: '-40%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '80%',
            height: '200%',
            background:
              'radial-gradient(ellipse at 50% 0%, rgba(123,47,247,0.08) 0%, transparent 65%)',
            pointerEvents: 'none',
          }}
        />
        <div style={{ position: 'relative', maxWidth: 1200, margin: '0 auto' }}>
          <div
            className="ds-label"
            style={{ marginBottom: '1rem', color: 'rgba(255,255,255,0.3)' }}
          >
            Setor de Marketing — v1.0
          </div>
          <h1
            className="ds-display"
            style={{ fontSize: 'clamp(4rem, 14vw, 12rem)', marginBottom: '1.5rem' }}
          >
            Design
            <br />
            System
          </h1>
          <p
            className="ds-body"
            style={{ maxWidth: 520, fontSize: '1.05rem' }}
          >
            Visual identity, component library e tokens de design para o Setor de Marketing.
            Paleta escura, tipografia poderosa, objetos holográficos.
          </p>
        </div>
      </header>

      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: 'clamp(3rem, 6vw, 5rem) clamp(1.5rem, 5vw, 4rem)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'clamp(5rem, 10vw, 8rem)',
        }}
      >
        {/* ──────────────── CORES ──────────────── */}
        <section>
          <SectionHeader label="01 — Fundação" title="Cores & Tokens" />
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
              gap: '1.5rem',
            }}
          >
            <Swatch token="--ds-bg" value="#080808" preview="#080808" />
            <Swatch token="--ds-surface" value="#111111" preview="#111111" />
            <Swatch
              token="--ds-surface-2"
              value="rgba(255,255,255,0.03)"
              preview="rgba(255,255,255,0.03)"
            />
            <Swatch
              token="--ds-border"
              value="rgba(255,255,255,0.08)"
              preview="rgba(255,255,255,0.08)"
            />
            <Swatch
              token="--ds-border-hover"
              value="rgba(255,255,255,0.2)"
              preview="rgba(255,255,255,0.2)"
            />
            <Swatch token="--ds-text" value="#ffffff" preview="#ffffff" />
            <Swatch
              token="--ds-text-secondary"
              value="rgba(255,255,255,0.5)"
              preview="rgba(255,255,255,0.5)"
            />
            <Swatch
              token="--ds-text-tertiary"
              value="rgba(255,255,255,0.25)"
              preview="rgba(255,255,255,0.25)"
            />
          </div>
          {/* Accent colors from holographic objects */}
          <div style={{ marginTop: '2rem' }}>
            <div
              className="ds-label"
              style={{ marginBottom: '1rem', color: 'rgba(255,255,255,0.25)' }}
            >
              Cores iridescentes — reflexos dos objetos 3D
            </div>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {[
                { name: 'Violet', color: '#7B2FF7' },
                { name: 'Cyan', color: '#00D4FF' },
                { name: 'Magenta', color: '#FF6BFF' },
                { name: 'Mint', color: '#00FFA3' },
              ].map((c) => (
                <div key={c.name} style={{ flex: 1 }}>
                  <div
                    style={{
                      height: 48,
                      borderRadius: 10,
                      background: c.color,
                      marginBottom: '0.5rem',
                      boxShadow: `0 0 20px ${c.color}55`,
                    }}
                  />
                  <div className="ds-label" style={{ color: 'rgba(255,255,255,0.3)' }}>
                    {c.name}
                  </div>
                  <div
                    className="ds-body"
                    style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.2)' }}
                  >
                    {c.color}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ──────────────── TIPOGRAFIA ──────────────── */}
        <section>
          <SectionHeader label="02 — Tipografia" title="Type Scale" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            {/* Display */}
            <div
              style={{
                padding: '2.5rem',
                background: 'var(--ds-surface)',
                borderRadius: 20,
                border: '1px solid var(--ds-border)',
              }}
            >
              <div
                className="ds-label"
                style={{ marginBottom: '1.5rem', color: 'rgba(255,255,255,0.25)' }}
              >
                .ds-display — Bebas Neue — Display Hero
              </div>
              <div
                className="ds-display"
                style={{ fontSize: 'clamp(3rem, 9vw, 7rem)', lineHeight: 0.9 }}
              >
                Criatividade
                <br />
                Sem Limites
              </div>
            </div>

            {/* Headings scale */}
            <div
              style={{
                padding: '2.5rem',
                background: 'var(--ds-surface)',
                borderRadius: 20,
                border: '1px solid var(--ds-border)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
              }}
            >
              <div
                className="ds-label"
                style={{ marginBottom: '0.5rem', color: 'rgba(255,255,255,0.25)' }}
              >
                .ds-heading — Syne — Seções e Títulos
              </div>
              {[
                { size: '2.8rem', label: 'H1 — 2.8rem / 800' },
                { size: '2rem', label: 'H2 — 2rem / 800' },
                { size: '1.4rem', label: 'H3 — 1.4rem / 700' },
              ].map((h) => (
                <div
                  key={h.label}
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: '2rem',
                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                    paddingBottom: '1.25rem',
                  }}
                >
                  <span
                    className="ds-heading"
                    style={{ fontSize: h.size, flex: 1 }}
                  >
                    Setor de Marketing
                  </span>
                  <span
                    className="ds-label"
                    style={{ color: 'rgba(255,255,255,0.2)', whiteSpace: 'nowrap' }}
                  >
                    {h.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Body and small */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1.5rem',
              }}
            >
              <div
                style={{
                  padding: '2rem',
                  background: 'var(--ds-surface)',
                  borderRadius: 20,
                  border: '1px solid var(--ds-border)',
                }}
              >
                <div
                  className="ds-label"
                  style={{ marginBottom: '1rem', color: 'rgba(255,255,255,0.25)' }}
                >
                  .ds-body — DM Sans 300
                </div>
                <p className="ds-body" style={{ fontSize: '1rem' }}>
                  Trabalhamos com foco total em cada projeto. Nossa abordagem combina design
                  estratégico com execução técnica impecável, entregando resultados que fazem
                  diferença real.
                </p>
              </div>
              <div
                style={{
                  padding: '2rem',
                  background: 'var(--ds-surface)',
                  borderRadius: 20,
                  border: '1px solid var(--ds-border)',
                }}
              >
                <div
                  className="ds-label"
                  style={{ marginBottom: '1rem', color: 'rgba(255,255,255,0.25)' }}
                >
                  .ds-label — Syne 700 uppercase
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {[
                    'Label padrão — 0.65rem / 700',
                    'Identificadores e categorias',
                    'Badges e tags',
                  ].map((t) => (
                    <span key={t} className="ds-label" style={{ color: 'rgba(255,255,255,0.5)' }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ──────────────── BOTÕES ──────────────── */}
        <section>
          <SectionHeader label="03 — Ações" title="Botões & Interações" />
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {/* Primary */}
            <div
              style={{
                padding: '2.5rem',
                background: 'var(--ds-surface)',
                borderRadius: 20,
                border: '1px solid var(--ds-border)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: '1.5rem',
              }}
            >
              <div
                className="ds-label"
                style={{ color: 'rgba(255,255,255,0.25)' }}
              >
                .ds-btn-primary
              </div>
              <button className="ds-btn-primary">Começar agora →</button>
              <button className="ds-btn-primary" style={{ padding: '1.1rem 2.5rem', fontSize: '0.88rem' }}>
                Tamanho grande →
              </button>
              <p className="ds-body" style={{ fontSize: '0.78rem' }}>
                Pill branco · texto escuro · hover eleva e reduz opacidade
              </p>
            </div>

            {/* Secondary */}
            <div
              style={{
                padding: '2.5rem',
                background: 'var(--ds-surface)',
                borderRadius: 20,
                border: '1px solid var(--ds-border)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: '1.5rem',
              }}
            >
              <div
                className="ds-label"
                style={{ color: 'rgba(255,255,255,0.25)' }}
              >
                .ds-btn-secondary
              </div>
              <button className="ds-btn-secondary">Ver portfólio →</button>
              <button className="ds-btn-secondary" style={{ padding: '1.1rem 2.5rem', fontSize: '0.88rem' }}>
                Tamanho grande →
              </button>
              <p className="ds-body" style={{ fontSize: '0.78rem' }}>
                Pill outline · fundo transparente · hover reforça a borda
              </p>
            </div>

            {/* Pair */}
            <div
              style={{
                padding: '2.5rem',
                background: 'var(--ds-surface)',
                borderRadius: 20,
                border: '1px solid var(--ds-border)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
              }}
            >
              <div
                className="ds-label"
                style={{ color: 'rgba(255,255,255,0.25)' }}
              >
                Par de botões — uso em hero
              </div>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button className="ds-btn-primary">Começar →</button>
                <button className="ds-btn-secondary">Ver trabalhos</button>
              </div>
            </div>
          </div>
        </section>

        {/* ──────────────── CARDS ──────────────── */}
        <section>
          <SectionHeader label="04 — Superfícies" title="Cards & Containers" />
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {/* Base */}
            <div className="ds-card">
              <div
                className="ds-label"
                style={{ marginBottom: '1rem', color: 'rgba(255,255,255,0.25)' }}
              >
                .ds-card — base
              </div>
              <p className="ds-body" style={{ fontSize: '0.88rem' }}>
                Card padrão com fundo escuro, borda sutil e hover com elevação.
                Hover para ver o efeito.
              </p>
            </div>

            {/* With number */}
            <div className="ds-card" style={{ position: 'relative', overflow: 'hidden' }}>
              <div
                style={{
                  position: 'absolute',
                  top: '-0.5rem',
                  right: '1rem',
                  fontFamily: 'var(--font-bebas)',
                  fontSize: '6rem',
                  color: 'rgba(255,255,255,0.04)',
                  lineHeight: 1,
                  userSelect: 'none',
                }}
              >
                01
              </div>
              <div
                className="ds-label"
                style={{ marginBottom: '1rem', color: 'rgba(255,255,255,0.25)' }}
              >
                Card com número Bebas
              </div>
              <div
                className="ds-heading"
                style={{ fontSize: '1.1rem', marginBottom: '0.75rem' }}
              >
                Sites & Landing Pages
              </div>
              <p className="ds-body" style={{ fontSize: '0.85rem' }}>
                Design premium que converte visitantes em clientes.
              </p>
            </div>

            {/* Highlighted */}
            <div
              className="ds-card"
              style={{
                background: 'rgba(123,47,247,0.08)',
                borderColor: 'rgba(123,47,247,0.25)',
              }}
            >
              <div
                className="ds-label"
                style={{ marginBottom: '1rem', color: 'rgba(123,47,247,0.7)' }}
              >
                Card highlight
              </div>
              <div
                className="ds-heading"
                style={{ fontSize: '1.1rem', marginBottom: '0.75rem' }}
              >
                Cor de acento
              </div>
              <p className="ds-body" style={{ fontSize: '0.85rem' }}>
                Versão com cor de acento violeta, usada para destaque especial.
              </p>
            </div>

            {/* Large stat */}
            <div className="ds-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 200 }}>
              <div
                className="ds-label"
                style={{ color: 'rgba(255,255,255,0.25)' }}
              >
                Card stat
              </div>
              <div>
                <div
                  className="ds-display"
                  style={{ fontSize: '4rem', lineHeight: 1, marginBottom: '0.25rem' }}
                >
                  3
                </div>
                <div className="ds-body" style={{ fontSize: '0.85rem' }}>
                  clientes simultâneos
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ──────────────── NAV ──────────────── */}
        <section>
          <SectionHeader label="05 — Navegação" title="Nav Component" />
          <NavExample />
          <p
            className="ds-body"
            style={{
              marginTop: '1.25rem',
              fontSize: '0.82rem',
              color: 'rgba(255,255,255,0.25)',
            }}
          >
            Logo Syne bold à esquerda · links em .ds-label ao centro · .ds-btn-primary à direita · background glassmorphism
          </p>
        </section>

        {/* ──────────────── HERO PREVIEW ──────────────── */}
        <section>
          <SectionHeader label="06 — Hero" title="Hero Preview" />
          <div
            style={{
              position: 'relative',
              background: '#050505',
              borderRadius: 24,
              border: '1px solid rgba(255,255,255,0.06)',
              padding: 'clamp(3rem, 6vw, 5rem) clamp(2rem, 5vw, 4rem)',
              overflow: 'hidden',
              minHeight: 480,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {/* Background ambient */}
            <div
              style={{
                position: 'absolute',
                top: '10%',
                right: '5%',
                width: 400,
                height: 400,
                background:
                  'radial-gradient(circle, rgba(123,47,247,0.12) 0%, rgba(0,212,255,0.06) 50%, transparent 70%)',
                filter: 'blur(40px)',
                pointerEvents: 'none',
              }}
            />
            {/* Content */}
            <div style={{ position: 'relative', zIndex: 1, flex: 1 }}>
              <div
                className="ds-label"
                style={{ marginBottom: '1.5rem', color: 'rgba(255,255,255,0.3)' }}
              >
                Agência Criativa — Itamarandiba, MG
              </div>
              <h1
                className="ds-display"
                style={{
                  fontSize: 'clamp(3.5rem, 9vw, 7.5rem)',
                  marginBottom: '1.5rem',
                  maxWidth: 640,
                }}
              >
                Atenção
                <br />
                Total.
                <br />
                Três
                <br />
                Clientes.
              </h1>
              <p className="ds-body" style={{ maxWidth: 400, marginBottom: '2.5rem', fontSize: '1rem' }}>
                Design e estratégia com foco total. Não terceirizamos. Não diluímos atenção.
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button className="ds-btn-primary">Começar agora →</button>
                <button className="ds-btn-secondary">Ver portfólio</button>
              </div>
            </div>
            {/* 3D Object */}
            <div
              style={{
                position: 'absolute',
                right: 'clamp(2rem, 6vw, 5rem)',
                top: '50%',
                transform: 'translateY(-50%)',
              }}
            >
              <HolographicOrb size={220} />
            </div>
          </div>
        </section>

        {/* ──────────────── PORTFOLIO CARDS ──────────────── */}
        <section>
          <SectionHeader label="07 — Portfólio" title="Portfolio Card" />
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '1.5rem',
            }}
          >
            <PortfolioCard
              title="OdontoMed"
              url="odontomed.com.br"
              tag="Site"
              color="#00D4FF"
            />
            <PortfolioCard
              title="VM Contabilidade"
              url="vmcontabilidade.com.br"
              tag="Identidade"
              color="#FF6BFF"
            />
            <PortfolioCard
              title="Projecto Studio"
              url="projectostudio.com"
              tag="Landing Page"
              color="#00FFA3"
            />
          </div>
        </section>

        {/* ──────────────── FORM CARD ──────────────── */}
        <section>
          <SectionHeader label="08 — Formulário" title="Form Card" />
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '3rem',
              alignItems: 'start',
            }}
          >
            <FormCard />
            <div>
              <div
                className="ds-heading"
                style={{ fontSize: '1.4rem', marginBottom: '1rem' }}
              >
                Campos do formulário
              </div>
              <div className="ds-body" style={{ marginBottom: '2rem', fontSize: '0.9rem' }}>
                Fundo escuro com borda sutil. Inputs com background rgba(255,255,255,0.04) e
                border 1px solid rgba(255,255,255,0.1). Sem outline nativo — foco indicado por
                border-color.
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[
                  'Input: text, tel, email',
                  'Select com appearance: none',
                  'Textarea sem resize',
                  'Submit: .ds-btn-primary full width',
                ].map((item) => (
                  <div
                    key={item}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                    }}
                  >
                    <div
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        background: 'rgba(255,255,255,0.25)',
                        flexShrink: 0,
                      }}
                    />
                    <span className="ds-body" style={{ fontSize: '0.85rem' }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ──────────────── OBJETOS 3D ──────────────── */}
        <section>
          <SectionHeader label="09 — Objetos" title="Holographic Objects" />
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1.5rem',
            }}
          >
            <AnimationDemo label="Orb — conic-gradient + radial highlights">
              <HolographicOrb size={160} />
            </AnimationDemo>
            <AnimationDemo label="Cube — glass morphism + border-radius">
              <HolographicCube size={120} />
            </AnimationDemo>
            <AnimationDemo label="Glow pill — shimmer animation">
              <div
                style={{
                  width: '80%',
                  height: 56,
                  borderRadius: 999,
                  background:
                    'linear-gradient(90deg, rgba(123,47,247,0.3) 0%, rgba(0,212,255,0.4) 50%, rgba(255,107,255,0.3) 100%)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div className="ds-shimmer" style={{ position: 'absolute', inset: 0 }} />
              </div>
            </AnimationDemo>
          </div>
        </section>

        {/* ──────────────── ANIMAÇÕES ──────────────── */}
        <section>
          <SectionHeader label="10 — Movimento" title="Animações" />
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {/* Float */}
            <AnimationDemo label="@keyframes float — 6s ease-in-out infinite">
              <div
                className="ds-float"
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 16,
                  background:
                    'conic-gradient(from 0deg, #7B2FF7, #00D4FF, #FF6BFF, #00FFA3, #7B2FF7)',
                  boxShadow: '0 0 24px rgba(123,47,247,0.4)',
                }}
              />
            </AnimationDemo>

            {/* Shimmer */}
            <AnimationDemo label="@keyframes shimmer — 2.5s linear infinite">
              <div
                style={{
                  width: '90%',
                  height: 40,
                  borderRadius: 8,
                  background: 'rgba(255,255,255,0.06)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div className="ds-shimmer" style={{ position: 'absolute', inset: 0 }} />
              </div>
            </AnimationDemo>

            {/* Reveal */}
            <AnimationDemo label=".reveal — scroll-triggered opacity + translateY">
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                  width: '90%',
                }}
              >
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    style={{
                      height: 12,
                      borderRadius: 6,
                      background: `rgba(255,255,255,${0.12 - i * 0.03})`,
                      width: `${100 - i * 15}%`,
                    }}
                  />
                ))}
              </div>
            </AnimationDemo>

            {/* Hover lift */}
            <AnimationDemo label="Hover lift — ds-card default transition">
              <div
                className="ds-card"
                style={{
                  width: '90%',
                  padding: '1rem',
                  textAlign: 'center',
                  cursor: 'pointer',
                }}
              >
                <span className="ds-label" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  Hover aqui
                </span>
              </div>
            </AnimationDemo>
          </div>
        </section>

        {/* ──────────────── RADIUS & SPACING ──────────────── */}
        <section>
          <SectionHeader label="11 — Geometria" title="Radius & Espaçamento" />
          <div
            style={{
              display: 'flex',
              gap: '2rem',
              flexWrap: 'wrap',
              alignItems: 'flex-end',
            }}
          >
            {[
              { label: '--ds-radius-sm', value: '8px', size: 80 },
              { label: '--ds-radius-card', value: '20px', size: 120 },
              { label: '--ds-radius-btn', value: '999px', size: 60 },
            ].map((r) => (
              <div key={r.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                <div
                  style={{
                    width: r.size,
                    height: r.label === '--ds-radius-btn' ? 44 : r.size,
                    borderRadius: r.value,
                    background: 'var(--ds-surface)',
                    border: '1px solid var(--ds-border)',
                  }}
                />
                <div style={{ textAlign: 'center' }}>
                  <div className="ds-label" style={{ color: '#fff' }}>
                    {r.label}
                  </div>
                  <div className="ds-body" style={{ fontSize: '0.72rem' }}>
                    {r.value}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ──────────────── FOOTER ──────────────── */}
        <footer
          style={{
            borderTop: '1px solid rgba(255,255,255,0.06)',
            paddingTop: '3rem',
            paddingBottom: '1rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <div>
            <img src="/logo.png" alt="Setor de Marketing" style={{ height: '48px', width: 'auto', objectFit: 'contain', marginBottom: '0.3rem' }} />
            <div className="ds-body" style={{ fontSize: '0.72rem' }}>
              Itamarandiba, Minas Gerais
            </div>
          </div>
          <div className="ds-label" style={{ color: 'rgba(255,255,255,0.2)' }}>
            Design System v1.0 — 2025
          </div>
        </footer>
      </div>
    </div>
  )
}
