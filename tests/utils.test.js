const { sortRepos, getLangDotClass } = require('../js/utils');

describe('getLangDotClass', () => {
    test('returns correct class for known languages', () => {
        expect(getLangDotClass('Python')).toBe('color-Python');
        expect(getLangDotClass('JavaScript')).toBe('color-JavaScript');
        expect(getLangDotClass('C#')).toBe('color-C#');
    });

    test('returns default class for unknown languages', () => {
        expect(getLangDotClass('Unknown')).toBe('color-default');
        expect(getLangDotClass(null)).toBe('color-default');
    });
});

describe('sortRepos', () => {
    test('sorts repos correctly by category and then by stars/date', () => {
        const repos = [
            { name: 'own-stars-10', fork: false, stargazers_count: 10, updated_at: '2023-01-01' },
            { name: 'own-stars-20', fork: false, stargazers_count: 20, updated_at: '2023-01-01' },
            { name: 'own-no-stars-new', fork: false, stargazers_count: 0, updated_at: '2023-02-01' },
            { name: 'own-no-stars-old', fork: false, stargazers_count: 0, updated_at: '2023-01-01' },
            { name: 'fork-new', fork: true, stargazers_count: 100, updated_at: '2023-03-01' },
            { name: 'fork-old', fork: true, stargazers_count: 50, updated_at: '2023-01-01' },
        ];

        const sorted = sortRepos(repos);

        // Expected order:
        // 1. Own with stars (descending stars): own-stars-20, own-stars-10
        // 2. Own without stars (descending updated_at): own-no-stars-new, own-no-stars-old
        // 3. Forks (descending updated_at): fork-new, fork-old

        expect(sorted.map(r => r.name)).toEqual([
            'own-stars-20',
            'own-stars-10',
            'own-no-stars-new',
            'own-no-stars-old',
            'fork-new',
            'fork-old'
        ]);
    });

    test('handles case with only own repos with stars', () => {
        const repos = [
            { name: 'a', fork: false, stargazers_count: 5 },
            { name: 'b', fork: false, stargazers_count: 15 }
        ];
        const sorted = sortRepos(repos);
        expect(sorted.map(r => r.name)).toEqual(['b', 'a']);
    });

    test('handles case with only own repos without stars', () => {
        const repos = [
            { name: 'old', fork: false, stargazers_count: 0, updated_at: '2020-01-01' },
            { name: 'new', fork: false, stargazers_count: 0, updated_at: '2021-01-01' }
        ];
        const sorted = sortRepos(repos);
        expect(sorted.map(r => r.name)).toEqual(['new', 'old']);
    });

    test('handles case with only forks', () => {
        const repos = [
            { name: 'old-fork', fork: true, updated_at: '2020-01-01' },
            { name: 'new-fork', fork: true, updated_at: '2021-01-01' }
        ];
        const sorted = sortRepos(repos);
        expect(sorted.map(r => r.name)).toEqual(['new-fork', 'old-fork']);
    });

    test('handles empty array', () => {
        expect(sortRepos([])).toEqual([]);
    });
});
