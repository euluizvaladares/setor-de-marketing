import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Política de Privacidade — Setor de Marketing',
  robots: { index: false, follow: false },
}

export default function PoliticaDePrivacidade() {
  return (
    <main style={{ background: '#080808', minHeight: '100vh', color: '#edecec', fontFamily: 'var(--font-dm)', padding: '6rem 2rem 4rem' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <Link href="/" style={{ color: '#888', fontSize: '0.85rem', textDecoration: 'none', display: 'inline-block', marginBottom: '2.5rem' }}>
          ← Voltar ao site
        </Link>

        <h1 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(2.5rem, 6vw, 4rem)', letterSpacing: '0.04em', marginBottom: '0.5rem' }}>
          Política de Privacidade
        </h1>
        <p style={{ color: '#888', fontSize: '0.85rem', marginBottom: '3rem' }}>Última atualização: junho de 2026</p>

        <Section title="1. Quem somos">
          <p>Setor de Marketing, agência de marketing digital localizada em Itamarandiba-MG.</p>
          <p>Contato: <a href="mailto:contato@setordemarketing.com" style={{ color: '#edecec' }}>contato@setordemarketing.com</a></p>
        </Section>

        <Section title="2. Quais dados coletamos">
          <p>Coletamos apenas os dados que você nos fornece voluntariamente ao entrar em contato via formulário ou WhatsApp:</p>
          <ul>
            <li>Nome</li>
            <li>Telefone</li>
            <li>E-mail</li>
            <li>Informações sobre seu negócio</li>
          </ul>
          <p>Podemos também coletar dados de navegação como páginas visitadas, tempo de sessão, dispositivo e navegador, por meio de ferramentas de análise quando ativadas.</p>
        </Section>

        <Section title="3. Para que usamos">
          <ul>
            <li>Responder solicitações de orçamento e atendimento</li>
            <li>Melhorar a experiência do site</li>
            <li>Enviar comunicações relacionadas aos nossos serviços, apenas se você autorizar</li>
          </ul>
        </Section>

        <Section title="4. Com quem compartilhamos">
          <p>Não vendemos nem compartilhamos seus dados com terceiros, exceto quando necessário para a prestação do serviço (ex: plataformas de e-mail) ou quando exigido por lei.</p>
        </Section>

        <Section title="5. Por quanto tempo guardamos">
          <p>Dados de contato são mantidos pelo tempo necessário ao atendimento. Você pode solicitar a exclusão a qualquer momento.</p>
        </Section>

        <Section title="6. Seus direitos (LGPD)">
          <p>Nos termos da Lei Geral de Proteção de Dados (Lei nº 13.709/2018), você tem direito a:</p>
          <ul>
            <li>Acessar seus dados</li>
            <li>Corrigir dados incompletos ou desatualizados</li>
            <li>Solicitar a exclusão dos seus dados</li>
            <li>Revogar o consentimento a qualquer momento</li>
            <li>Solicitar portabilidade</li>
          </ul>
          <p>Envie sua solicitação para <a href="mailto:contato@setordemarketing.com" style={{ color: '#edecec' }}>contato@setordemarketing.com</a>.</p>
        </Section>

        <Section title="7. Cookies">
          <p>O site pode utilizar cookies de sessão e análise. Você pode desativá-los nas configurações do seu navegador a qualquer momento.</p>
        </Section>

        <Section title="8. Contato">
          <p><a href="mailto:contato@setordemarketing.com" style={{ color: '#edecec' }}>contato@setordemarketing.com</a></p>
        </Section>
      </div>
    </main>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: '2.5rem' }}>
      <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: '1.4rem', letterSpacing: '0.06em', marginBottom: '1rem', color: '#edecec' }}>
        {title}
      </h2>
      <div style={{ color: '#aaa', lineHeight: 1.8, fontSize: '0.95rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {children}
      </div>
    </section>
  )
}
