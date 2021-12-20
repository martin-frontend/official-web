export function getPagesOnPagination(
  currentPage: number,
  totalPages: number
): (number | '...')[] {
  const showedPages: (number | '...')[] = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) {
      showedPages.push(i);
    }
  } else if (currentPage <= 3) {
    for (let i = 1; i <= 5; i++) {
      showedPages.push(i);
    }
    showedPages.push('...');
    showedPages.push(totalPages);
  } else if (currentPage >= totalPages - 2) {
    showedPages.push(1);
    showedPages.push('...');
    for (let i = totalPages - 4; i <= totalPages; i++) {
      showedPages.push(i);
    }
  } else {
    showedPages.push(1);
    showedPages.push('...');
    showedPages.push(currentPage - 1);
    showedPages.push(currentPage);
    showedPages.push(currentPage + 1);
    showedPages.push('...');
    showedPages.push(totalPages);
  }
  return showedPages;
}
