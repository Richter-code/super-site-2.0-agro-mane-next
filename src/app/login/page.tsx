import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { brand } from '@/lib/brand';

export const metadata: Metadata = {
  title: `Login | ${brand.nome}`,
  description: brand.descricao_curta,
  alternates: {
    canonical: '/login',
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginPage() {
  return (
    <main className="bg-brand-hero">
      <section className="py-12">
        <Container className="mx-auto flex max-w-lg flex-col gap-8">
          <header className="space-y-3 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-moss-600">
              Login
            </p>
            <h1 className="text-4xl font-semibold text-moss-900">
              Entre na sua conta
            </h1>
            <p id="login-help" className="text-base text-moss-700">
              Acompanhe pedidos, atualize dados de faturamento e continue
              comprando com segurança.
            </p>
          </header>

          <form
            className="space-y-4 rounded-3xl border border-sand-100 bg-white/95 p-6 shadow-card"
            aria-describedby="login-help"
          >
            <div className="space-y-2">
              <label
                htmlFor="login-email"
                className="text-sm font-semibold text-moss-900"
              >
                E-mail
              </label>
              <Input
                id="login-email"
                type="email"
                autoComplete="username"
                required
                placeholder="voce@email.com"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="login-password"
                className="text-sm font-semibold text-moss-900"
              >
                Senha
              </label>
              <Input
                id="login-password"
                type="password"
                autoComplete="current-password"
                required
                placeholder="••••••••"
              />
            </div>
            <div className="flex items-center justify-between text-sm">
              <label
                htmlFor="remember-me"
                className="inline-flex items-center gap-2 text-moss-700"
              >
                <input id="remember-me" type="checkbox" className="h-4 w-4" />
                Manter conectado
              </label>
              <Link href="/" className="text-moss-600 underline">
                Esqueci minha senha
              </Link>
            </div>
            <Button type="submit" className="w-full" size="lg">
              Entrar
            </Button>
            <p className="text-center text-sm text-moss-600">
              Ainda não tem acesso?{' '}
              <Link href="/produtos" className="font-semibold">
                Fale com a equipe
              </Link>
              .
            </p>
          </form>
        </Container>
      </section>
    </main>
  );
}
