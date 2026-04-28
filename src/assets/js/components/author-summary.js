/**
 * Author Summary — bio expand/collapse
 * Uses the same logic as header-author.js since both share
 * [data-trigger="bio-toggle"] and [data-component="bio-expandable"]
 *
 * This module re-exports header-author's init to keep the
 * architecture modular. If author-summary needs divergent
 * behavior in the future, implement it here.
 */
export { init } from './header-author.js';
