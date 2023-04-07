export const Routes = {
    return (
        <Routes>
        <Route path="/login" Component={() => <Login />} />
        <Route path="*" Component={() => <NotFound />} />
      </Routes>
    )
}