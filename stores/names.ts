import { defineStore } from 'pinia'

export const useNamesStore = defineStore('names', {
  state: () => ({
    recentNames: [],
    favorites: []
  }),

  actions: {
    addRecentName(name) {
      this.recentNames.unshift(name)
      if (this.recentNames.length > 10) {
        this.recentNames.pop()
      }
    },

    addToFavorites(name) {
      if (!this.favorites.find(f => f._id === name._id)) {
        this.favorites.push(name)
      }
    },

    removeFromFavorites(nameId) {
      const index = this.favorites.findIndex(f => f._id === nameId)
      if (index > -1) {
        this.favorites.splice(index, 1)
      }
    }
  },

  persist: {
    storage: persistedState.localStorage
  }
}) 