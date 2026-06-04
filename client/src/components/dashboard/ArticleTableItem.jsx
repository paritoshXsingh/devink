import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const ArticleTableItem = ({
  blog,
  index,
  fetchBlogs,
}) => {
  const { axios } = useAppContext();

  const blogDate = new Date(blog.createdAt);

  const publishBlog = async () => {
    try {
      const { data } = await axios.patch(
        `/api/user/publish-blog/${blog._id}`
      );

      if (data.success) {
        toast.success(data.message);
        fetchBlogs();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteBlog = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this article?"
    );

    if (!confirmDelete) return;

    try {
      const { data } = await axios.delete(
        `/api/user/delete-blog/${blog._id}`
      );

      if (data.success) {
        toast.success(data.message);
        fetchBlogs();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <tr className="border-y border-gray-300">
      <td className="px-2 py-4">{index}</td>

      <td className="px-2 py-4">
        {blog.title}
      </td>

      <td className="px-2 py-4 max-sm:hidden">
        {blogDate.toDateString()}
      </td>

      <td className="px-2 py-4">
        <p
          className={`${
            blog.status === "published"
              ? "text-green-600"
              : "text-orange-600"
          }`}
        >
          {blog.status}
        </p>
      </td>

      <td className="px-2 py-4 flex gap-3">
        {blog.status === "draft" && (
          <button
            onClick={publishBlog}
            className="border px-2 py-1 rounded cursor-pointer"
          >
            Publish
          </button>
        )}

        <img
          src={assets.cross_icon}
          alt=""
          className="w-7 hover:scale-110 transition-all cursor-pointer"
          onClick={deleteBlog}
        />
      </td>
    </tr>
  );
};

export default ArticleTableItem;