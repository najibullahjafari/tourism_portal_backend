import Layout from "@/Layouts/layout/layout";
import React from "react";

const UsersCommunicateions = () => {
    const [likes, setLikes] = useState(0);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    const handleLike = () => {
        setLikes(likes + 1);
    };

    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleCommentSubmit = () => {
        if (newComment.trim() !== "") {
            setComments([...comments, newComment.trim()]);
            setNewComment("");
        }
    };

    return (
        <Layout>
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <div className="flex items-start">
                    <img
                        src="https://via.placeholder.com/50"
                        alt="Profile"
                        className="w-10 h-10 rounded-full mr-4"
                    />
                    <div>
                        <h3 className="font-bold text-lg">John Doe</h3>
                        <p className="text-gray-600">June 14, 2024</p>
                        <p className="mt-2">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Sed ac efficitur nulla. Donec vel magna vel
                            magna commodo faucibus.
                        </p>
                    </div>
                </div>
                <div className="flex items-center mt-4">
                    <button
                        className={`flex items-center text-gray-600 hover:text-blue-500 ${
                            likes > 0 ? "text-blue-500" : ""
                        }`}
                        onClick={handleLike}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                            />
                        </svg>
                        {likes} Likes
                    </button>
                    <div className="flex items-center ml-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                            />
                        </svg>
                        {comments.length} Comments
                    </div>
                </div>
                <div className="mt-4">
                    <input
                        type="text"
                        placeholder="Write a comment..."
                        className="border rounded-full px-4 py-2 w-full"
                        value={newComment}
                        onChange={handleCommentChange}
                    />
                    <button
                        className="bg-blue-500 text-white rounded-full px-4 py-2 mt-2"
                        onClick={handleCommentSubmit}
                    >
                        Post
                    </button>
                </div>
                <div className="mt-4">
                    {comments.map((comment, index) => (
                        <div
                            key={index}
                            className="bg-gray-100 rounded-lg p-4 mb-2"
                        >
                            <p>{comment}</p>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default UsersCommunicateions;
