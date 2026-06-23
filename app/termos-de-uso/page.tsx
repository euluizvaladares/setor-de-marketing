import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Termos de Uso — Setor de Marketing',
  robots: { index: false, follow: false },
}

export default function TermosDeUso() {
  return (
    <main style={{ background: '#080808', minHeight: '100vh', color: '#edecec', fontFamily: 'var(--font-dm)', padding: '6rem 2rem 4rem' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <Link href="/" style={{ color: '#888', fontSize: '0.85rem', textDecoration: 'none', display: 'inline-block', marginBottom: '2.5rem' }}>
          ← Voltar ao site
        </Link>

        <h1 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(2.5rem, 6vw, 4rem)', letterSpacing: '0.04em', marginBottom: '0.5rem' }}>
          Termos de Uso
        </h1>
        <p style={{ color: '#888', fontSize: '0.85rem', marginBottom: '3rem' }}>Última atualização: junho de 2026</p>

        <Section title="1. Aceitação">
          <p>Ao acessar setordemarketing.com, você concorda com estes termos. Caso não concorde, pedimos que não utilize o site.</p>
        </Section>

        <Section title="2. Propriedade intelectual">
          <p>Todo o conteúdo deste site — textos, imagens, marca, identidade visual e código — é de propriedade exclusiva da Setor de Marketing. É proibida a reprodução, distribuição ou uso comercial de qualquer elemento sem autorização prévia e por escrito.</p>
        </Section>

        <Section title="3. Uso do site">
          <p>O site é disponibilizado para fins informativos e comerciais legítimos. É vedado:</p>
          <ul>
            <li>Utilizar o site para fins ilícitos ou fraudulentos</li>
            <li>Enviar spam ou comunicações não solicitadas por meio dos formulários</li>
            <li>Tentar comprometer a segurança ou disponibilidade do site</li>
            <li>Reproduzir conteúdo do site sem autorização</li>
          </ul>
        </Section>

        <Section title="4. Links externos">
          <p>O site pode conter links para portfólios de clientes e serviços de terceiros. A Setor de Marketing não se responsabiliza pelo conteúdo, disponibilidade ou práticas de privacidade de sites externos.</p>
        </Section>

        <Section title="5. Limitação de responsabilidade">
          <p>A Setor de Marketing não se responsabiliza por danos diretos ou indiretos decorrentes do uso ou da impossibilidade de uso das informações disponibilizadas neste site.</p>
        </Section>

        <Section title="6. Alterações">
          <p>Estes termos podem ser atualizados a qualquer momento. A versão vigente estará sempre disponível nesta página. O uso continuado do site após alterações implica aceitação dos novos termos.</p>
        </Section>

        <Section title="7. Foro">
          <p>Fica eleito o foro da comarca de Itamarandiba-MG para dirimir eventuais conflitos decorrentes destes termos, com renúncia a qualquer outro, por mais privilegiado que seja.</p>
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
