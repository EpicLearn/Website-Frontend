export const state = () => ({
  breadcrumbs: null,
  bookName: null
})

export const mutations = {
  setBreadcrumbs(state, data) {
    state.breadcrumbs = [
      {
        text: 'Docs',
        disabled: false,
        to: '/',
        exact: true
      },
      ...data
    ]
  },
  setBookName(state, data) {
    state.bookName = data
  }
}
