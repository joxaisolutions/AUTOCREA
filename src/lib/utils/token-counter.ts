import { TOKEN_CONVERSION } from '@/src/config/constants';

export function estimateTokensFromText(text: string, language: 'en' | 'es' = 'en'): number {
  if (!text || text.trim().length === 0) return 0;
  
  const wordCount = text.trim().split(/\s+/).length;
  const conversion = language === 'en' 
    ? TOKEN_CONVERSION.WORDS_TO_TOKENS_EN 
    : TOKEN_CONVERSION.WORDS_TO_TOKENS_ES;
  
  return Math.ceil(wordCount * conversion);
}

export function estimateTokensFromChars(chars: number): number {
  return Math.ceil(chars / TOKEN_CONVERSION.CHARS_PER_TOKEN);
}

export function formatTokenCount(tokens: number): string {
  if (tokens >= 1000000) {
    return `${(tokens / 1000000).toFixed(1)}M`;
  }
  if (tokens >= 1000) {
    return `${(tokens / 1000).toFixed(1)}K`;
  }
  return tokens.toString();
}

export function getTokenColor(percentage: number): string {
  if (percentage >= 90) return 'text-red-400';
  if (percentage >= 75) return 'text-orange-400';
  if (percentage >= 50) return 'text-yellow-400';
  return 'text-green-400';
}

export function getTokenProgressColor(percentage: number): string {
  if (percentage >= 90) return 'bg-red-500';
  if (percentage >= 75) return 'bg-orange-500';
  if (percentage >= 50) return 'bg-yellow-500';
  return 'bg-cyan-500';
}
