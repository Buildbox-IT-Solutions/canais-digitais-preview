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
 * E-mail transacional: Recuperação de senha (link válido 60 min).
 * Referência: docs/legacy-reference/emails/email-recuperacao-senha.html
 */
export default function EmailRecuperacaoSenhaScreen() {
	// Endpoint de redefinição: o token gateia o acesso e o "servidor" abre o formulário de nova senha.
	// No protótipo, /redefinir resolve o token → tela de formulário (ver router.tsx).
	const link = '/redefinir?token=[TOKEN]'
	return (
		<EmailShell>
			<EmailBody>
				<EmailH1>Redefinir sua senha</EmailH1>
				<EmailP>
					Recebemos uma solicitação para redefinir a senha da sua conta. Clique no botão abaixo para
					criar uma nova.
				</EmailP>
				<EmailPMuted>
					Este link é válido por <EmailStrong>60 minutos</EmailStrong>. Depois disso, será preciso
					solicitar um novo.
				</EmailPMuted>
			</EmailBody>
			<EmailButton href={link} label="Criar nova senha" />
			<EmailFallback href={link} />
			<EmailDivider />
			<EmailNote>
				<EmailStrong>Não solicitou essa mudança?</EmailStrong> Pode ignorar este e-mail — sua senha
				atual continua válida.
			</EmailNote>
		</EmailShell>
	)
}
