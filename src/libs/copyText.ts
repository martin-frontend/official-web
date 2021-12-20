export function copyTextToClipboard(id: string) {
  const textRange = document.createRange();

  const el = document.getElementById(id);

  if (!el) {
    return;
  }

  textRange.selectNode(el);
  const sel = window.getSelection();

  sel?.removeAllRanges();

  sel?.addRange(textRange);

  document.execCommand('copy');
}
