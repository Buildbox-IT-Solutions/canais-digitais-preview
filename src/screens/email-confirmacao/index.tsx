import {
	EmailShell,
	EmailBody,
	EmailH1,
	EmailP,
	EmailPMuted,
	EmailStrong,
	EmailButton,
	EmailFallback,
	EmailDivider,
	EmailNote,
} from '../_emails/shell'

/**
 * E-mail transacional: Confirmação de e-mail (pós-cadastro, link válido 24h).
 * Referência: docs/legacy-reference/emails/email-confirmacao.html
 */
export default function EmailConfirmacaoScreen() {
	// URL absoluta (real e-mail não resolve caminho relativo). O endpoint /confirmar
	// segue existindo no protótipo pra teste direto (token → estado "success", ver router.tsx).
	const link = 'https://foodconnection.com.br/confirmar?token=[TOKEN]'
	return (
		<EmailShell>
			<EmailBody>
				<EmailH1>Confirme seu e-mail</EmailH1>
				<EmailP>
					Olá! Recebemos seu cadastro na Food Connection. Para ativar sua conta, clique no botão
					abaixo.
				</EmailP>
				<EmailPMuted>
					Este link é válido por <EmailStrong>24 horas</EmailStrong>. Se expirar, basta solicitar um
					novo.
				</EmailPMuted>
			</EmailBody>
			<EmailButton href={link} label="Ativar minha conta" />
			<EmailFallback href={link} />
			<EmailDivider />
			<EmailNote>
				Se você não criou uma conta na Food Connection, ignore este e-mail — nada acontece.
			</EmailNote>
		</EmailShell>
	)
}
