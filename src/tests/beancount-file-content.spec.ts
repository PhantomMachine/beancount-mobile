import {
    ACCOUNT_NAME_REGEXP,
    BeancountFileContent,
} from '../app/shared/beancount-file-content';

describe('regexp tests', () => {
    describe('account name regexp', () => {
        it('should allow valid account name', () => {
            const result = ACCOUNT_NAME_REGEXP.test('Assets:Test-Account');
            expect(result).toBe(true);
        });
        it('should allow unicode account name', () => {
            const result = ACCOUNT_NAME_REGEXP.test('Активы:Тест-Счёт');
            expect(result).toBe(true);
        });
        it('should not allow account name with whitespace', () => {
            const result = ACCOUNT_NAME_REGEXP.test('Assets:Test Account');
            expect(result).toBe(false);
        });
        it('should not allow top level accounts', () => {
            const result = ACCOUNT_NAME_REGEXP.test('Assets');
            expect(result).toBe(false);
        });
    });
});

describe('beancount file content tests', () => {
    it('should initialize successfully', () => {
        const text = 'test text';
        const content = new BeancountFileContent(text);
        expect(content.text).toBe(text);
    });

    it('should parse title', () => {
        const content = new BeancountFileContent(
            'option "title" "BeanTest"\n' +
            'option "operating_currency" "USD"\n');
        expect(content.getTitle()).toBe('BeanTest');
    });
});
