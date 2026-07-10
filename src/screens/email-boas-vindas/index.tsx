import { EmailShell, EmailBody, EmailH1, EmailP, EmailButton, EmailFallback } from '../_emails/shell'

/**
 * E-mail transacional: Boas-vindas (pós-confirmação, conta ativada).
 * Referência: docs/legacy-reference/emails/email-boasvindas.html
 * Genericizado: sem a seção "todos os portais Informa" (conta global fora de escopo).
 */
export default function EmailBoasVindasScreen() {
	const link = 'https://foodconnection.com.br/'
	return (
		<EmailShell>
			<EmailBody>
				<EmailH1>Bem vindo, [NOME]!</EmailH1>
				<EmailP>
					Sua conta está ativa no Food Connection. Agora você baixa qualquer material com um
					clique, sem preencher formulário de novo.
				</EmailP>
			</EmailBody>
			<EmailButton href={link} label="Explorar portal" />
			<EmailFallback href={link} />
		</EmailShell>
	)
}
