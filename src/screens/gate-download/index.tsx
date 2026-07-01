import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router'
import { Icon } from '~/components/icon'
import { Modal } from '~/components/modal'
import { AuthBottomLink } from '../_auth/bottom-link'
import { AuthDevNav } from '../_auth/dev-nav'
import { AuthInput } from '../_auth/input'
import ConteudoScreen from '../conteudo'

type GateState = 'email' | 'waiting'
type EmailError = 'none' | 'invalido' | 'vazio'
type WaitingError = 'none' | 'nao-recebi'

const GATE_STATES: GateState[] = ['email', 'waiting']
const EMAIL_ERRORS: EmailError[] = ['none', 'invalido', 'vazio']
const WAITING_ERRORS: WaitingError[] = ['none', 'nao-recebi']

function isExistente(email: string): boolean {
  return email.includes('+existe')
}

function maskEmail(email: string): string {
  return email.replace(/^[^@]+/, '****')
}

function ReenviarLinkButton() {
  const [secondsLeft, setSecondsLeft] = useState(0)
  const isDisabled = secondsLeft > 0

  useEffect(() => {
    if (secondsLeft <= 0) return
    const id = setTimeout(() => setSecondsLeft((s) => s - 1), 1000)
    return () => clearTimeout(id)
  }, [secondsLeft])

  return (
    <button
      type="button"
      disabled={isDisabled}
      onClick={() => setSecondsLeft(60)}
      className={`inline-flex items-center justify-center w-full h-12 px-6 rounded-full border-[1.5px] border-primary-600 bg-white hover:bg-primary-600/[0.04] text-primary-600 font-body font-bold text-body-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-500 focus-visible:ring-offset-2${isDisabled ? ' opacity-50 cursor-not-allowed pointer-events-none' : ''}`}
    >
      {isDisabled ? `Reenviar link (${secondsLeft}s)` : 'Reenviar link'}
    </button>
  )
}

/**
 * Tela: Gate de Download
 * Modal sobre ConteudoScreen que controla o acesso ao download de materiais.
 * Regra mock: e-mails com "+existe" → existente (state=waiting); demais → novo (/cadastro-v2).
 * Estados: ?state=email|waiting · ?error=invalido|vazio|nao-recebi · ?email=...
 * Tokens: --color-primary-600, --color-secondary-500, --color-secondary-950, --color-neutral-*
 */
export default function GateDownloadScreen() {
  const [params] = useSearchParams()
  const navigate = useNavigate()

  const stateParam = params.get('state') ?? 'email'
  const state = (GATE_STATES.includes(stateParam as GateState) ? stateParam : 'email') as GateState

  const email = params.get('email') ?? ''

  const errorParam = params.get('error') ?? 'none'
  const validErrors = state === 'email' ? EMAIL_ERRORS : WAITING_ERRORS
  const currentError = (validErrors as string[]).includes(errorParam) ? errorParam : 'none'

  const emailFieldError =
    currentError === 'invalido'
      ? 'Digite um e-mail válido.'
      : currentError === 'vazio'
        ? 'Informe seu e-mail.'
        : undefined

  const emailDefaultValue = currentError === 'invalido' ? 'teste@' : email

  function handleContinuar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const value = (data.get('email') as string).trim()

    if (!value) {
      navigate('/gate-download?state=email&error=vazio')
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      navigate('/gate-download?state=email&error=invalido')
      return
    }

    if (isExistente(value)) {
      navigate(`/gate-download?state=waiting&email=${encodeURIComponent(value)}`)
    } else {
      navigate(`/cadastro-v2?step=1&email=${encodeURIComponent(value)}&intent=download`)
    }
  }

  return (
    <>
      <ConteudoScreen />

      <Modal open size="md" closeHref="/conteudo" labelledById="gate-title">
        {state === 'email' ? (
          <div className="flex flex-col gap-6">
            <div className="inline-flex items-center justify-center size-16 rounded-full bg-secondary-50">
              <Icon name="download" className="size-8 text-secondary-500" />
            </div>

            <div className="flex flex-col gap-2">
              <h2
                id="gate-title"
                className="font-display font-bold text-headline-sm text-primary-600"
              >
                Baixe este material gratuitamente
              </h2>
              <p className="font-body text-body-md text-neutral-700">
                Acesse com um clique e use todos os materiais sem preencher
                formulários de novo.
              </p>
            </div>

            <form onSubmit={handleContinuar} noValidate className="flex flex-col gap-4">
              <AuthInput
                label="E-mail"
                name="email"
                type="email"
                required
                autoFocus
                autoComplete="email"
                placeholder="seu@empresa.com.br"
                defaultValue={emailDefaultValue}
                error={emailFieldError}
              />

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-3 w-full h-12 rounded-full bg-primary-600 hover:bg-secondary-950 text-white font-body font-bold text-body-lg transition-colors"
              >
                Continuar
                <Icon name="arrow-right" className="size-6" />
              </button>
            </form>

            <AuthBottomLink label="Já tem conta?" linkLabel="Entrar" linkHref="/login-v2" />
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <div className="inline-flex items-center justify-center size-16 rounded-full bg-secondary-50">
              <Icon name="mail" className="size-8 text-secondary-500" />
            </div>

            <div className="flex flex-col gap-2">
              <h2
                id="gate-title"
                className="font-display font-bold text-headline-sm text-primary-600"
              >
                Verifique seu e-mail
              </h2>
              <p className="font-body text-body-lg text-neutral-700">
                Enviamos um link para{' '}
                <strong className="font-bold text-neutral-950">
                  {maskEmail(email || 'voce@empresa.com.br')}
                </strong>
                . Clique no link para baixar seu material.
              </p>

              {currentError === 'nao-recebi' ? (
                <p className="font-body text-body-md text-neutral-600 bg-neutral-50 rounded-lg p-3 mt-1">
                  Verifique a pasta de spam. O link expira em 24 horas. Se o
                  problema persistir, tente reenviar.
                </p>
              ) : null}
            </div>

            <div className="flex flex-col gap-3">
              <ReenviarLinkButton />

              <a
                href="/gate-download?state=email"
                className="self-center font-body font-bold text-body-md text-secondary-950 hover:underline"
              >
                Usei outro e-mail
              </a>
            </div>

            <p className="text-center font-body text-label-md text-neutral-400">
              <a
                href="/conteudo?logado=true"
                className="underline hover:text-neutral-600"
              >
                [Simular clique no link]
              </a>
            </p>
          </div>
        )}
      </Modal>

      <AuthDevNav
        rows={[
          {
            paramName: 'state',
            label: 'State',
            options: GATE_STATES as unknown as string[],
            current: state,
            extraQuery: email ? `&email=${encodeURIComponent(email)}` : '',
          },
          {
            paramName: 'error',
            label: 'Erro',
            options: validErrors as unknown as string[],
            current: currentError,
            extraQuery: `&state=${state}${email ? `&email=${encodeURIComponent(email)}` : ''}`,
          },
        ]}
      />
    </>
  )
}
