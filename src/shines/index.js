// C mixin, will need a wrapper over it to be used
const DuskShine = InnerComponent => class extends InnerComponent {
  construct() {
    super();

    // map the special props from Dusk Shadows to the "this" var
    if (this.props.$actions) {
      this.$actions = this.props.$actions;
    }
    if (this.props.$selectors) {
      this.$selectors = this.props.$selectors;
    }
  }
};

export default DuskShine;
