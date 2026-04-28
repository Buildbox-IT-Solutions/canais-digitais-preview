<?php
/**
 * Router para php -S localhost:8000 router.php
 *
 * Comportamento:
 *   /src/components/**  → servido como TEXTO PLANO (showcase.js resolve PHP no client)
 *   /src/layouts/**     → executado como PHP nativo (get_template_part funciona)
 *   /src/docs/**        → servido normalmente (HTML/CSS/JS estáticos)
 *   tudo mais           → fallback padrão do built-in server
 *
 * Define get_template_part() polyfill para que layouts possam incluir
 * partials com $args, igual ao WordPress real.
 */

// Suppress undefined array key warnings (PHP 8.x) — preview server, not production
error_reporting(E_ALL & ~E_WARNING);

$uri  = urldecode(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));
$file = __DIR__ . $uri;

// Root entry point
if ($uri === '/') {
    $uri = '/index.php';
    $file = __DIR__ . $uri;
}

// ── Segurança: só servir dentro do projeto ──────────────────────────
$real = realpath($file);
if ($real && strpos($real, realpath(__DIR__)) !== 0) {
    http_response_code(403);
    echo '403 Forbidden';
    return true;
}

// ── /src/components/ → texto plano (showcase.js consome) ────────────
if (preg_match('#^/src/components/#', $uri) && is_file($file)) {
    header('Content-Type: text/plain; charset=UTF-8');
    header('Cache-Control: no-cache');
    readfile($file);
    return true;
}

// ── /src/layouts/ ────────────────────────────────────────────────────
//   ?raw  → texto plano (layouts.js consome client-side, igual showcase.js)
//   sem ?raw → execução PHP nativa (preview standalone com HTML wrapper)
if (preg_match('#^/src/layouts/#', $uri) && is_file($file) && pathinfo($file, PATHINFO_EXTENSION) === 'php') {

    // Raw mode: layouts.js precisa do source PHP bruto pra processar client-side
    if (isset($_GET['raw'])) {
        header('Content-Type: text/plain; charset=UTF-8');
        header('Cache-Control: no-cache');
        readfile($file);
        return true;
    }

    // Polyfill get_template_part() — emula a semântica do WordPress:
    //   get_template_part($slug, $name, $args)
    //   → inclui /src/{$slug}.php com $args disponível no escopo do partial
    if (!function_exists('get_template_part')) {
        function get_template_part(string $slug, ?string $name = null, array $args = []): void {
            // $slug vem como 'components/_partials/categoria'
            // Resolve relativo à raiz do projeto (/src/)
            $path = __DIR__ . '/src/' . $slug . '.php';

            if (!is_file($path)) {
                echo "<!-- partial not found: {$slug} -->";
                return;
            }

            // $args fica disponível no escopo do include, igual ao WP
            include $path;
        }
    }

    // Wrap em HTML completo com CSS do projeto
    ?><!doctype html>
<html lang="pt-br">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Layout Preview</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Aleo:wght@400;600;700&family=Open+Sans:wght@400;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/src/docs/output.css">
</head>
<body class="bg-white text-primary-600 antialiased font-body">
<?php include $file; ?>
</body>
</html><?php
    return true;
}

// ── Fallback: servir arquivo estático ou retornar false (404 do built-in) ──
if (is_file($file)) {
    return false; // built-in server serve o arquivo normalmente
}

// Arquivo não existe → 404
return false;
