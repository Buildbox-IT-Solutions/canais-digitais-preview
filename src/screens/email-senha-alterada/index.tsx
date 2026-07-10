import {
	EmailShell,
	EmailBody,
	EmailH1,
	EmailP,
	EmailStrong,
	EmailLink,
	EmailNote,
	EmailDivider,
} from '../_emails/shell'

/**
 * E-mail transacional: Senha alterada (confirmação pós-redefinição, aviso de segurança).
 * Hierarquia deliberada: a ação primária é "não fazer nada" — mensagem de tranquilização em
 * destaque no corpo principal. "Não reconheço essa alteração" é o caminho secundário,
 * rebaixado a link de texto dentro de uma nota discreta abaixo do divisor — sem botão nem
 * fallback de URL (não é o CTA principal do e-mail).
 */
export default function EmailSenhaAlteradaScreen() {
	const link = 'https://foodconnection.com.br/redefinir?token=[TOKEN]'
	return (
		<EmailShell>
			<EmailBody>
				<EmailH1>Sua senha foi alterada com sucesso</EmailH1>
				<EmailP>Olá, [NOME]. A senha da sua conta na Food Connection foi alterada em:</EmailP>

				<div style={{ margin: '0 0 16px 0' }}>
					<span
						style={{
							display: 'inline-block',
							background: '#F7F8FA',
							border: '1px solid #D6D8DD',
							borderRadius: 6,
							padding: '8px 16px',
							fontFamily: "'Open Sans', Arial, sans-serif",
							fontWeight: 700,
							fontSize: 15,
							color: '#283857',
						}}
					>
						[DATA_HORA]
					</span>
				</div>

				<EmailP>Se foi você, está tudo certo — nenhuma ação é necessária.</EmailP>
			</EmailBody>

			<EmailDivider />

			<EmailNote>
				<>
					<EmailStrong>Não reconhece essa alteração?</EmailStrong>
					<br />
					Você pode redefinir sua senha para garantir que só você tenha acesso:{' '}
					<EmailLink href={link}>Redefinir minha senha »</EmailLink>
				</>
				<>
					Se não conseguir entrar, escreva para{' '}
					<EmailLink href="mailto:suporte@foodconnection.com.br">
						suporte@foodconnection.com.br
					</EmailLink>
					.
				</>
			</EmailNote>
		</EmailShell>
	)
}
