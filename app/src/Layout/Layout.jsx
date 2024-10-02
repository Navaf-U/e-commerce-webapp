import Footer from "../pages/Footer"
function Layout({children}) {
  return (
    <div>

      <div>
      {children}
      </div>
      <Footer/>
    </div>
  )
}

export default Layout
