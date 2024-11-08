export function formatString(template, values) {
    return template.replace(/{(\w+)}/g, (match, key) => values[key] || '');
}

export function formatJSON(data) {
    return Object.fromEntries(
        Object.entries(data).map(([key, value]) => [key, String(value)])
    );
}

export const formatDate = (date) => {
    if (!date) return null;
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };