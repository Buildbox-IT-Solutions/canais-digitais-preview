<?php
/**
 * Partial: Form Checkbox — checkbox com label de texto
 *
 * USO:
 *   <?php get_template_part('components/_partials/form-checkbox', null, [
 *     'label' => 'Sim, eu desejo receber informações...',
 *   ]); ?>
 *
 * PROPS ($args):
 *   label → string (texto ao lado do checkbox)
 */
?>
<label class="flex gap-4 items-start cursor-pointer w-full">
  <span class="flex items-center justify-center px-3 py-2 rounded-full shrink-0">
    <span class="size-[18px] rounded-xs border-2 border-neutral-950"></span>
  </span>
  <span class="flex flex-1 flex-col items-start justify-center min-w-0 py-2">
    <span class="font-body text-body-md text-neutral-950 w-full"><?= $args['label'] ?></span>
  </span>
</label>
