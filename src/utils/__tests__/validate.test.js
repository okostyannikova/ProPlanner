import { required, maxTitleLength, maxDescriptionLength } from '../validate';

describe('Text validation', () => {
  describe('Required', () => {
    it('Return error if value undefined', () => {
      expect(required()).toBe('Value is required');
    });
    it('Return "undefined" if value exict', () => {
      expect(required('Value is required')).toBeUndefined();
    });
  });

  describe('Max title length', () => {
    it('Return error if value > 50 symbols', () => {
      const string =
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.';
      expect(maxTitleLength(string)).toBe('Value is too long (Max 50 symbols)');
    });

    it('Return "undefined" if value <= 50 symbols', () => {
      expect(maxTitleLength('Value')).toBeUndefined();
    });
  });

  describe('Max description length', () => {
    it('Return error if value > 255 symbols', () => {
      const string =
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.';
      expect(maxDescriptionLength(string)).toBe('Value is too long (Max 255 symbols)');
    });

    it('Return "undefined" if value <= 255 symbols', () => {
      expect(maxDescriptionLength('Value')).toBeUndefined();
    });
  });
});
