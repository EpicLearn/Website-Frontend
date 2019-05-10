export default function({ route, store }) {
  if (route.name === 'learn-id') {
    const breadcrumbs = [
      {
        text: 'Learn',
        disabled: false,
        to: '/learn/',
        exact: true
      },
      {
        text: route.params.id,
        disabled: false,
        to: `/learn/${route.params.id}/`,
        exact: true
      }
    ]

    store.commit('setBreadcrumbs', breadcrumbs)
  } else if (route.name === 'learn') {
    const breadcrumbs = [
      {
        text: 'Learn',
        disabled: false,
        to: '/learn/',
        exact: true
      }
    ]
    store.commit('setBreadcrumbs', breadcrumbs)
  } else if (route.name === 'learn-id-id') {
    let bookName = null
    if (store.state.bookName) {
      bookName = store.state.bookName
    } else {
      bookName = route.path.split('/')[2]
    }
    const breadcrumbs = [
      {
        text: 'Learn',
        disabled: false,
        to: '/learn/',
        exact: true
      },
      {
        text: bookName,
        disabled: false,
        to: `/learn/${store.state.bookName}/`,
        exact: true
      },
      {
        text: route.params.id,
        disabled: false,
        to: `/learn/${route.params.id}/`,
        exact: true
      }
    ]

    store.commit('setBreadcrumbs', breadcrumbs)
  }
}
