import React from 'react';
import { mount } from 'enzyme';
import WithOpenHandler from '../WithOpenHandler';

describe('WithOpenHandler Higher-Order Component', () => {
  let props;
  let wrapper;
  let ComposedComponent;

  const MockComponent = ({ isOpen, setWrapperRef, setButtonRef, handleMenuClick }) => (       //eslint-disable-line
    <div ref={setWrapperRef}>
      <button type="button" onClick={handleMenuClick} ref={setButtonRef} />
      {isOpen && <div>Menu</div>}
    </div>
  );

  describe('Rendering UI', () => {
    beforeAll(() => {
      ComposedComponent = WithOpenHandler(MockComponent);
      wrapper = mount(<ComposedComponent foo="foo" />);
      props = wrapper.find(MockComponent).props();
    });

    it('initial menu state is close', () => {
      const { isOpen } = props;
      expect(isOpen).toBe(false);
    });

    it('passed the handleMenuClick function to composed component', () => {
      const { handleMenuClick } = props;
      expect(typeof handleMenuClick).toBe('function');
    });

    it('passed the setWrapperRef function to composed component', () => {
      const { setWrapperRef } = props;
      expect(typeof setWrapperRef).toBe('function');
    });

    it('passed the setButtonRef function to composed component', () => {
      const { setButtonRef } = props;
      expect(typeof setButtonRef).toBe('function');
    });

    it('passed the additionnal prop foo to composed component', () => {
      const { foo } = props;
      expect(foo).toBe('foo');
    });
  });

  describe('Open-Close Menu Functionality', () => {
    let instance;

    beforeAll(() => {
      ComposedComponent = WithOpenHandler(MockComponent);
      wrapper = mount(<ComposedComponent isOpen />);
      instance = wrapper.instance();
    });

    it('render the MockComponent as the root element', () => {
      expect(wrapper.first().is(MockComponent));
    });

    it('initial hoc state is close', () => {
      expect(instance.state.isOpen).toBe(false);
    });

    it('toggle isOpen state', () => {
      instance.handleMenuClick();
      expect(instance.state.isOpen).toBe(true);
    });
  });
});
