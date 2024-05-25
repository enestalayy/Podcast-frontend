import { defineStore } from "pinia";

export const useToggleStore = defineStore("toggleStore", {
  state: () => ({
    visible: false,
    popupComponent: {},
  }),
  getters: {},
  actions: {
    setPopupComponent(component) {
      this.visible = true;
      console.log("component :>> ", component);
      this.popupComponent = component;
    },
    toggleState(stateName) {
      this[stateName] = !this[stateName];
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useToggleStore, import.meta.hot));
}
