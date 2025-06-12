interface StateProvider {
  isLoading: boolean;
  checkState(): boolean;
}

const stateProvider: StateProvider = {
  isLoading: false,
  checkState() {
    return this.isLoading;
  },
};

export default stateProvider;
