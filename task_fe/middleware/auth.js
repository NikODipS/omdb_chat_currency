export default function ({ redirect, $guard }) {
  if (!$guard.isAuthenticated()) {
    return redirect('/login')
  }
}
