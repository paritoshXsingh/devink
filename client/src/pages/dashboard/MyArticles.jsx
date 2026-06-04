import { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import ArticleTableItem from "../../components/dashboard/ArticleTableItem";

const MyArticles = () => {
  const [blogs, setBlogs] = useState([]);

  const { axios } = useAppContext();

  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get("/api/user/my-blogs");

      if (data.success) {
        setBlogs(data.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="flex-1 p-4 sm:p-10">
      <h1 className="text-2xl font-semibold mb-6">My Articles</h1>

      {blogs.length === 0 ? (
        <div className="bg-white border rounded-lg p-10 text-center text-gray-500">
          No articles yet.
        </div>
      ) : (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-white">
          <table className="w-full text-sm text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  #
                </th>

                <th scope="col" className="px-6 py-3">
                  Title
                </th>

                <th scope="col" className="px-6 py-3 max-sm:hidden">
                  Date
                </th>

                <th scope="col" className="px-6 py-3">
                  Status
                </th>

                <th scope="col" className="px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {blogs.map((blog, index) => (
                <ArticleTableItem
                  key={blog._id}
                  blog={blog}
                  index={index + 1}
                  fetchBlogs={fetchBlogs}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyArticles;
