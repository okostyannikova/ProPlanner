import {
  cutText,
  millisecToMinutes,
  minutesToCivilTime,
  convertToFilterOptions,
  getTextColor,
} from '../helpers';

describe('Helper functions', () => {
  describe('cutText', () => {
    it('Text length <= 50 return text', () => {
      const text = 'Some text';
      expect(cutText(text, 50)).toBe(text);
    });
    it('Text length > 50 return text.length equal 54', () => {
      const text =
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor';
      expect(cutText(text, 50).length).toEqual(54);
    });
    it('Text length > 50 return text with "..." on the end of the string', () => {
      const text =
        'Lorem ipsum dolor sit amet... Consectetuer adipiscing elit. Aenean commodo ligula eget dolor';
      expect(/\.{3}$/.test(cutText(text, 50))).toBeTruthy();
    });
  });

  describe('millisecToMinutes', () => {
    it('600000 milliseconds equal 10 minutes', () => {
      expect(millisecToMinutes(600000)).toEqual(10);
    });
  });

  describe('minutesToCivilTime', () => {
    it('97 minutes equal "1:37"', () => {
      expect(minutesToCivilTime(97)).toEqual('1:37');
    });
    it('50 minutes equal "0:50"', () => {
      expect(minutesToCivilTime(50)).toEqual('0:50');
    });
  });

  describe('convertToFilterOptions', () => {
    it('Return array of options', () => {
      const options = {
        work: '#FFBFD4',
        personal: '#FFE07F',
      };
      const type = 'type';
      const key = 'q[event_type]';
      const result = [
        { group: type, value: { [key]: 0 }, label: 'Work' },
        { group: type, value: { [key]: 1 }, label: 'Personal' },
      ];
      expect(convertToFilterOptions(type, key, options)).toEqual(result);
    });
  });

  describe('getTextColor', () => {
    it('Throw error if background color isn\'t in "RGB" format', () => {
      expect(() => getTextColor('#fff')).toThrow('Color must be in "rgb" format!');
    });
    it('Return dark text color if background color is light', () => {
      const bgColor = 'rgb(245,194,211)';
      const mainTextColor = '#4278bb';
      expect(getTextColor(bgColor)).toBe(mainTextColor);
    });
    it('Return light text color if background color is dark', () => {
      const bgColor = 'rgb(163,109,199)';
      const lightTextColor = '#fff';
      expect(getTextColor(bgColor)).toBe(lightTextColor);
    });
  });
});
