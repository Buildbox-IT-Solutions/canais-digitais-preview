import { twMerge } from 'tailwind-merge'
import { Divider } from '~/components/divider'
import type { IFormDisclaimerProps } from './types'

/**
 * Componente: Form Disclaimer
 * Bloco LGPD com divider + textos de consentimento (Informa).
 * Tokens: --color-neutral-900, --color-primary-600
 */
export function FormDisclaimer({ className, privacyHref = '#' }: IFormDisclaimerProps) {
	return (
		<div className={twMerge('flex flex-col gap-8 items-start pb-8 pt-4 px-8 w-full', className)}>
			<Divider />
			<div className="font-body text-body-sm text-neutral-900 w-full space-y-3">
				<p>
					Ao baixar ou se inscrever para acessar este conteúdo, você concorda com os Termos e
					Condições e com a Política de Privacidade. A <em>Informa</em>, provedora deste material,
					poderá enviar comunicações personalizadas, incluindo <em>insights</em> do setor,
					oportunidades exclusivas de <em>networking</em> e acesso a ofertas de nossos eventos,
					produtos e de parceiros selecionados. Os patrocinadores deste conteúdo também poderão
					enviar informações sobre suas soluções, produtos e serviços.
				</p>
				<p>
					Você pode cancelar o recebimento a qualquer momento clicando em "cancelar inscrição" ou
					entrando em contato conosco. Para mais detalhes, consulte nossa{' '}
					<a href={privacyHref} className="font-bold text-primary-600 underline">
						Política de Privacidade
					</a>
					.
				</p>
			</div>
		</div>
	)
}
