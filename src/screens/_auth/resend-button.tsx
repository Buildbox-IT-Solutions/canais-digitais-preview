import { useState, useEffect } from 'react'

interface IAuthResendButtonProps {
	/** Texto do botão (ex.: "Reenviar link", "Reenviar e-mail"). */
	label?: string
	/** Segundos de bloqueio anti-spam após o clique. */
	seconds?: number
}

/**
 * Botão "Reenviar" com contador regressivo (anti-spam). Após o clique fica
 * desabilitado durante a contagem. Usado nos fluxos de confirmação de e-mail
 * (gate de download) e de recuperação de senha.
 */
export function AuthResendButton({ label = 'Reenviar link', seconds = 60 }: IAuthResendButtonProps) {
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
			onClick={() => setSecondsLeft(seconds)}
			className={`inline-flex items-center justify-center w-full h-12 px-6 rounded-full border-[1.5px] border-primary-600 bg-white hover:bg-primary-600/[0.04] text-primary-600 font-body font-bold text-body-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-500 focus-visible:ring-offset-2${isDisabled ? ' opacity-50 cursor-not-allowed pointer-events-none' : ''}`}
		>
			{isDisabled ? `${label} (${secondsLeft}s)` : label}
		</button>
	)
}
