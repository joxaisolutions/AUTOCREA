/**
 * Auto-organización de archivos generados por JoxCoder AI
 * Organiza archivos en carpetas según su tipo y propósito
 */

export interface GeneratedFile {
  name: string;
  content: string;
  language: string;
  path?: string;
}

export interface OrganizedFiles {
  components: GeneratedFile[];
  pages: GeneratedFile[];
  api: GeneratedFile[];
  lib: GeneratedFile[];
  hooks: GeneratedFile[];
  utils: GeneratedFile[];
  types: GeneratedFile[];
  styles: GeneratedFile[];
  config: GeneratedFile[];
  tests: GeneratedFile[];
  public: GeneratedFile[];
  root: GeneratedFile[];
}

/**
 * Organiza archivos generados en carpetas apropiadas
 */
export function organizeGeneratedFiles(files: GeneratedFile[]): OrganizedFiles {
  const organized: OrganizedFiles = {
    components: [],
    pages: [],
    api: [],
    lib: [],
    hooks: [],
    utils: [],
    types: [],
    styles: [],
    config: [],
    tests: [],
    public: [],
    root: [],
  };

  files.forEach(file => {
    const fileName = file.name.toLowerCase();
    const filePath = file.path?.toLowerCase() || '';
    const fileExt = fileName.split('.').pop() || '';

    // Test files
    if (fileName.includes('.test.') || fileName.includes('.spec.') || filePath.includes('test')) {
      organized.tests.push({ ...file, path: `tests/${file.name}` });
      return;
    }

    // Type definitions
    if (fileName.endsWith('.d.ts') || fileName.includes('type') || fileName.includes('interface')) {
      organized.types.push({ ...file, path: `src/types/${file.name}` });
      return;
    }

    // Styles
    if (['css', 'scss', 'sass', 'less', 'stylus'].includes(fileExt)) {
      organized.styles.push({ ...file, path: `src/styles/${file.name}` });
      return;
    }

    // Config files
    if (
      fileName.includes('config') ||
      ['json', 'yaml', 'yml', 'toml', 'env'].includes(fileExt) ||
      fileName === 'package.json' ||
      fileName === 'tsconfig.json' ||
      fileName === 'next.config.js' ||
      fileName === 'vite.config.ts'
    ) {
      organized.config.push({ ...file, path: file.name });
      return;
    }

    // API routes
    if (
      filePath.includes('api') ||
      fileName.includes('api') ||
      fileName.includes('route') ||
      fileName.includes('endpoint')
    ) {
      organized.api.push({ ...file, path: `src/api/${file.name}` });
      return;
    }

    // Custom hooks (React/Vue)
    if (fileName.startsWith('use') && fileName.endsWith('.ts')) {
      organized.hooks.push({ ...file, path: `src/hooks/${file.name}` });
      return;
    }

    // Components
    if (
      fileName.includes('component') ||
      fileName.endsWith('.tsx') ||
      fileName.endsWith('.jsx') ||
      fileName.endsWith('.vue') ||
      filePath.includes('component')
    ) {
      organized.components.push({ ...file, path: `src/components/${file.name}` });
      return;
    }

    // Pages/Routes
    if (
      fileName.includes('page') ||
      fileName.includes('route') ||
      filePath.includes('page') ||
      filePath.includes('view')
    ) {
      organized.pages.push({ ...file, path: `src/pages/${file.name}` });
      return;
    }

    // Utilities/Helpers
    if (fileName.includes('util') || fileName.includes('helper') || filePath.includes('util')) {
      organized.utils.push({ ...file, path: `src/utils/${file.name}` });
      return;
    }

    // Public assets
    if (
      ['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp', 'ico', 'woff', 'woff2', 'ttf', 'eot'].includes(fileExt) ||
      filePath.includes('public') ||
      filePath.includes('asset')
    ) {
      organized.public.push({ ...file, path: `public/${file.name}` });
      return;
    }

    // Library/shared code
    if (fileName.includes('lib') || filePath.includes('lib')) {
      organized.lib.push({ ...file, path: `src/lib/${file.name}` });
      return;
    }

    // Root level files (README, LICENSE, etc.)
    if (
      fileName.startsWith('readme') ||
      fileName.startsWith('license') ||
      fileName.startsWith('.git') ||
      fileName === '.env.example' ||
      fileName === '.eslintrc' ||
      fileName === '.prettierrc'
    ) {
      organized.root.push({ ...file, path: file.name });
      return;
    }

    // Default: put in src/ if it's code, otherwise root
    if (['ts', 'tsx', 'js', 'jsx', 'py', 'go', 'rs', 'java', 'cpp', 'c', 'h'].includes(fileExt)) {
      organized.lib.push({ ...file, path: `src/${file.name}` });
    } else {
      organized.root.push({ ...file, path: file.name });
    }
  });

  return organized;
}

/**
 * Aplana la estructura organizada en una lista de archivos con paths completos
 */
export function flattenOrganizedFiles(organized: OrganizedFiles): GeneratedFile[] {
  const allFiles: GeneratedFile[] = [];

  Object.values(organized).forEach(categoryFiles => {
    allFiles.push(...categoryFiles);
  });

  return allFiles;
}

/**
 * Obtiene un resumen de la organización
 */
export function getOrganizationSummary(organized: OrganizedFiles): Record<string, number> {
  return {
    components: organized.components.length,
    pages: organized.pages.length,
    api: organized.api.length,
    lib: organized.lib.length,
    hooks: organized.hooks.length,
    utils: organized.utils.length,
    types: organized.types.length,
    styles: organized.styles.length,
    config: organized.config.length,
    tests: organized.tests.length,
    public: organized.public.length,
    root: organized.root.length,
  };
}

/**
 * Crea una estructura de árbol para visualizar
 */
export function createFileTree(organized: OrganizedFiles): string {
  const tree: string[] = [];
  
  const addSection = (title: string, files: GeneratedFile[]) => {
    if (files.length > 0) {
      tree.push(`📁 ${title}/ (${files.length})`);
      files.forEach(file => {
        tree.push(`  📄 ${file.name}`);
      });
    }
  };

  addSection('src/components', organized.components);
  addSection('src/pages', organized.pages);
  addSection('src/api', organized.api);
  addSection('src/hooks', organized.hooks);
  addSection('src/utils', organized.utils);
  addSection('src/types', organized.types);
  addSection('src/lib', organized.lib);
  addSection('src/styles', organized.styles);
  addSection('tests', organized.tests);
  addSection('public', organized.public);
  addSection('config', organized.config);
  addSection('root', organized.root);

  return tree.join('\n');
}

/**
 * Detecta framework basado en archivos generados
 */
export function detectFramework(files: GeneratedFile[]): string {
  const fileNames = files.map(f => f.name.toLowerCase()).join(' ');
  
  if (fileNames.includes('next.config')) return 'Next.js';
  if (fileNames.includes('vite.config')) return 'Vite';
  if (fileNames.includes('nuxt.config')) return 'Nuxt';
  if (fileNames.includes('gatsby-config')) return 'Gatsby';
  if (fileNames.includes('vue.config')) return 'Vue';
  if (fileNames.includes('angular.json')) return 'Angular';
  if (fileNames.includes('svelte.config')) return 'Svelte';
  if (fileNames.includes('package.json')) {
    const packageJson = files.find(f => f.name === 'package.json');
    if (packageJson?.content.includes('react')) return 'React';
  }
  
  return 'Unknown';
}

/**
 * Detecta lenguaje principal basado en extensiones de archivos
 */
export function detectPrimaryLanguage(files: GeneratedFile[]): string {
  const langCount: Record<string, number> = {};

  files.forEach(file => {
    const ext = file.name.split('.').pop() || '';
    langCount[ext] = (langCount[ext] || 0) + 1;
  });

  // Map extensions to languages
  const extToLang: Record<string, string> = {
    ts: 'TypeScript',
    tsx: 'TypeScript',
    js: 'JavaScript',
    jsx: 'JavaScript',
    py: 'Python',
    go: 'Go',
    rs: 'Rust',
    java: 'Java',
    cpp: 'C++',
    c: 'C',
    rb: 'Ruby',
    php: 'PHP',
    swift: 'Swift',
    kt: 'Kotlin',
  };

  let maxCount = 0;
  let primaryLang = 'Unknown';

  Object.entries(langCount).forEach(([ext, count]) => {
    const lang = extToLang[ext];
    if (lang && count > maxCount) {
      maxCount = count;
      primaryLang = lang;
    }
  });

  return primaryLang;
}
