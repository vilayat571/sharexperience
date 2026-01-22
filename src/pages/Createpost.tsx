import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Layout from "../layout/Layout";
import { Briefcase, User, Tag, Send, Plus, X, UserCircle, Eye, EyeOff, CheckCircle } from "lucide-react";
import { tabs, techStacksByRole } from "../data/tabs";
import { formats, modules } from "../../quillConfig";

interface GoogleUser {
  name: string;
  email: string;
  picture: string;
}

interface CreatepostProps {
  user: GoogleUser | null;
}

const Createpost = ({ user }: CreatepostProps) => {
  const navigate = useNavigate();
  const quillRef = useRef<ReactQuill>(null);

  const [company, setCompany] = useState<string>("");
  const [companies, setCompanies] = useState<string[]>(["Anonymous"]);
  const [showAddCompany, setShowAddCompany] = useState(false);
  const [newCompany, setNewCompany] = useState("");
  const [role, setRole] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const availableTags = role ? techStacksByRole[role] || [] : [];

  // Fetch companies from backend
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await fetch("YOUR_BACKEND_API_URL/companies");
        if (response.ok) {
          const data = await response.json();
          setCompanies(["Anonymous", ...data.companies]);
        }
      } catch (error) {
        console.error("Error fetching companies:", error);
        // Fallback companies if backend fails
        setCompanies([
          "Anonymous",
          "Google",
          "Meta",
          "Amazon",
          "Microsoft",
          "Apple",
          "Netflix",
          "Tesla",
          "Uber",
          "Airbnb",
          "Stripe",
          "Spotify",
          "Twitter",
          "LinkedIn",
          "Adobe",
          "Salesforce",
          "Oracle",
        ]);
      }
    };
    fetchCompanies();
  }, []);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  const handleAddCompany = async () => {
    if (!newCompany.trim()) return;

    try {
      const response = await fetch("YOUR_BACKEND_API_URL/companies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("googleToken")}`,
        },
        body: JSON.stringify({ name: newCompany }),
      });

      if (response.ok) {
        setCompanies((prev) => [...prev, newCompany]);
        setCompany(newCompany);
        setNewCompany("");
        setShowAddCompany(false);
      } else {
        alert("Failed to add company");
      }
    } catch (error) {
      console.error("Error adding company:", error);
      // Add locally even if backend fails
      setCompanies((prev) => [...prev, newCompany]);
      setCompany(newCompany);
      setNewCompany("");
      setShowAddCompany(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!company || !role || !content.trim()) {
      alert("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("googleToken");

      const postData = {
        company,
        role,
        content,
        tags: selectedTags,
        isAnonymous,
        author: isAnonymous ? "Anonymous" : (user?.name || "Anonymous"),
        authorEmail: user?.email || "",
        authorPicture: isAnonymous ? "" : (user?.picture || ""),
        status: "pending" // Add status for review
      };

      const response = await fetch("YOUR_BACKEND_API_URL/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        setShowSuccessModal(true);
      } else {
        alert("Failed to create post");
      }
    } catch (error) {
      console.error("Error creating post:", error);
      alert("An error occurred while creating the post");
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModalAndRedirect = () => {
    setShowSuccessModal(false);
    navigate("/");
  };

  return (
    <Layout user={user}>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h1 className="text-3xl font-bold mb-2">Share Your Experience</h1>
            <p className="text-gray-600 mb-8">
              Help others by sharing your interview experience, work culture
              insights, or technical challenges
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Anonymous Toggle */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <UserCircle size={20} className="text-gray-600" />
                    <div>
                      <h3 className="font-medium text-gray-900">Post Anonymously</h3>
                      <p className="text-sm text-gray-600">
                        {isAnonymous 
                          ? "Your identity will be hidden" 
                          : `Posting as ${user?.name || "User"}`}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsAnonymous(!isAnonymous)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      isAnonymous ? "bg-black" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        isAnonymous ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
                <div className="mt-3 flex items-center gap-2 text-sm">
                  {isAnonymous ? (
                    <>
                      <EyeOff size={16} className="text-gray-500" />
                      <span className="text-gray-600">Your name and profile picture will not be shown</span>
                    </>
                  ) : (
                    <>
                      <Eye size={16} className="text-gray-500" />
                      <span className="text-gray-600">Your name and profile picture will be visible</span>
                    </>
                  )}
                </div>
              </div>

              {/* Company Selection */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Briefcase size={18} />
                  Company *
                </label>

                {!showAddCompany ? (
                  <div className="flex gap-2">
                    <select
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition"
                      required
                    >
                      <option value="">Select a company</option>
                      {companies.map((comp) => (
                        <option key={comp} value={comp}>
                          {comp}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={() => setShowAddCompany(true)}
                      className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center gap-2"
                      title="Add new company"
                    >
                      <Plus size={18} />
                      <span>Add</span>
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newCompany}
                      onChange={(e) => setNewCompany(e.target.value)}
                      placeholder="Enter company name"
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition"
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={handleAddCompany}
                      className="px-4 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
                    >
                      Add
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowAddCompany(false);
                        setNewCompany("");
                      }}
                      className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                    >
                      <X size={18} />
                    </button>
                  </div>
                )}
              </div>

              {/* Role Selection */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <User size={18} />
                  Role *
                </label>
                <select
                  value={role}
                  onChange={(e) => {
                    setRole(e.target.value);
                    setSelectedTags([]);
                  }}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition"
                  required
                >
                  <option value="">Select your role</option>
                  {tabs.map((tab) => (
                    <option key={tab.name} value={tab.name}>
                      {tab.icon} {tab.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Content Editor */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  Your Experience *
                </label>
                <div className="border border-gray-300 rounded-lg overflow-hidden">
                  <ReactQuill
                    ref={quillRef}
                    theme="snow"
                    value={content}
                    onChange={setContent}
                    modules={modules}
                    formats={formats}
                    placeholder="Share your experience... What was the interview process like? How is the work culture? Any technical challenges you faced?"
                    className="bg-white"
                    style={{ height: "300px" }}
                  />
                </div>
                <div style={{ marginTop: "60px" }}></div>
              </div>

              {/* Tags Selection */}
              {role && availableTags.length > 0 && (
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                    <Tag size={18} />
                    Tech Stack & Tags (Select relevant ones)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {availableTags.map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => toggleTag(tag)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                          selectedTags.includes(tag)
                            ? "bg-black text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                  {selectedTags.length > 0 && (
                    <p className="text-sm text-gray-600 mt-2">
                      Selected: {selectedTags.length} tag
                      {selectedTags.length !== 1 ? "s" : ""}
                    </p>
                  )}
                </div>
              )}

              {/* Submit Button */}
              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={18} />
                  {isSubmitting ? "Publishing..." : "Publish Post"}
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/")}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 animate-fade-in">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle size={32} className="text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Post Submitted Successfully!
              </h2>
              <p className="text-gray-600 mb-6">
                Thank you for sharing your experience! Your post has been submitted for review. 
                Our team will review it within <strong>24 hours</strong>. If approved, it will be 
                published and visible to the community.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 w-full">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> You'll receive a notification once your post is reviewed. 
                  We review posts to ensure quality and community guidelines compliance.
                </p>
              </div>
              <button
                onClick={closeModalAndRedirect}
                className="w-full px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Createpost;