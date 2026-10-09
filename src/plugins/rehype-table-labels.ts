/**
 * Rehype plugin for every Markdown table: copies each column header onto its cells as `data-label`
 * (so a phone layout can show the header above each value) and adds explicit ARIA table roles, so the
 * table keeps its semantics for screen readers even when CSS turns rows into stacked cards.
 */

type HastNode = {
  type: string;
  tagName?: string;
  value?: string;
  properties?: Record<string, unknown>;
  children?: HastNode[];
};

const ROLES: Record<string, string> = {
  table: 'table',
  thead: 'rowgroup',
  tbody: 'rowgroup',
  tr: 'row',
  th: 'columnheader',
  td: 'cell',
};

/**
 * Plain text of a node and its descendants.
 * @param node - any hast node
 * @returns the concatenated text
 */
function textOf(node: HastNode): string {
  if (node.type === 'text') {
    return node.value ?? '';
  }
  return (node.children ?? []).map(textOf).join('');
}

/**
 * Direct element children with the given tag names, searched depth-first.
 * @param node - the parent node
 * @param tag - the tag to collect
 * @returns every matching descendant element
 */
function collect(node: HastNode, tag: string): HastNode[] {
  const found: HastNode[] = [];
  for (const child of node.children ?? []) {
    if (child.type === 'element' && child.tagName === tag) {
      found.push(child);
    }
    if (child.type === 'element' && child.tagName !== tag) {
      found.push(...collect(child, tag));
    }
  }
  return found;
}

/** Adds roles to the table and every descendant table part. */
function addRoles(node: HastNode): void {
  if (node.type === 'element' && node.tagName && ROLES[node.tagName]) {
    node.properties = {...node.properties, role: ROLES[node.tagName]};
  }
  for (const child of node.children ?? []) {
    addRoles(child);
  }
}

/**
 * Labels one table's body cells with their column headers.
 * @param table - a hast `table` element (mutated)
 */
function labelTable(table: HastNode): void {
  const headerRow = collect(table, 'tr').find((row) => collect(row, 'th').length > 0);
  const headers = headerRow ? collect(headerRow, 'th').map((th) => textOf(th).trim()) : [];
  for (const row of collect(table, 'tr')) {
    if (row === headerRow) {
      continue;
    }
    collect(row, 'td').forEach((cell, index) => {
      if (headers[index]) {
        cell.properties = {...cell.properties, dataLabel: headers[index]};
      }
    });
  }
  table.properties = {...table.properties, className: ['z-table']};
  addRoles(table);
}

/**
 * The plugin factory Docusaurus calls.
 * @returns the tree transformer
 */
export default function rehypeTableLabels() {
  return (tree: HastNode): void => {
    const walk = (node: HastNode): void => {
      if (node.type === 'element' && node.tagName === 'table') {
        labelTable(node);
        return;
      }
      for (const child of node.children ?? []) {
        walk(child);
      }
    };
    walk(tree);
  };
}
