module.exports = {
    moduleFileExtensions: [
        'ts',
        'tsx',
        'js',
        'json',
    ],
    transform: {
        '^.+\\.(js|jsx|mjs)$': 'babel-jest',
        '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    transformIgnorePatterns: [
        '/node_modules/(?!(xxxx.*?\\.js$))',
    ],
    testPathIgnorePatterns: [
        '/node_modules/',
    ],
    testRegex: '(/tests/.*|\\.(test|spec))\\.(ts|tsx|js)$',
    testURL: 'https://localhost/',
}