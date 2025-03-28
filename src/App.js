import "./App.css";
import Landing from "./pages/Landing/Landing";
import { Route, Routes } from "react-router-dom";
import Mains from "./pages/Catalog/Mains";
import Layout from "./components/Layout/Layout";
import Settings from "./pages/settings/Settings";
import Post from "./pages/Post/Post";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import Archive from "./pages/Archive/Archive";
import Mypub from "./pages/Mypub/Mypub";
import Catalog from "./pages/Catalog/CatalogD/Catalog";
// import myArchive from "./pages/myArchive/myArchive";
import Profit from "./pages/profit/Profit";
import Chat from "./pages/Chat/Chat";
import Test from "./pages/Test/Test";
import Users from "./pages/Admin/Users/Users";
import ResourceAdmin from "./pages/Admin/ResourceAdmin/ResourceAdmin";
import AdminPanel from "./pages/Admin/AdminPanel/AdminPanel";
import Dispatch from "./pages/Admin/Dispatch/Dispatch";
import Posts from "./pages/Admin/Posts/Posts";
import PostEdit from "./pages/Admin/PostEdit/PostEdit";
import Stats from "./pages/Admin/Stats/Stats";
import EditPostCatalog from "./pages/Catalog/CatalogD/EditPostCatalog";
import MyDetails from "./pages/Mypub/MyDetails/MyDetails";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/Auth/Confirm/:uuid" element={<Landing />} />
        <Route path="/" element={<Layout></Layout>}>
          <Route path="/admin/" element={<AdminPanel></AdminPanel>} />
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/resource" element={<ResourceAdmin />} />
          <Route path="/admin/dispatch" element={<Dispatch />} />
          <Route path="/admin/posts" element={<Posts></Posts>} />
          <Route
            path="/admin/postedit/:postId"
            element={<PostEdit></PostEdit>}
          />
          <Route path="/admin/stats" element={<Stats />} />
          <Route
            path="/publication/postedit/:postId"
            element={<EditPostCatalog />}
          />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/post" element={<Post />} />
          <Route path="/post/profit/:postId" element={<Profit />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          {/* <Route path='/resources' element={<Catalog/>} /> */}
          <Route path="/resources" element={<Mains />} />
          <Route path="/archive" element={<Archive />} />
          {/* <Route path="/archive" element={<myArchive />} /> */}
          <Route path="/chat/:user_id" element={<Chat />} />
          <Route path="/publication" element={<Mypub />} />
          <Route path="/publication/details" element={<MyDetails />} />
          <Route path="/test" element={<Test></Test>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
