// Mapa: nazwa języka → klasa CSS kropki
const LANG_COLORS = {
    'C#': 'color-C#', 'Java': 'color-Java', 'Python': 'color-Python',
    'JavaScript': 'color-JavaScript', 'Batchfile': 'color-Batchfile',
    'TypeScript': 'color-TypeScript', 'HTML': 'color-HTML'
};

function getLangDotClass(lang) {
    return LANG_COLORS[lang] || 'color-default';
}

function sortRepos(repos) {
    const own = repos.filter(r => !r.fork);
    const forks = repos.filter(r => r.fork);

    const withStars = own.filter(r => r.stargazers_count > 0)
        .sort((a, b) => b.stargazers_count - a.stargazers_count);

    const noStars = own.filter(r => r.stargazers_count === 0)
        .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

    forks.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

    return [...withStars, ...noStars, ...forks];
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { LANG_COLORS, getLangDotClass, sortRepos };
}
