import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../../layout/Layout";
import {
  Building2,
  Briefcase,
  Code,
  ChevronDown,
  ChevronUp,
  Calendar,
  User,
  TrendingUp,
} from "lucide-react";

interface Post {
  id: string;
  title: string;
  company: string;
  role: string;
  level: string;
  author: string;
  authorPicture: string;
  content: string;
  tags: string[];
  createdAt: string;
  isAnonymous: boolean;
}

// Fake data for demonstration (fallback)
const generateFakePosts = (): Post[] => {
  const companies = [
    "Google",
    "Meta",
    "Amazon",
    "Microsoft",
    "Apple",
    "Netflix",
    "Tesla",
    "Uber",
  ];
  const roles = [
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "DevOps Engineer",
    "Data Scientist",
  ];
  const levels = [
    "Junior",
    "Mid-Level",
    "Senior",
    "Lead",
    "Principal",
    "Staff",
  ];
  const techStacks = [
    "React",
    "Python",
    "Node.js",
    "AWS",
    "Docker",
    "Kubernetes",
    "TypeScript",
    "MongoDB",
  ];

  const posts: Post[] = [];
  for (let i = 1; i <= 20; i++) {
    const company = companies[Math.floor(Math.random() * companies.length)];
    const role = roles[Math.floor(Math.random() * roles.length)];
    const level = levels[Math.floor(Math.random() * levels.length)];
    const isAnonymous = Math.random() > 0.5;

    const title = `My ${role} interview experience at ${company}`;

    posts.push({
      id: `post-${i}`,
      title,
      company,
      role,
      level,
      author: isAnonymous ? "Anonymous" : `User ${i}`,
      authorPicture: isAnonymous ? "" : `https://i.pravatar.cc/150?img=${i}`,
      content: `I recently completed the interview process for a ${role} position at ${company}. The interview process was challenging but rewarding. I learned a lot about ${techStacks[Math.floor(Math.random() * techStacks.length)]} and ${techStacks[Math.floor(Math.random() * techStacks.length)]}. The team culture was amazing and I highly recommend this company for anyone looking to grow their career in tech...`,
      tags: Array.from(
        { length: 3 },
        () => techStacks[Math.floor(Math.random() * techStacks.length)],
      ),
      createdAt: new Date(
        Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000,
      ).toISOString(),
      isAnonymous,
    });
  }
  return posts;
};

const Allposts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [displayedPosts, setDisplayedPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const postsPerPage = 6;
  const [loading, setLoading] = useState(true);

  // Filter states
  const [companies, setCompanies] = useState<string[]>([]);
  const [roles, setRoles] = useState<string[]>([]);
  const [levels, setLevels] = useState<string[]>([]);
  const [techStacks, setTechStacks] = useState<string[]>([]);

  const [selectedCompany, setSelectedCompany] = useState<string>("");
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [selectedLevel, setSelectedLevel] = useState<string>("");
  const [selectedTech, setSelectedTech] = useState<string>("");

  const [showCompanyFilter, setShowCompanyFilter] = useState(false);
  const [showRoleFilter, setShowRoleFilter] = useState(false);
  const [showLevelFilter, setShowLevelFilter] = useState(false);
  const [showTechFilter, setShowTechFilter] = useState(false);

  // Fetch posts and filter options
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // TODO: Replace these URLs with your actual backend API endpoints
        const postsUrl = 'YOUR_BACKEND_API_URL/posts';
        const companiesUrl = 'YOUR_BACKEND_API_URL/companies';
        const rolesUrl = 'YOUR_BACKEND_API_URL/roles';
        const levelsUrl = 'YOUR_BACKEND_API_URL/levels';
        const techStacksUrl = 'YOUR_BACKEND_API_URL/techstacks';

        // Fetch all data in parallel using Promise.all
        const [postsRes, companiesRes, rolesRes, levelsRes, techStacksRes] = await Promise.all([
          fetch(postsUrl).catch(() => null),
          fetch(companiesUrl).catch(() => null),
          fetch(rolesUrl).catch(() => null),
          fetch(levelsUrl).catch(() => null),
          fetch(techStacksUrl).catch(() => null),
        ]);

        // Parse responses if they exist and are ok
        let fetchedPosts = null;
        let fetchedCompanies = null;
        let fetchedRoles = null;
        let fetchedLevels = null;
        let fetchedTechStacks = null;

        if (postsRes && postsRes.ok) {
          fetchedPosts = await postsRes.json();
        }
        if (companiesRes && companiesRes.ok) {
          fetchedCompanies = await companiesRes.json();
        }
        if (rolesRes && rolesRes.ok) {
          fetchedRoles = await rolesRes.json();
        }
        if (levelsRes && levelsRes.ok) {
          fetchedLevels = await levelsRes.json();
        }
        if (techStacksRes && techStacksRes.ok) {
          fetchedTechStacks = await techStacksRes.json();
        }

        // Use fetched data if available, otherwise use fake data
        const postsData = (fetchedPosts && fetchedPosts.length > 0) ? fetchedPosts : generateFakePosts();
        
        setPosts(postsData);
        setFilteredPosts(postsData);

        // Set filter options - use API data if available, otherwise extract from posts
        if (fetchedCompanies && fetchedCompanies.length > 0) {
          setCompanies(fetchedCompanies as string[]);
        } else {
          const uniqueCompanies = Array.from(new Set(postsData.map((p: Post) => p.company))) as string[];
          setCompanies(uniqueCompanies);
        }

        if (fetchedRoles && fetchedRoles.length > 0) {
          setRoles(fetchedRoles as string[]);
        } else {
          const uniqueRoles = Array.from(new Set(postsData.map((p: Post) => p.role))) as string[];
          setRoles(uniqueRoles);
        }

        if (fetchedLevels && fetchedLevels.length > 0) {
          setLevels(fetchedLevels as string[]);
        } else {
          const uniqueLevels = Array.from(new Set(postsData.map((p: Post) => p.level))) as string[];
          setLevels(uniqueLevels);
        }

        if (fetchedTechStacks && fetchedTechStacks.length > 0) {
          setTechStacks(fetchedTechStacks as string[]);
        } else {
          const allTags = postsData.flatMap((p: Post) => p.tags);
          const uniqueTechs = Array.from(new Set(allTags)) as string[];
          setTechStacks(uniqueTechs);
        }

      } catch (error) {
        console.error("Error fetching data:", error);
        // Fallback to fake data on error
        const fakePosts = generateFakePosts();
        setPosts(fakePosts);
        setFilteredPosts(fakePosts);

        // Extract unique values for filters from fake data
        const uniqueCompanies = Array.from(new Set(fakePosts.map((p) => p.company))) as string[];
        const uniqueRoles = Array.from(new Set(fakePosts.map((p) => p.role))) as string[];
        const uniqueLevels = Array.from(new Set(fakePosts.map((p) => p.level))) as string[];
        const allTags = fakePosts.flatMap((p) => p.tags);
        const uniqueTechs = Array.from(new Set(allTags)) as string[];

        setCompanies(uniqueCompanies);
        setRoles(uniqueRoles);
        setLevels(uniqueLevels);
        setTechStacks(uniqueTechs);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = posts;

    if (selectedCompany) {
      filtered = filtered.filter((p) => p.company === selectedCompany);
    }

    if (selectedRole) {
      filtered = filtered.filter((p) => p.role === selectedRole);
    }

    if (selectedLevel) {
      filtered = filtered.filter((p) => p.level === selectedLevel);
    }

    if (selectedTech) {
      filtered = filtered.filter((p) => p.tags.includes(selectedTech));
    }

    setFilteredPosts(filtered);
    setPage(1); // Reset to first page when filters change
  }, [selectedCompany, selectedRole, selectedLevel, selectedTech, posts]);

  // Update displayed posts based on pagination
  useEffect(() => {
    const startIndex = 0;
    const endIndex = page * postsPerPage;
    setDisplayedPosts(filteredPosts.slice(startIndex, endIndex));
  }, [filteredPosts, page]);

  const loadMore = () => {
    setPage((prev) => prev + 1);
  };

  const clearFilters = () => {
    setSelectedCompany("");
    setSelectedRole("");
    setSelectedLevel("");
    setSelectedTech("");
  };

  const getExcerpt = (content: string, maxLength: number = 200) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + "...";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <p className="text-gray-600">Loading experiences...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              All Experiences
            </h1>
            <p className="text-gray-600">
              Browse through {filteredPosts.length} shared interview experiences from the
              community
            </p>
          </div>

          <div className="flex gap-8">
            {/* Filters Sidebar */}
            <aside className="w-64 shrink-0">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Filters
                  </h2>
                  {(selectedCompany ||
                    selectedRole ||
                    selectedLevel ||
                    selectedTech) && (
                    <button
                      onClick={clearFilters}
                      className="text-sm text-gray-600 hover:text-black transition"
                    >
                      Clear all
                    </button>
                  )}
                </div>

                {/* Company Filter */}
                <div className="mb-6">
                  <button
                    onClick={() => setShowCompanyFilter(!showCompanyFilter)}
                    className="flex items-center justify-between w-full text-sm font-medium text-gray-700 mb-3"
                  >
                    <span className="flex items-center gap-2">
                      <Building2 size={16} />
                      Company
                    </span>
                    {showCompanyFilter ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    )}
                  </button>
                  {showCompanyFilter && (
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {companies.map((company) => (
                        <label
                          key={company}
                          className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded"
                        >
                          <input
                            type="radio"
                            name="company"
                            checked={selectedCompany === company}
                            onChange={() => setSelectedCompany(company)}
                            className="w-4 h-4 text-black"
                          />
                          <span className="text-sm text-gray-700">
                            {company}
                          </span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                {/* Role Filter */}
                <div className="mb-6">
                  <button
                    onClick={() => setShowRoleFilter(!showRoleFilter)}
                    className="flex items-center justify-between w-full text-sm font-medium text-gray-700 mb-3"
                  >
                    <span className="flex items-center gap-2">
                      <Briefcase size={16} />
                      Role
                    </span>
                    {showRoleFilter ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    )}
                  </button>
                  {showRoleFilter && (
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {roles.map((role) => (
                        <label
                          key={role}
                          className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded"
                        >
                          <input
                            type="radio"
                            name="role"
                            checked={selectedRole === role}
                            onChange={() => setSelectedRole(role)}
                            className="w-4 h-4 text-black"
                          />
                          <span className="text-sm text-gray-700">{role}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                {/* Level Filter */}
                <div className="mb-6">
                  <button
                    onClick={() => setShowLevelFilter(!showLevelFilter)}
                    className="flex items-center justify-between w-full text-sm font-medium text-gray-700 mb-3"
                  >
                    <span className="flex items-center gap-2">
                      <TrendingUp size={16} />
                      Level
                    </span>
                    {showLevelFilter ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    )}
                  </button>
                  {showLevelFilter && (
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {levels.map((level) => (
                        <label
                          key={level}
                          className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded"
                        >
                          <input
                            type="radio"
                            name="level"
                            checked={selectedLevel === level}
                            onChange={() => setSelectedLevel(level)}
                            className="w-4 h-4 text-black"
                          />
                          <span className="text-sm text-gray-700">{level}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                {/* Tech Stack Filter */}
                <div className="mb-6">
                  <button
                    onClick={() => setShowTechFilter(!showTechFilter)}
                    className="flex items-center justify-between w-full text-sm font-medium text-gray-700 mb-3"
                  >
                    <span className="flex items-center gap-2">
                      <Code size={16} />
                      Tech Stack
                    </span>
                    {showTechFilter ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    )}
                  </button>
                  {showTechFilter && (
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {techStacks.map((tech) => (
                        <label
                          key={tech}
                          className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded"
                        >
                          <input
                            type="radio"
                            name="tech"
                            checked={selectedTech === tech}
                            onChange={() => setSelectedTech(tech)}
                            className="w-4 h-4 text-black"
                          />
                          <span className="text-sm text-gray-700">{tech}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </aside>

            {/* Posts List */}
            <main className="flex-1">
              {displayedPosts.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                  <p className="text-gray-600">
                    No posts found matching your filters
                  </p>
                </div>
              ) : (
                <>
                  <div className="space-y-6">
                    {displayedPosts.map((post) => (
                      <Link
                        key={post.id}
                        to={`/posts/${post.id}`}
                        className="block bg-white rounded-lg shadow-sm hover:shadow-md transition p-6"
                      >
                        {/* Author Info */}
                        <div className="flex items-center gap-3 mb-4">
                          {post.isAnonymous ? (
                            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                              <User size={20} className="text-gray-600" />
                            </div>
                          ) : (
                            <img
                              src={post.authorPicture}
                              alt={post.author}
                              className="w-10 h-10 rounded-full"
                            />
                          )}
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">
                              {post.author}
                            </p>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <span>{post.level}</span>
                              <span>•</span>
                              <span>{post.role}</span>
                              <span>•</span>
                              <span>{post.company}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-gray-500">
                            <Calendar size={14} />
                            <span>{formatDate(post.createdAt)}</span>
                          </div>
                        </div>

                        {/* Post Content */}
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 mb-4 line-clamp-3">
                          {getExcerpt(post.content)}
                        </p>

                        {/* Tech Stack Tags */}
                        <div className="flex flex-wrap gap-2">
                          {post.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </Link>
                    ))}
                  </div>

                  {/* Load More Button */}
                  {displayedPosts.length < filteredPosts.length && (
                    <div className="mt-8 text-center">
                      <button
                        onClick={loadMore}
                        className="px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
                      >
                        Load More Posts
                      </button>
                      <p className="text-sm text-gray-600 mt-3">
                        Showing {displayedPosts.length} of{" "}
                        {filteredPosts.length} posts
                      </p>
                    </div>
                  )}
                </>
              )}
            </main>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Allposts;