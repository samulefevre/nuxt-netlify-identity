import netlifyIdentity from 'netlify-identity-widget'

export default function ({ redirect }) {
  const currentUser = netlifyIdentity.currentUser()

  if (!currentUser) {
    return redirect('/')
  }
}
