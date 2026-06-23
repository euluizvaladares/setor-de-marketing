'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

function HeroReveal({ mobile = false }: { mobile?: boolean }) {
  // eslint-disable-next-line @next/next/no-img-element
  return (
    <img
      src="/hero-clean.webp"
      alt=""
      style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%',
        objectFit: 'cover', objectPosition: mobile ? '68% 6%' : 'right center',
      }}
    />
  )
}

/* ─── Projetos / portfólio ─── */
const PROJECTS = [
  { title: 'Biocenter Saúde', url: 'biocentersaude.com.br',  href: 'https://biocentersaude.com.br' },
  { title: 'Prime Sports',    url: 'primesportsmg.com',       href: 'https://prime-sports-a816263j6-setordemkt.vercel.app/?acesso=prime2025' },
  { title: 'Eliane Souza',    url: 'elianesouza.com',         href: 'https://elianesouza.com' },
]

/* ─── Cena de portfólio interativa (dispositivos recortados 2.5D) ─── */
const PF_DEVICES = [
  { img: '/device-biocenter.webp', depth: 16, z: 1, sc: '0.82' }, // esquerda, atrás
  { img: '/device-prime.webp',     depth: 28, z: 2, sc: '1'    }, // centro, frente
  { img: '/device-eliane.webp',    depth: 16, z: 1, sc: '0.82' }, // direita, atrás
]

function PortfolioScene({ isMobile }: { isMobile: boolean }) {
  const stageRef = useRef<HTMLDivElement>(null)

  // Parallax + spotlight com inércia (lerp) — só desktop; o loop para sozinho quando assenta
  useEffect(() => {
    if (isMobile) return
    const stage = stageRef.current
    if (!stage) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const target = { x: 0, y: 0 }
    const cur = { x: 0, y: 0 }
    let raf = 0
    let running = false

    const write = () => {
      stage.style.setProperty('--mx', cur.x.toFixed(4))
      stage.style.setProperty('--my', cur.y.toFixed(4))
      stage.style.setProperty('--spot-x', `${((cur.x + 0.5) * 100).toFixed(1)}%`)
      stage.style.setProperty('--spot-y', `${((cur.y + 0.5) * 100).toFixed(1)}%`)
    }
    const loop = () => {
      const dx = target.x - cur.x
      const dy = target.y - cur.y
      cur.x += dx * 0.085
      cur.y += dy * 0.085
      write()
      if (Math.abs(dx) < 0.0006 && Math.abs(dy) < 0.0006) {
        cur.x = target.x; cur.y = target.y; write()
        running = false
        return // assentou — para o rAF (leve)
      }
      raf = requestAnimationFrame(loop)
    }
    const kick = () => { if (!running) { running = true; raf = requestAnimationFrame(loop) } }

    const onMove = (e: MouseEvent) => {
      const r = stage.getBoundingClientRect()
      target.x = (e.clientX - r.left) / r.width - 0.5
      target.y = (e.clientY - r.top) / r.height - 0.5
      kick()
    }
    const onLeave = () => { target.x = 0; target.y = 0; kick() }

    stage.addEventListener('mousemove', onMove)
    stage.addEventListener('mouseleave', onLeave)
    return () => {
      cancelAnimationFrame(raf)
      stage.removeEventListener('mousemove', onMove)
      stage.removeEventListener('mouseleave', onLeave)
    }
  }, [isMobile])

  // Entrada animada no scroll
  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { stage.classList.add('in'); io.disconnect() }
      })
    }, { threshold: 0.2 })
    io.observe(stage)
    return () => io.disconnect()
  }, [])

  return (
    <div className={`pf-scene${isMobile ? ' pf-scene--mobile' : ''}`} ref={stageRef}>
      {!isMobile && <div className="pf-spot" />}
      {PROJECTS.map((p, i) => {
        const d = PF_DEVICES[i] ?? PF_DEVICES[1]
        return (
          <div
            key={p.href}
            className="pf-dev-wrap"
            style={{ zIndex: d.z, transitionDelay: `${i * 0.12}s` } as React.CSSProperties}
          >
            <div
              className="pf-dev-parallax"
              style={isMobile ? undefined : ({ ['--depth' as string]: String(d.depth) } as React.CSSProperties)}
            >
              <a
                className="pf-dev"
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Abrir site ${p.title}`}
                style={{ ['--sc' as string]: d.sc } as React.CSSProperties}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={d.img} alt={`Site ${p.title}`} loading="lazy" />
                <span className="pf-dev-label">{p.title} ↗</span>
              </a>
            </div>
          </div>
        )
      })}
    </div>
  )
}

/* ─── Scroll reveal hook ─── */
/* Recebe `key` (ex: isMobile) p/ re-observar quando o DOM das seções troca entre mobile/desktop */
function useReveal(key: unknown) {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal, .reveal-stagger')
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [key])
}

/* ─── Magnetic hook (desktop) ─── */
function useMagnetic() {
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const els = Array.from(document.querySelectorAll<HTMLElement>('.magnetic'))
    const strength = 0.3
    const cleanups: Array<() => void> = []
    els.forEach((el) => {
      const move = (e: MouseEvent) => {
        const r = el.getBoundingClientRect()
        const x = e.clientX - (r.left + r.width / 2)
        const y = e.clientY - (r.top + r.height / 2)
        el.style.transform = `translate(${(x * strength).toFixed(1)}px, ${(y * strength).toFixed(1)}px)`
      }
      const leave = () => { el.style.transform = '' }
      el.addEventListener('mousemove', move)
      el.addEventListener('mouseleave', leave)
      cleanups.push(() => { el.removeEventListener('mousemove', move); el.removeEventListener('mouseleave', leave) })
    })
    return () => cleanups.forEach((c) => c())
  }, [])
}

const WA = 'https://wa.me/5531995691275?text=Olá%2C%20Luiz!%20Vi%20o%20site%20do%20Setor%20de%20Marketing%20e%20quero%20um%20orçamento.'

/* ─── Hero: lista de serviços numerada ─── */
const HERO_SERVICES = ['Identidade Visual', 'Site Institucional', 'Landing Page', 'Sistema sob Medida']

function HeroServices() {
  return (
    <div className="hero-services">
      {HERO_SERVICES.map((s, i) => (
        <a key={s} href="#servicos" className="hero-service">
          <span className="hero-service-num">(0{i + 1})</span>
          <span className="hero-service-name">{s}</span>
        </a>
      ))}
    </div>
  )
}

/* ─── Hero: prova social (logos de clientes) ─── */
const TRUST_LOGOS = [
  { src: '/trust-vm.webp', alt: 'Valdirene Mourão Contabilidade', cls: 'trust-logo-sm' },
  { src: '/trust-biocenter.webp', alt: 'Biocenter Laboratório', cls: '' },
  { src: '/trust-odontoeasy.webp', alt: 'OdontoEasy — Clínica Odontológica', cls: 'trust-logo-sm' },
  { src: '/trust-eliane.webp', alt: 'Eliane Souza — Naturopata', cls: '' },
  { src: '/trust-prime.webp', alt: 'Prime Sports', cls: '' },
]
function TrustStrip() {
  return (
    <div className="trust">
      <span className="trust-label"><span className="trust-dot" aria-hidden="true" />Marcas que confiam na Setor</span>
      <div className="trust-logos">
        {TRUST_LOGOS.map(l => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={l.src} src={l.src} alt={l.alt} className={`trust-logo ${l.cls}`} />
        ))}
      </div>
    </div>
  )
}

/* ─── Serviços: dados (dois grupos) ─── */
const SERVICES_PROJETOS = [
  { tag: 'Fundação', title: 'Identidade Visual', img: '/svc-identidade.webp', desc: 'Antes de aparecer em qualquer lugar, o negócio precisa ter uma cara que o represente de verdade. Logo, tipografia, cores, padrões e aplicações — a base de tudo.' },
  { tag: 'Presença', title: 'Site Institucional', img: '/svc-site.webp', desc: 'Quando alguém procura o seu negócio, o que aparece? Um site profissional é a diferença entre ser levado a sério ou não. Construído pra representar o negócio como ele realmente é.' },
  { tag: 'Conversão', title: 'Landing Page', img: '/svc-landing.webp', desc: 'Para campanhas, lançamentos ou um objetivo específico. Direta, rápida e construída para converter — sem distração, sem enrolação.' },
  { tag: 'Solução', title: 'Sistema sob Medida', img: '/svc-sistema.webp', desc: 'CRM, agendamento, formulários, controle de clientes, processos internos. Se o negócio tem um problema que ninguém sabe resolver, a gente constrói a solução.' },
  { tag: 'Virada', title: 'Rebranding', img: '/svc-rebranding.webp', desc: 'A marca cresceu, mudou de público ou nunca traduziu o que o negócio é hoje. Reconstruímos a identidade — corrigindo o que prendia o negócio numa imagem menor do que ele merece.' },
  { tag: 'Aplicação', title: 'Materiais Gráficos', img: '/svc-materiais.webp', desc: 'Cartão, papelaria, fachada, sinalização, embalagem, uniforme, cardápio. Cada ponto de contato físico falando a mesma língua da marca. Presença também se constrói fora da tela.' },
]
const SERVICES_GESTAO = [
  { tag: 'Presença contínua', title: 'Gestão de Redes Sociais', img: '/svc-redes.webp', desc: 'Planejamento, design e publicação. Seu negócio aparecendo todo dia com a cara certa — e não some quando você para de pensar nisso, porque pensar nisso virou nosso trabalho.' },
  { tag: 'Alcance', title: 'Gestão de Tráfego', img: '/svc-trafego.webp', desc: 'Anúncios no Meta e no Google que colocam o negócio na frente de quem está pronto pra comprar. Verba investida com método e acompanhada de perto — não no escuro.' },
  { tag: 'Ser encontrado', title: 'SEO Local + Google', img: '/svc-seo.webp', desc: 'Quando alguém busca o seu serviço na cidade, você precisa ser o primeiro nome. Otimizamos seu site e seu perfil no Google pra dominar a busca local.' },
  { tag: 'Continuidade', title: 'Manutenção & Hospedagem', img: '/svc-manutencao.webp', desc: 'Site no ar, rápido, seguro e atualizado. Você cuida do negócio; a parte técnica é nossa — sem dor de cabeça e sem site fora do ar na hora errada.' },
  { tag: 'Palavra', title: 'Copywriting & Conteúdo', img: '/svc-copy.webp', desc: 'Textos que vendem — do post ao e-mail, do blog à página. A palavra certa faz o cliente entender o valor antes de perguntar o preço.' },
  { tag: 'Direção', title: 'Consultoria & Estratégia', img: '/svc-consultoria.webp', desc: 'A visão de quem enxerga o marketing inteiro: posicionamento, prioridades e plano. Atuamos como o setor de marketing da sua empresa, sem você precisar montar um.' },
]

type Service = { tag: string; title: string; img: string; desc: string }

function ServiceAccordion({ items, startIndex = 0 }: { items: Service[]; startIndex?: number }) {
  const listRef = useRef<HTMLDivElement>(null)
  const floatRef = useRef<HTMLImageElement>(null)
  const [src, setSrc] = useState(items[0].img)
  const [on, setOn] = useState(false)

  useEffect(() => {
    const list = listRef.current, fl = floatRef.current
    if (!list || !fl) return
    const target = { x: 0, y: 0 }
    const pos = { x: 0, y: 0 }
    let raf = 0, running = false
    const onMove = (e: MouseEvent) => {
      const r = list.getBoundingClientRect()
      target.x = e.clientX - r.left
      target.y = e.clientY - r.top
    }
    const loop = () => {
      pos.x += (target.x - pos.x) * 0.14
      pos.y += (target.y - pos.y) * 0.14
      fl.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`
      if (running) raf = requestAnimationFrame(loop)
    }
    const start = (e: MouseEvent) => {
      const r = list.getBoundingClientRect()
      pos.x = target.x = e.clientX - r.left
      pos.y = target.y = e.clientY - r.top
      if (!running) { running = true; raf = requestAnimationFrame(loop) }
    }
    const stop = () => { running = false; cancelAnimationFrame(raf) }
    list.addEventListener('mouseenter', start)
    list.addEventListener('mousemove', onMove)
    list.addEventListener('mouseleave', stop)
    return () => {
      list.removeEventListener('mouseenter', start)
      list.removeEventListener('mousemove', onMove)
      list.removeEventListener('mouseleave', stop)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div className="svc-list" ref={listRef} onMouseLeave={() => setOn(false)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img ref={floatRef} src={src} alt="" aria-hidden="true" className={`svc-float ${on ? 'on' : ''}`} />
      {items.map((s, i) => (
        <a key={s.title} href="#orcamento" className="svc-row"
          onMouseEnter={() => { setSrc(s.img); setOn(true) }}>
          <span className="svc-num">({String(startIndex + i + 1).padStart(2, '0')})</span>
          <span className="svc-title">{s.title}</span>
          <span className="svc-desc">{s.desc}</span>
          <span className="svc-plus" aria-hidden="true" />
        </a>
      ))}
    </div>
  )
}

/* ─── FAQ ─── */
const FAQ = [
  { q: 'Quais serviços a Setor oferece?', a: 'Tudo que envolve a presença do seu negócio — de identidade visual, site e materiais gráficos a gestão de redes sociais, tráfego pago, SEO e estratégia. Você contrata um projeto pontual ou coloca a gente como o seu setor de marketing fixo.' },
  { q: 'Vocês trabalham por projeto ou por mensalidade?', a: 'Os dois. Projeto pontual pra quem precisa de uma entrega específica — um site, uma identidade. E gestão mensal pra quem quer presença contínua, sem ter que pensar nisso toda semana: a gente assume o departamento.' },
  { q: 'Como vocês definem a estratégia certa pro meu negócio?', a: 'Primeiro a gente entende o que o seu negócio já é de verdade — e onde está o abismo entre isso e como o mercado te enxerga. A estratégia nasce de fechar esse abismo, não de fórmula pronta.' },
  { q: 'Quanto tempo leva um projeto?', a: 'Depende do escopo. Uma landing page sai em poucos dias; uma identidade visual ou um site institucional, algumas semanas. No primeiro contato a gente já te passa um prazo real — sem promessa que não cabe.' },
  { q: 'Vocês atendem só Itamarandiba ou qualquer lugar?', a: 'Somos de Itamarandiba (MG), mas trabalhamos com negócios de qualquer lugar. Todo o processo é remoto e organizado — distância nunca foi problema pra quem entrega.' },
  { q: 'Como começa? Qual o primeiro passo?', a: 'Uma conversa. Você chama no WhatsApp, conta o momento do seu negócio, e a gente diz exatamente como pode ajudar — com proposta clara, sem enrolação.' },
]
function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <div className="faq-list">
      {FAQ.map((item, i) => (
        <div key={i} className={`faq-row ${open === i ? 'open' : ''}`}>
          <button className="faq-q" onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i}>
            <span>{item.q}</span>
            <span className="faq-plus" aria-hidden="true" />
          </button>
          <div className="faq-a-wrap"><p className="faq-a">{item.a}</p></div>
        </div>
      ))}
    </div>
  )
}

/* ─── Hero: manifesto com text-reveal mascarado ─── */
function HeroManifesto({ mobile = false }: { mobile?: boolean }) {
  const [shown, setShown] = useState(false)
  useEffect(() => {
    const id = requestAnimationFrame(() => setShown(true))
    return () => cancelAnimationFrame(id)
  }, [])
  const lines: { text: string; gold?: boolean }[][] = [
    [{ text: 'Continuar sendo visto' }],
    [{ text: 'como menos do que' }],
    [{ text: 'você é' }, { text: 'custa caro.', gold: true }],
  ]
  let wi = 0
  return (
    <h1 className={`hero-manifesto mask-reveal ${shown ? 'in' : ''}`}
      style={{ fontSize: mobile ? 'clamp(2rem, 8.5vw, 2.9rem)' : 'clamp(2.6rem, 5.4vw, 5.4rem)' }}>
      {lines.map((runs, li) => (
        <span className="mask-line" key={li}>
          {runs.map((run, ri) =>
            run.text.split(' ').map((w, k) => {
              const delay = 0.25 + wi++ * 0.06
              return (
                <span className="mask-word" key={`${li}-${ri}-${k}`}>
                  <span className="mask-word-in" style={{ transitionDelay: `${delay}s`, color: run.gold ? 'var(--gold)' : undefined }}>{w}</span>{' '}
                </span>
              )
            })
          )}
        </span>
      ))}
    </h1>
  )
}

/* ─── Título de seção com text-reveal mascarado (dispara no viewport) ─── */
type Run = { text: string; gold?: boolean }
function MaskHeading({ lines, style }: { lines: Run[][]; style?: React.CSSProperties }) {
  const ref = useRef<HTMLHeadingElement>(null)
  const [shown, setShown] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setShown(true); io.disconnect() } },
      { threshold: 0.2 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  let wi = 0
  return (
    <h2 ref={ref} className={`ds-heading mask-reveal ${shown ? 'in' : ''}`} style={style}>
      {lines.map((runs, li) => (
        <span className="mask-line" key={li}>
          {runs.map((run, ri) =>
            run.text.split(' ').map((w, k) => {
              const delay = wi++ * 0.05
              return (
                <span className="mask-word" key={`${li}-${ri}-${k}`}>
                  <span className="mask-word-in" style={{ transitionDelay: `${delay}s`, color: run.gold ? 'var(--gold)' : undefined }}>{w}</span>{' '}
                </span>
              )
            })
          )}
        </span>
      ))}
    </h2>
  )
}

function ServiceCardsMobile({ items, startIndex = 0 }: { items: Service[]; startIndex?: number }) {
  return (
    <div className="reveal-stagger svc-cards">
      {items.map((s, i) => (
        <a key={s.title} href="#orcamento" className="svc-card">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={s.img} alt={s.title} className="svc-card-img" loading="lazy" />
          <div className="svc-card-body">
            <span className="svc-card-num">({String(startIndex + i + 1).padStart(2, '0')})</span>
            <h3 className="svc-card-title">{s.title}</h3>
            <p className="svc-card-desc">{s.desc}</p>
          </div>
        </a>
      ))}
    </div>
  )
}

/* ─── Marquee / ticker ─── */
function Marquee() {
  const items = [
    'Presença vende. Ausência negocia',
    'Marketing é o vendedor que trabalha enquanto você dorme',
    'Visual amador pede desconto antes de você falar',
  ]
  // Repete o conjunto pra cada metade preencher telas largas (loop sem buraco)
  const half = [...items, ...items, ...items]
  const track = [...half, ...half]
  return (
    <div className="mq" aria-hidden="true">
      <div className="mq-track">
        {track.map((t, i) => (
          <span key={i} className="mq-item">{t}<i className="mq-sep">✦</i></span>
        ))}
      </div>
    </div>
  )
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [showCta, setShowCta] = useState(false)
  useReveal(isMobile)
  useMagnetic()

  useEffect(() => {
    const fn = () => {
      const y = window.scrollY
      setScrolled(y > 60)
      // CTA flutuante: aparece após o hero, some perto do form de orçamento
      const docH = document.documentElement.scrollHeight
      const nearEnd = y + window.innerHeight > docH - 720
      setShowCta(y > window.innerHeight * 0.9 && !nearEnd)
    }
    fn()
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <main style={{ background: 'var(--ds-bg)', minHeight: '100vh' }}>

      {/* ─── NAV ─── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? 'rgba(8,8,8,0.55)' : 'transparent',
        backdropFilter: scrolled ? 'blur(10px) saturate(140%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(10px) saturate(140%)' : 'none',
        borderBottom: scrolled ? '1px solid var(--ds-border)' : '1px solid transparent',
        transition: 'background 0.4s, border-color 0.4s',
      }}>
        {/* Logo — centralizado no mobile, à esquerda no desktop */}
        <a href="#" style={
          isMobile
            ? { position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }
            : { position: 'absolute', left: '3rem', top: '50%', transform: 'translateY(-50%)' }
        }>
          <Image src="/logo.png" alt="Setor de Marketing" width={140} height={38}
            style={{ objectFit: 'contain', height: isMobile ? '32px' : '38px', width: 'auto' }} priority />
        </a>

        {/* Links — só no desktop */}
        {!isMobile && (
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '1.25rem 0', gap: '2.5rem',
          }}>
            {[['#trabalhos', 'Trabalhos'], ['#servicos', 'Serviços'], ['#sobre', 'Sobre'], ['#investimento', 'Investimento'], ['#faq', 'Dúvidas'], ['#orcamento', 'Orçamento']].map(([href, label]) => (
              <a key={href} href={href} className="nav-link">
                <span className="nav-link-roll">
                  <span className="nav-link-text">{label}</span>
                  <span className="nav-link-text" aria-hidden="true">{label}</span>
                </span>
                <span className="nav-link-line" aria-hidden="true" />
              </a>
            ))}
          </div>
        )}

        {/* Espaçador para manter altura da nav no mobile */}
        {isMobile && <div style={{ height: '64px' }} />}
      </nav>

      {/* ─── HERO (formato editorial) ─── */}
      {isMobile ? (
        /* ── Mobile: empilhamento vertical sobre a foto ── */
        <section style={{
          position: 'relative', width: '100%', minHeight: '100svh',
          overflow: 'hidden', background: '#050505',
        }}>
          <HeroReveal mobile />
          <div style={{
            position: 'absolute', inset: 0, zIndex: 1,
            background: 'linear-gradient(to right, rgba(5,5,5,0.94) 0%, rgba(5,5,5,0.55) 60%, rgba(5,5,5,0.25) 100%)',
          }} />
          <div style={{
            position: 'absolute', inset: 0, zIndex: 1,
            background: 'linear-gradient(to top, rgba(5,5,5,0.96) 0%, rgba(5,5,5,0.3) 45%, transparent 75%)',
          }} />

          <div style={{
            position: 'relative', zIndex: 2, minHeight: '100svh',
            padding: '5.5rem 1.5rem 2.5rem',
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '2rem',
          }}>
            <div style={{ opacity: 0, animation: 'heroFadeUp 0.8s 0.25s forwards' }}>
              <span className="hero-since">© Setor — Itamarandiba, MG</span>
              <HeroManifesto mobile />
              <div style={{ marginTop: '1.5rem' }}><HeroServices /></div>
            </div>

            <div style={{ opacity: 0, animation: 'heroFadeUp 0.8s 0.5s forwards' }}>
              <TrustStrip />
              <a href="#trabalhos" className="hero-scroll" style={{ marginTop: '1.5rem' }}>Role para explorar ↓</a>
            </div>
          </div>
        </section>
      ) : (
        /* ── Desktop: cantos ancorados sobre a foto ── */
        <section style={{
          position: 'relative', width: '100%', height: '100svh',
          overflow: 'hidden', background: '#050505',
        }}>
          <HeroReveal />
          <div style={{
            position: 'absolute', inset: 0, zIndex: 1,
            background: 'linear-gradient(to right, rgba(5,5,5,0.95) 0%, rgba(5,5,5,0.55) 38%, transparent 62%)',
          }} />
          <div style={{
            position: 'absolute', inset: 0, zIndex: 1,
            background: 'linear-gradient(to top, rgba(5,5,5,0.9) 0%, rgba(5,5,5,0.25) 32%, transparent 55%)',
          }} />

          {/* TOPO: marca + manifesto + serviços (todos na esquerda) */}
          <div style={{
            position: 'absolute', top: '6.5rem', left: 0, right: 0, zIndex: 2,
            padding: '0 3rem',
          }}>
            <div style={{ opacity: 0, animation: 'heroFadeUp 0.8s 0.3s forwards', maxWidth: '840px' }}>
              <span className="hero-since">© Setor — Itamarandiba, MG</span>
              <HeroManifesto />
              <div style={{ marginTop: '2.5rem', maxWidth: '360px', opacity: 0, animation: 'heroFadeUp 0.8s 0.55s forwards' }}>
                <HeroServices />
              </div>
            </div>
          </div>

          {/* BASE: tagline + scroll (esq) + card (dir) */}
          <div style={{
            position: 'absolute', bottom: '2.75rem', left: 0, right: 0, zIndex: 2,
            padding: '0 3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '2rem',
          }}>
            <div style={{ opacity: 0, animation: 'heroFadeUp 0.8s 0.7s forwards' }}>
              <TrustStrip />
            </div>
            <div style={{ opacity: 0, animation: 'heroFadeUp 0.8s 0.9s forwards' }}>
              <a href="#trabalhos" className="hero-scroll">Role para explorar ↓</a>
            </div>
          </div>
        </section>
      )}

      {/* ─── MARQUEE ─── */}
      <Marquee />

      {/* ─── TRABALHOS ─── */}
      {isMobile ? (
        <section id="trabalhos" style={{
          padding: '5rem 1.5rem',
          background: 'var(--ds-bg)',
          borderTop: '1px solid var(--ds-border)',
          overflow: 'hidden',
        }}>
          <div className="reveal" style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center', marginBottom: '2.5rem' }}>
            <MaskHeading style={{ fontSize: 'clamp(2.2rem, 9vw, 3rem)', margin: 0, lineHeight: 1.05 }}
              lines={[[{ text: 'Dá uma olhada nos' }], [{ text: 'últimos 3 sites' }], [{ text: 'que fizemos' }]]} />
          </div>
          <div className="reveal reveal-delay-1">
            <PortfolioScene isMobile={true} />
          </div>
        </section>
      ) : (
        /* Desktop: cena ocupa a seção inteira, título como camada sobreposta */
        <section id="trabalhos" style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--ds-bg)',
          borderTop: '1px solid var(--ds-border)',
          overflow: 'hidden',
        }}>
          <div className="reveal reveal-delay-1" style={{ width: '100%' }}>
            <PortfolioScene isMobile={false} />
          </div>
          {/* Título sobreposto (camada acima de tudo) */}
          <div className="reveal" style={{
            position: 'absolute', top: '7rem', left: 0, right: 0, zIndex: 6,
            pointerEvents: 'none', padding: '0 3rem',
          }}>
            <div style={{ maxWidth: '1240px', margin: '0 auto', textAlign: 'right' }}>
              <MaskHeading style={{ fontSize: 'clamp(2.25rem, 3.9vw, 3.3rem)', margin: 0, lineHeight: 1.05 }}
                lines={[[{ text: 'Dá uma olhada nos últimos' }], [{ text: '3 sites que fizemos' }]]} />
            </div>
          </div>
        </section>
      )}

      {/* ─── SERVIÇOS ─── */}
      {isMobile ? (
        /* ── Mobile: header + dois grupos de pills ── */
        <section id="servicos" style={{
          padding: '5rem 1.5rem',
          background: 'var(--ds-surface)',
          borderTop: '1px solid var(--ds-border)',
        }}>
          <div className="reveal" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span className="ds-label" style={{ marginBottom: '1rem', display: 'block' }}>
              O que fazemos
            </span>
            <MaskHeading style={{ fontSize: 'clamp(2.4rem, 11vw, 3.2rem)', marginBottom: '1.25rem' }}
              lines={[[{ text: 'Um setor,' }], [{ text: 'não um remendo.' }]]} />
            <p style={{
              fontFamily: 'var(--font-dm)', fontWeight: 300, fontSize: '0.85rem',
              color: 'rgba(255,255,255,0.45)', lineHeight: 1.7,
            }}>
              Não vendemos serviços soltos.<br />Assumimos o departamento inteiro.
            </p>
          </div>

          <span className="svc-group-label">Projetos · entrega única</span>
          <ServiceCardsMobile items={SERVICES_PROJETOS} startIndex={0} />

          <span className="svc-group-label" style={{ marginTop: '2.5rem' }}>Gestão mensal · recorrente</span>
          <ServiceCardsMobile items={SERVICES_GESTAO} startIndex={SERVICES_PROJETOS.length} />
        </section>
      ) : (
        <section id="servicos" style={{
          padding: '10rem 3rem',
          background: 'var(--ds-surface)',
          borderTop: '1px solid var(--ds-border)',
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div className="reveal" style={{ marginBottom: '4.5rem' }}>
              <span className="ds-label" style={{ marginBottom: '1.5rem', display: 'block' }}>
                O que fazemos
              </span>
              <MaskHeading style={{ fontSize: 'clamp(3rem, 7vw, 6rem)' }}
                lines={[[{ text: 'Um setor,' }], [{ text: 'não um remendo.' }]]} />
            </div>

            <div className="reveal reveal-delay-1">
              <span className="svc-group-label">Projetos · entrega única</span>
              <ServiceAccordion items={SERVICES_PROJETOS} startIndex={0} />
            </div>

            <div className="reveal reveal-delay-1" style={{ marginTop: '4.5rem' }}>
              <span className="svc-group-label">Gestão mensal · recorrente</span>
              <ServiceAccordion items={SERVICES_GESTAO} startIndex={SERVICES_PROJETOS.length} />
            </div>
          </div>
        </section>
      )}

      {/* ─── MANIFESTO ─── */}
      <section id="sobre" style={{
        padding: isMobile ? '5rem 1.5rem' : '10rem 3rem',
        background: 'var(--ds-bg)',
        borderTop: '1px solid var(--ds-border)',
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div className="reveal">
            <span className="ds-label" style={{ marginBottom: '2rem', display: 'block' }}>
              Como pensamos
            </span>
            <MaskHeading style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', marginBottom: '3rem' }}
              lines={[[{ text: 'Marketing não é' }], [{ text: 'performance.' }], [{ text: 'É presença.', gold: true }]]} />
          </div>
          <div className="reveal-stagger" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '5rem' }}>
            {[
              'Você investe pra aparecer. Para de investir, some — e perde mercado pra quem não parou.',
              'Quando um negócio não é visto como o que realmente é, o dono paga o preço toda semana: argumenta mais pra fechar venda, abaixa o preço, aceita clientes ruins, assume custos que não são seus.',
              'A vitrine dita o preço. Um visual amador faz o cliente pedir desconto antes de ouvir a proposta. Uma presença sólida justifica o valor antes de qualquer palavra ser dita.',
            ].map((text, i) => (
              <p key={i} style={{
                fontFamily: 'var(--font-dm)', fontWeight: 300,
                fontSize: 'clamp(1rem, 1.4vw, 1.1rem)',
                color: 'rgba(255,255,255,0.55)', lineHeight: 1.8,
                paddingLeft: '1.5rem',
                borderLeft: '1px solid var(--ds-border)',
              }}>{text}</p>
            ))}
          </div>

          {/* Caso real — Biocenter */}
          <div className="reveal reveal-delay-2" style={{
            background: 'var(--ds-surface)',
            border: '1px solid var(--ds-border)',
            borderRadius: '20px',
            padding: '3rem',
          }}>
            <span style={{
              fontFamily: 'var(--font-dm)',
              fontSize: '0.6rem',
              fontWeight: 700,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              display: 'block',
              marginBottom: '1.5rem',
            }}>
              Caso real
            </span>
            <p style={{
              fontFamily: 'var(--font-dm)', fontWeight: 300,
              fontSize: 'clamp(1rem, 1.4vw, 1.1rem)',
              color: 'rgba(255,255,255,0.7)', lineHeight: 1.8,
            }}>
              O Helton, da Biocenter, já era conhecido em Itamarandiba como o desbravador das novidades tecnológicas.
              A excelência já estava lá. Mas o site era horrível e os posts eram feios.
              Existia um abismo entre o que ele era e o que as pessoas viam quando procuravam o laboratório.
            </p>
            <p style={{
              fontFamily: 'var(--font-dm)', fontWeight: 300,
              fontSize: 'clamp(1rem, 1.4vw, 1.1rem)',
              color: 'rgba(255,255,255,0.45)', lineHeight: 1.8,
              marginTop: '1rem',
            }}>
              Nosso trabalho não foi inventar uma imagem. Foi fechar esse abismo.
              Durante o contrato, ele abriu um segundo ponto de coleta.
            </p>
          </div>
        </div>
      </section>

      {/* ─── DEPOIMENTO (bloco dourado) ─── */}
      <section style={{
        padding: isMobile ? '2.5rem 1rem' : '6rem 3rem',
        background: 'var(--ds-bg)',
      }}>
        <div className="reveal tm-block">
          <img src="/trust-vm.webp" alt="Valdirene Mourão Contabilidade" className="tm-logo" />
          <blockquote className="tm-quote">
            &ldquo;Antes do Luiz, tentei com vários prestadores de marketing. Um pegou o
            dinheiro e sumiu. Outro recebeu e não entregou nem um terço do que prometeu.
            O último fazia artes ruins, genéricas, com conteúdo raso. Desde que o Luiz
            assumiu o marketing do meu escritório, eu nunca mais precisei me preocupar com
            essa parte do negócio — ele trabalha como se fosse o setor de marketing da
            nossa empresa. Qualquer coisa que eu peço, se ele não faz, ele dá um jeito de fazer.&rdquo;
          </blockquote>
          <span className="tm-divider" aria-hidden="true" />
          <p className="tm-author">Valdirene Mourão, <span>VM Contabilidade</span></p>
        </div>
      </section>

      {/* ─── INVESTIMENTO ─── */}
      <section id="investimento" style={{
        padding: isMobile ? '5rem 1.5rem' : '10rem 3rem',
        background: 'var(--ds-bg)',
        borderTop: '1px solid var(--ds-border)',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="reveal" style={{ marginBottom: isMobile ? '3rem' : '4.5rem' }}>
            <span className="ds-label" style={{ marginBottom: '1.5rem', display: 'block' }}>Investimento</span>
            <MaskHeading style={{ fontSize: isMobile ? 'clamp(2.4rem, 11vw, 3.2rem)' : 'clamp(3rem, 7vw, 6rem)', marginBottom: '1.5rem' }}
              lines={[[{ text: 'Sob medida,' }], [{ text: 'como deve ser.' }]]} />
            <p style={{ fontFamily: 'var(--font-dm)', fontWeight: 300, fontSize: 'clamp(0.95rem, 1.3vw, 1.1rem)', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, maxWidth: '620px' }}>
              Cada negócio é um. O valor acompanha o porte, o volume e o escopo — por isso não trabalhamos com tabela. Trabalhamos com o que o seu momento pede.
            </p>
          </div>

          <div className="reveal reveal-delay-1 inv-grid">
            <div className="inv-card">
              <span className="inv-tag">Entrega única</span>
              <h3 className="inv-title">Projeto pontual</h3>
              <p className="inv-desc">Uma entrega específica, com começo, meio e fim. Pra quando o negócio precisa resolver uma frente da presença.</p>
              <span className="inv-feats-label">Inclui serviços como</span>
              <ul className="inv-feats">
                {SERVICES_PROJETOS.map(s => (
                  <li key={s.title}><span className="inv-bullet" aria-hidden="true" />{s.title}</li>
                ))}
              </ul>
              <div className="inv-foot">
                <span className="inv-note">Orçamento fechado por projeto</span>
                <a href="#orcamento" className="inv-cta">Pedir orçamento ↗</a>
              </div>
            </div>

            <div className="inv-card inv-card-feature">
              <span className="inv-tag">Recorrente</span>
              <h3 className="inv-title">Gestão mensal</h3>
              <p className="inv-desc">A Setor como o setor de marketing da sua empresa, todo mês. Presença contínua, sem você ter que pensar nisso.</p>
              <span className="inv-feats-label">Inclui serviços como</span>
              <ul className="inv-feats">
                {SERVICES_GESTAO.map(s => (
                  <li key={s.title}><span className="inv-bullet" aria-hidden="true" />{s.title}</li>
                ))}
              </ul>
              <div className="inv-foot">
                <span className="inv-note">Mensalidade sob medida</span>
                <a href="#orcamento" className="inv-cta">Montar meu plano ↗</a>
              </div>
            </div>
          </div>

          <div className="reveal reveal-delay-2 inv-factors">
            <span className="inv-factors-label">O que define o investimento</span>
            <div className="inv-factors-list">
              {['Porte do negócio', 'Volume de conteúdo', 'Escopo e complexidade', 'Prazo'].map(f => (
                <span key={f} className="inv-factor">{f}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section id="faq" style={{
        padding: isMobile ? '5rem 1.5rem' : '10rem 3rem',
        background: 'var(--ds-surface)',
        borderTop: '1px solid var(--ds-border)',
      }}>
        <div style={{
          maxWidth: '1200px', margin: '0 auto',
          display: 'flex', flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? '2.5rem' : '5rem', alignItems: 'flex-start',
        }}>
          <div className="reveal" style={{ flex: isMobile ? 'unset' : '0 0 38%' }}>
            <span className="ds-label" style={{ marginBottom: '1.5rem', display: 'block' }}>Dúvidas</span>
            <MaskHeading style={{ fontSize: isMobile ? 'clamp(2.4rem, 11vw, 3.2rem)' : 'clamp(2.6rem, 4.5vw, 4.2rem)', marginBottom: '1.5rem' }}
              lines={[[{ text: 'Respostas' }], [{ text: 'rápidas,' }], [{ text: 'sem rodeio.', gold: true }]]} />
            <a href={WA} target="_blank" rel="noopener noreferrer" className="hero-scroll" style={{ marginTop: '0.5rem' }}>
              Ficou com outra pergunta? Chama no WhatsApp ↗
            </a>
          </div>
          <div className="reveal reveal-delay-1" style={{ flex: 1, width: '100%' }}>
            <FaqAccordion />
          </div>
        </div>
      </section>

      {/* ─── ORÇAMENTO ─── */}
      <section id="orcamento" style={{
        padding: isMobile ? '5rem 1.5rem' : '10rem 3rem',
        background: 'var(--ds-surface)',
        borderTop: '1px solid var(--ds-border)',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div className="reveal">
            <span className="ds-label" style={{ marginBottom: '2rem', display: 'block', textAlign: 'center' }}>
              Vamos conversar
            </span>
            <MaskHeading style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', marginBottom: '1.5rem' }}
              lines={[[{ text: 'Pronto pra ser visto' }], [{ text: 'como o que você' }], [{ text: 'realmente é?' }]]} />
            <p style={{
              fontFamily: 'var(--font-dm)', fontWeight: 300,
              fontSize: '0.95rem', color: 'rgba(255,255,255,0.4)',
              lineHeight: 1.7, marginBottom: '3rem',
            }}>
              Entra em contato. A gente entende o negócio<br />
              e propõe o que faz mais sentido.
            </p>
            <a href={WA} target="_blank" rel="noopener noreferrer"
              className="ds-btn-primary magnetic" style={{ fontSize: '0.85rem', padding: '1.1rem 2.5rem', gap: '0.75rem' }}>
              <WaIcon /> Falar no WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="ft">
        <div className="ft-cols">
          {/* Marca */}
          <div className="ft-col">
            <Image src="/logo.png" alt="Setor de Marketing" width={160} height={42}
              style={{ objectFit: 'contain', height: '42px', width: 'auto' }} />
            <p className="ft-loc">
              <span className="gold">Itamarandiba — MG</span><br />
              Atendemos o Brasil todo.
            </p>
          </div>
          {/* Serviços */}
          <div className="ft-col">
            <span className="ft-label">Serviços</span>
            {['Identidade Visual', 'Site Institucional', 'Landing Page', 'Sistema sob Medida'].map((s) => (
              <a key={s} href="#servicos" className="ft-link">{s}</a>
            ))}
          </div>
          {/* Navegação */}
          <div className="ft-col">
            <span className="ft-label">Navegação</span>
            {[['#trabalhos', 'Trabalhos'], ['#servicos', 'Serviços'], ['#sobre', 'Sobre'], ['#investimento', 'Investimento'], ['#faq', 'Dúvidas'], ['#orcamento', 'Orçamento']].map(([h, l]) => (
              <a key={h} href={h} className="ft-link">{l}</a>
            ))}
          </div>
          {/* Contato */}
          <div className="ft-col">
            <span className="ft-label">Contato</span>
            <a href={WA} target="_blank" rel="noopener noreferrer" className="ft-link">Falar no WhatsApp ↗</a>
            <a href="https://instagram.com/setordemarketing" target="_blank" rel="noopener noreferrer" className="ft-link">Instagram ↗</a>
            <a href="mailto:contato@setordemarketing.com" className="ft-link">contato@setordemarketing.com</a>
          </div>
        </div>

        {/* Faixa de acento — CTA */}
        <div className="ft-band">
          <span className="ft-band-title">Vamos conversar.</span>
          <a href={WA} target="_blank" rel="noopener noreferrer" className="ft-band-cta">Falar no WhatsApp ↗</a>
        </div>

        {/* Barra legal */}
        <div className="ft-legal">
          <div className="ft-legal-links">
            <a href="/politica-de-privacidade">Privacidade</a>
            <a href="/termos-de-uso">Termos</a>
          </div>
          <span>© {new Date().getFullYear()} Setor de Marketing — Itamarandiba, MG</span>
        </div>
      </footer>

      <style>{`
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
.portfolio-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }
        @media (max-width: 900px) {
          .portfolio-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 580px) {
          .portfolio-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {/* ─── CTA flutuante ─── */}
      <a
        href="#orcamento"
        className={`float-cta${showCta ? ' show' : ''}`}
        aria-label="Quero um orçamento"
      >
        Quero um orçamento →
      </a>
    </main>
  )
}

function WaIcon() {
  return (
    <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}
