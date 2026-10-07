import { TRANSLATIONS } from '../testing/translations';

// Flattens { a: { b: 'x', c: ['y'] } } to { 'a.b': 'x', 'a.c': ['y'] }.
function flatten(obj: object, prefix = ''): Record<string, unknown> {
  return Object.entries(obj).reduce<Record<string, unknown>>((out, [key, value]) => {
    const path = prefix + key;
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      Object.assign(out, flatten(value, path + '.'));
    } else {
      out[path] = value;
    }
    return out;
  }, {});
}

describe('translation files (assets/i18n)', () => {
  const [fr, de, en] = [TRANSLATIONS.fr, TRANSLATIONS.de, TRANSLATIONS.en].map((t) => flatten(t));

  it('should have the same keys in French, German and English', () => {
    expect(Object.keys(de).sort()).toEqual(Object.keys(fr).sort());
    expect(Object.keys(en).sort()).toEqual(Object.keys(fr).sort());
  });

  it('should have the same number of list items in every language', () => {
    for (const [key, value] of Object.entries(fr)) {
      if (Array.isArray(value)) {
        expect((de[key] as unknown[]).length, key).toBe(value.length);
        expect((en[key] as unknown[]).length, key).toBe(value.length);
      }
    }
  });

  it('should not have empty texts', () => {
    for (const texts of [fr, de, en]) {
      for (const [key, value] of Object.entries(texts)) {
        const values = Array.isArray(value) ? value : [value];
        for (const text of values) expect(String(text).trim(), key).not.toBe('');
      }
    }
  });
});
