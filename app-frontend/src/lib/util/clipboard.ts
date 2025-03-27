export function clipboard(text: string) {
  if (navigator.clipboard) {
    // Use the Clipboard API if available
    navigator.clipboard.writeText(text);
  } else {
    // Fallback method using a textarea
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  }
}