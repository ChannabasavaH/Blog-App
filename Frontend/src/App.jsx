import { Route,Routes } from "react-router-dom"
import Home from "./pages/Home"
import NewBlog from './pages/NewBlog'
import UpdateBlog from './pages/UpdateBlog'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/api/blogs" element={<NewBlog />} />
        <Route path="/api/blogs/:id/edit" element={<UpdateBlog />} />
      </Routes>
    </>
  )
}

export default App
