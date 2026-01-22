import { BrowserRouter, Routes, Route } from "react-router-dom";
import Allposts from "./pages/Posts/Allposts";
import SinglePost from "./pages/Posts/SinglePost";
import Home from "./pages/Home";
import Createpost from "./pages/Createpost.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<Allposts />} />
        <Route path="/posts/:id" element={<SinglePost />} />
        <Route path="/createPost" element={<Createpost />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
