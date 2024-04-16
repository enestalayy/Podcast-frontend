import { defineStore } from "pinia";

export const useToggleStore = defineStore("toggleStore", {
  state: () => ({
    visible: false,
    popupComponent: {},
  }),
  getters: {},
  actions: {
    setPopupComponent(componentName) {
      this.visible = true;
      this.popupComponent = componentName;
    },
    toggleState(stateName) {
      this[stateName] = !this[stateName];
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useToggleStore, import.meta.hot));
}
