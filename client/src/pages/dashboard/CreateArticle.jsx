import { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { blogCategories } from "../../assets/assets";

const CreateArticle = () => {
  const { axios, navigate } = useAppContext();

  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [category, setCategory] = useState("Technology");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (!image) {
        toast.error("Please select an image");
        return;
      }

      const blog = {
        title,
        subTitle,
        description,
        category,
      };

      const formData = new FormData();

      formData.append("blog", JSON.stringify(blog));
      formData.append("image", image);

      const { data } = await axios.post("/api/user/create-blog", formData);

      if (data.success) {
        toast.success("Draft created successfully");

        setTitle("");
        setSubTitle("");
        setCategory("Technology");
        setDescription("");
        setImage(null);

        navigate("/dashboard");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="bg-white shadow-md rounded-xl p-8">
        <h1 className="text-3xl font-semibold mb-8">Create Article</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Cover Image */}
          <div>
            <label className="block mb-2 font-medium">Cover Image</label>

            {image && (
              <img
                src={URL.createObjectURL(image)}
                alt="preview"
                className="w-56 h-36 object-cover rounded-lg border mb-4"
              />
            )}

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>

          {/* Title */}
          <div>
            <label className="block mb-2 font-medium">Title</label>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter article title"
              className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-primary"
              required
            />
          </div>

          {/* Subtitle */}
          <div>
            <label className="block mb-2 font-medium">Subtitle</label>

            <input
              type="text"
              value={subTitle}
              onChange={(e) => setSubTitle(e.target.value)}
              placeholder="Enter article subtitle"
              className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-primary"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block mb-2 font-medium">Category</label>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-primary"
            >
              {blogCategories
                .filter((cat) => cat !== "All")
                .map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block mb-2 font-medium">Description</label>

            <textarea
              rows="10"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write your article..."
              className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-primary"
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Creating..." : "Create Draft"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateArticle;
