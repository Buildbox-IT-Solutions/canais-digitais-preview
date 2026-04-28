<?php
/**
 * Project entry point for local preview.
 * Lists quick links to docs and all available layouts.
 */
$layouts = glob(__DIR__ . '/src/layouts/*.php') ?: [];
sort($layouts);
?>
<!doctype html>
<html lang="pt-br">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>WP Theme Preview Hub</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Aleo:wght@400;600;700&family=Open+Sans:wght@400;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/src/docs/output.css">
</head>
<body class="bg-neutral-50 text-primary-600 font-body antialiased">
  <main class="mx-auto max-w-screen-xl px-4 py-10 lg:px-6">
    <header class="mb-8">
      <p class="text-label-md text-primary-400">Local preview</p>
      <h1 class="font-display text-display-sm text-primary-600">WP Theme Entry Point</h1>
      <p class="mt-2 max-w-3xl text-body-lg text-primary-500">
        Use esta página como atalho para navegar entre documentação e telas de layout.
      </p>
    </header>

    <section class="mb-10">
      <h2 class="mb-4 font-display text-headline-sm text-primary-600">Documentação</h2>
      <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <a class="rounded-lg border border-neutral-200 bg-white p-4 shadow-sm transition hover:shadow-md" href="/src/docs/index.html">
          <p class="font-semibold">Componentes</p>
          <p class="text-body-sm text-primary-500">Catálogo visual dos componentes.</p>
        </a>
        <a class="rounded-lg border border-neutral-200 bg-white p-4 shadow-sm transition hover:shadow-md" href="/src/docs/index-layouts.html">
          <p class="font-semibold">Layouts (docs)</p>
          <p class="text-body-sm text-primary-500">Índice de layouts em formato de documentação.</p>
        </a>
        <a class="rounded-lg border border-neutral-200 bg-white p-4 shadow-sm transition hover:shadow-md" href="/src/docs/tokens.html">
          <p class="font-semibold">Tokens</p>
          <p class="text-body-sm text-primary-500">Paleta, tipografia e variáveis do design system.</p>
        </a>
      </div>
    </section>

    <section>
      <h2 class="mb-4 font-display text-headline-sm text-primary-600">Layouts disponíveis</h2>
      <?php if (empty($layouts)): ?>
        <p class="rounded-lg border border-warning-300 bg-warning-50 p-4 text-body-md text-warning-700">
          Nenhum layout foi encontrado em <code>/src/layouts</code>.
        </p>
      <?php else: ?>
        <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <?php foreach ($layouts as $layoutPath): ?>
            <?php $name = basename($layoutPath); ?>
            <a
              class="rounded-lg border border-neutral-200 bg-white p-4 shadow-sm transition hover:shadow-md"
              href="/src/layouts/<?php echo htmlspecialchars($name, ENT_QUOTES, 'UTF-8'); ?>"
            >
              <p class="font-semibold"><?php echo htmlspecialchars($name, ENT_QUOTES, 'UTF-8'); ?></p>
              <p class="text-body-sm text-primary-500">Abrir preview PHP nativo.</p>
            </a>
          <?php endforeach; ?>
        </div>
      <?php endif; ?>
    </section>
  </main>
</body>
</html>
